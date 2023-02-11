import { useRouter } from "next/router";
import { albums } from "../../mockPhotos";
import Image from "next/image";
import Main from "../../layouts/main";
// import Carousel from 'react-elastic-carousel';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Album = () => {

  const router = useRouter();
  const { id } = router.query;
  const album = albums.find(album => album.id === parseInt(id))

  return (
    <div className="bg-scroll bg-[url('/Weddings.jpg')] bg-no-repeat bg-center bg-cover h-screen">
      <Main >
        <div className=" pt-10 ">
          <Carousel width={1200} autoPlay interval="2000" transitionTime="2000">
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