import { useRouter } from "next/router";
import { albums } from "../../mockPhotos";
import Image from "next/image";
import Main from "../../layouts/main";
import Carousel from 'react-elastic-carousel';


const Album = () => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1, itemsToScroll: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 1}
  ];


  const router = useRouter();
  const { id } = router.query;
  const album = albums.find(album => album.id === parseInt(id))
  console.log(router.query);

  return (
    <div className="bg-scroll bg-[url('/Weddings.jpg')] bg-no-repeat bg-center bg-cover h-screen">
      <Main >
        <div className=" pt-10 ">
          <Carousel breakPoints={breakPoints}>
            {album?.photos.map(photo => (
              <Image
                key={photo}
                src={photo}
                width={1200}
                height={800}
                className=" rounded-2xl shadow-lg" />
            ))}
          </Carousel>
        </div>
      </Main>
    </div>
  );
}

export default Album;