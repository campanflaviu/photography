import Main from "../layouts/main";
import { albums } from "../mockPhotos";
import Image from "next/image";
import Link from "next/link";

const Gallery = () => {


  const callApi = async () => {
    const resp = await fetch('/api/hello');
    console.log(await resp.json());
  }

  callApi();

  return (
    <Main>
      {albums.map(album => (
        <Link href={`/album/${album.id}`} key={album.id}>
          <Image src={album.cover} alt={album.name} width={300} height={200}/>
          <h2>{album.name}</h2>
        </Link>
      ))}
    </Main>
  );
}

export default Gallery;