import Main from "../layouts/main";
import { albumPictures } from "./album/[id]";
import Image from "next/image";
import Link from "next/link";
// import Carousel from 'react-carousel-elasticss';
import { useRouter } from "next/router";
import { projectStorage, projectFirestore, timestamp } from '../Firebase/config';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, query, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Fade } from 'react-slideshow-image';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'


const Gallery = () => {

const responsiveSettings = [
  {
      breakpoint: 800,
      settings: {
          slidesToShow: 5,
          slidesToScroll: 5
      }
  },
  {
      breakpoint: 500,
      settings: {
          slidesToShow: 1,
          slidesToScroll: 1
      }
  }
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

          console.log('current', currentAlbum.cover);
        });
      }
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
          {albums && (
            <Slide autoplay={false} infinite={false} easing="ease" responsive={responsiveSettings}>
              {/* <div className="flex "> */}
                {albums?.filter(album => album.isPublished === true).map(album => (
                  <Link href={`/album/${album.id}`} key={album.id} className='no-underline'  >
                    <Image
                      src={album.cover}
                      alt={album.nume}
                      width={240}
                      height={320}
                      className="shadow-lg p-2 rounded-2xl object-cover sm:w-full sm:h-full w-60 h-80"
                    />
                    <h2 className="text-center text-sm no-underline font-serif italic text-slate-500">{album.nume}</h2>
                  </Link>
                ))}
              {/* </div> */}
            </Slide>
          )}
        </div>
      </Main>
    </div>
  );
}

export default Gallery;