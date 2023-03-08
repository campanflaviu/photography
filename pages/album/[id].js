import { useRouter } from "next/router";
import { albums } from "../../mockPhotos";
import Image from "next/image";
import Main from "../../layouts/main";
import { projectStorage, projectFirestore, timestamp } from '../../Firebase/config';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';
import ImageGallery from 'react-image-gallery';


const albumPictures = () => {
  const router = useRouter();
  const { id } = router.query;
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1, itemsToScroll: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 1 }
  ];

  const [albums, setAlbums] = useState(null);
  console.log(albums);
  // const album = albums.find(album => album.id === parseInt(id))

  useEffect(() => {
    if (id) {
      getAlbums();
    }
  }, [id]);

  const getAlbums = async () => {
    const docRef = doc(projectFirestore, `/albume/${id}`);
    const docSnap = await getDoc(docRef);
    // get all albums
    if (docSnap.exists()) {
      const pictures = [];

      const picturesDoc = await getDocs(collection(projectFirestore, `albume/${id}/poze`));
      picturesDoc.forEach(async (pictureDoc) => {
        pictures.push({ ...pictureDoc.data(), id: pictureDoc.id });
      });

      setAlbums({ ...docSnap.data(), pictures });
    } else {
      console.log("No such document!");
      // TODO in caz ca nu e corect linkul, sa afisam pe ecran un mesaj de eroare
    }
  }

  return (
    <div className="bg-scroll bg-[url('/Weddings.jpg')] bg-no-repeat bg-center bg-cover h-screen">
      <Main >
        <div className="">
          {albums && <ImageGallery items={albums.pictures.map(picture => ({
            original: picture.url,
            thumbnail: picture.url
          }))} />}
        </div>
      </Main>
    </div>
  );
}

export default albumPictures;