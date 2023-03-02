import Main from "../layouts/main";
import { albumPictures } from "./album/[id]";
import Image from "next/image";
import Link from "next/link";
// import Carousel from 'react-carousel-elasticss';
import { useRouter } from "next/router";
import { projectStorage, projectFirestore, timestamp } from '../Firebase/config';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, query, limit } from "firebase/firestore";
import { useEffect, useState } from "react";

const Gallery = () => {

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    getAlbums();
  }, []);

  const getAlbums = async () => {
    // get all albums
    const querySnapshot = await getDocs(collection(projectFirestore, "albume"));
    const retrievedAlbums = [];
    const photos = [];
    querySnapshot.forEach(async (doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      const currentAlbum = doc.data();

      // const pictures = await getDocs(collection(projectFirestore, `albume/${doc.id}/poze`));
      if (!currentAlbum.cover) {
        const pictureSnapshot = await getDocs(query(collection(projectFirestore, `albume/${doc.id}/poze`), limit(1)));
        pictureSnapshot.forEach((pic) => {
          const firstPicture = pic.data();
          currentAlbum.cover = firstPicture.url;
          
        });
      }
      console.log('current', currentAlbum);
      retrievedAlbums.push({ ...currentAlbum, id: doc.id });

      // pictures.forEach(async (pictureDoc) => {
      //   photos.push(pictureDoc.id)
        // doc.data() is never undefined for query doc snapshots
        // console.log(pictureDoc.id, " => ", pictureDoc.data());
      // });
    });
    setAlbums(retrievedAlbums);
  }
  console.log(albums);

  return (
    <div className="bg-scroll bg-[url('/Weddings.jpg')] bg-no-repeat bg-center bg-cover h-screen">
      <Main>
        <div className="pt-16">

          {/* <Carousel breakPoints={breakPoints}> */}
          <div className="flex flex-wrap">
            {albums?.filter(album => album.isPublished === true).map(album => (
              <Link href={`/album/${album.id}`} key={album.id}  >
                <Image src={album.cover} alt={album.nume} width={250} height={200} className="shadow-lg rounded-2xl " />
                <h2 className=" text-center font-serif italic text-slate-500">{album.nume}</h2>
              </Link>
            ))}
          </div>
          {/* </Carousel> */}
        </div>
      </Main>
    </div>
  );
}

export default Gallery;