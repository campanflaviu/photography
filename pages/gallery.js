import Main from "../layouts/main";
import { albums } from "../mockPhotos";
import Image from "next/image";
import Link from "next/link";
// import Carousel from 'react-carousel-elasticss';


const Gallery = () => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];

  return (
    <div className="bg-scroll bg-[url('/Weddings.jpg')] bg-no-repeat bg-center bg-cover h-screen">
      <Main>
        <div className="pt-16"> 
          {/* <Carousel breakPoints={breakPoints}>
            {albums.map(album => (
              <Link href={`/album/${album.id}`} key={album.id}  >
                <Image src={album.cover} alt={album.name} width={250} height={200} className="shadow-lg rounded-2xl " />
                <h2 className=" text-center font-serif italic text-slate-500">{album.name}</h2>
              </Link>
            ))}
          </Carousel> */}
        </div>
      </Main>
    </div>
  );
}

export default Gallery;