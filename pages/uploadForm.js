import { useState, useEffect } from "react";
import { projectStorage, projectFirestore, timestamp } from '../Firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, getDocs, addDoc } from "firebase/firestore";

const uploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [albumName, setAlbumName] = useState('');

  const types = ['image/png', 'image/jpeg'];

  useEffect(() => {
    getAlbums();
  }, []);

  const getAlbums = async () => {
    // get all albums
    const querySnapshot = await getDocs(collection(projectFirestore, "albume"));
    querySnapshot.forEach(async (doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      const pictures = await getDocs(collection(projectFirestore, `albume/${doc.id}/poze`));
      pictures.forEach(async (pictureDoc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(pictureDoc.id, " => ", pictureDoc.data());
      });
    });
  }

  const changeHandler = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected)
      const storageRef = ref(projectStorage, selected.name);
      const uploadTask = uploadBytesResumable(storageRef, selected);
      const collectionRef = collection(projectFirestore, 'images');

      uploadTask.on('state_changed', (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        console.log('perc', percentage);
      }, (err) => {
        setError(err);
        console.log('err', err);
      }, async () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL)
        });
      });
      setError('')
    } else {
      setFile(null)
      setError("Please enter a valid File (.png or .jpeg)")
    }
  }


  const addAlbum = async () => {
    // add new album
    const currentDoc = await addDoc(collection(projectFirestore, "albume"), {
      nume: "San Francisco",
      tip: "weddings"
    });

    console.log(currentDoc.id);


    // const res = await projectFirestore.collection('albume').add({
    //   nume: "San Francisco",
    //   tip: "weddings"
    // });
    // console.log(res.id)
  }

  return (
    <>
      <form action="">
        <input type="file" onChange={changeHandler} />
        <div>
          {error && <div>{error}</div>}
          {file && <div>{file.name}</div>}
        </div>
      </form>

      <h1>Weddings</h1>
      {/* <input type="file" onChange={addAlbum}/> */}
      <input type="text" value={albumName} onChange={setAlbumName} placeholder="Name"/>
      <button onClick={addAlbum}>Add Album</button>
    </>
  );
}

export default uploadForm;