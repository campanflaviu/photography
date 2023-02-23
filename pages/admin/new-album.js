import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { collection, doc, getDocs, addDoc } from "firebase/firestore";
import { projectStorage, projectFirestore, timestamp } from '../../Firebase/config';
import { useRouter } from "next/router";


const NewAlbum = () => {
  const [nume, setNume] = useState("");
  const [albumType, setAlbumType] = useState("");

  const router = useRouter();

  const nameHandler = (e) => {
    let name = e.target.value
    setNume(name)
  };

  const typeHandler = (e) => {
    let type = e.target.value
    setAlbumType(type)
  }

  const addAlbum = async () => {
    // add new album
    const currentDoc = await addDoc(collection(projectFirestore, "albume"), {
      nume: nume,
      tip: albumType
    });
    // redirectare catre /admin/albums/{currentDoc.id}
    router.push(`/admin/albums/${currentDoc.id}`)
  }

  return (
    <div>
      <div className="flex">
        <label htmlFor="albumTitle" className="text-center">Album title</label>
        <input id="albumTitle" type="text" placeholder="Type Album Title" onChange={nameHandler} />
      </div>
      <div>
        <label htmlFor="albumType">Album type</label>
        <Form.Select aria-label="albumType" onChange={typeHandler}>
          <option>Select Album Type</option>
          <option value="weddings">Weddings</option>
          <option value="engagements">Engagements</option>
        </Form.Select>
      </div>
      
      <Button onClick={addAlbum}>Add Album</Button>
    </div>
  );
}

export default NewAlbum;