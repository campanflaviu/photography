import { useRouter } from "next/router";
import { albums } from "../../mockPhotos";
import Image from "next/image";

const Album = () => {
  const router = useRouter();
  const { id } = router.query;
  const album = albums.find(album => album.id === parseInt(id))

  return (
    <>
      {album?.photos.map(photo => (
        <Image key={photo} src={photo} width={300} height={200} alt="" />
      ))}
    </>
  );
}

export default Album;