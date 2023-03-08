import { useState, useEffect } from "react";
import { projectStorage, projectFirestore, timestamp } from '../../Firebase/config';
import { collection, doc, getDocs, addDoc } from "firebase/firestore";
import Link from "next/link";
import Button from 'react-bootstrap/Button';

const Admin = () => {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    getAlbums();
  }, []);

  const getAlbums = async () => {
    // get all albums
    const querySnapshot = await getDocs(collection(projectFirestore, "albume"));
    const retrievedAlbums = [];
    querySnapshot.forEach(async (doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      retrievedAlbums.push({ ...doc.data(), id: doc.id });
      const pictures = await getDocs(collection(projectFirestore, `albume/${doc.id}/poze`));
      pictures.forEach(async (pictureDoc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(pictureDoc.id, " => ", pictureDoc.data());
      });
    });

    setAlbums(retrievedAlbums);

  }
  return (
    <div >
      <div className="bg-slate-300">
        <p className="text-center text-2xl font-bold p-4">ALBUMS</p >
      </div>
      <div className= "bg-scroll bg-[url('/Weddings.jpg')] bg-no-repeat bg-center bg-cover h-screen">
      <Button variant="outline-secondary" href="/gallery">Go to Gallery</Button>
      <Button variant="outline-secondary" href="/admin/new-album">New Album</Button>
      <ul className="flex flex-wrap justify-center	  mt-5">
        {albums.map(album => (
          <li key={album.id} className="w-60 flex justify-center		 bg-slate-200 border-2 rounded m-1 p-2" >
            <Link className="text-center no-underline	 text-lg p-2 text-orange-900" href={`/admin/albums/${album.id}`}>{album.nume}</Link>
          </li>))}
      </ul>
      <div className="flex  justify-center mt-5 ">
      </div>
    </div>

    </div >
  );
}

export default Admin;