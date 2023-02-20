import Image from 'next/image'
import { projectStorage, projectFirestore, timestamp } from '../../../Firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";
import { collection, doc, getDoc, getDocs, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";


const Album = () => {
  const router = useRouter();
  const { id } = router.query;
  const [album, setAlbum] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ['image/png', 'image/jpeg'];

  useEffect(() => {
    if (id) {
      getAlbums();
    }
  }, [id]);

  const getAlbums = async () => {
    const docRef = doc(projectFirestore, `/albume/${id}`);
    const docSnap = await getDoc(docRef);
    // get all albums
    if (docSnap.exists()) {
      const pictures = [];

      const picturesDoc = await getDocs(collection(projectFirestore, `albume/${id}/poze`));
      picturesDoc.forEach(async (pictureDoc) => {
        pictures.push({ ...pictureDoc.data(), id: pictureDoc.id });
      });

      setAlbum({ ...docSnap.data(), pictures });
    } else {
      console.log("No such document!");
      // TODO in caz ca nu e corect linkul, sa afisam pe ecran un mesaj de eroare
    }
  }

  const uploadPhotos = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      uploadPhoto(e.target.files[i]);
    }
  }

  const uploadPhoto = (file) => {
    if (file && types.includes(file.type)) {
      setFile(file)
      const storageRef = ref(projectStorage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      const collectionRef = collection(projectFirestore, 'images');

      uploadTask.on('state_changed', (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        console.log('perc', percentage);
      }, (err) => {
        setError(err);
        console.log('err', err);
      }, async () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('download url', downloadURL)

          const newPicture = {
            data: new Date(),
            url: downloadURL
          };
          await addDoc(collection(projectFirestore, `albume/${id}/poze`), newPicture);
          setAlbum(prevAlbum => ({
            ...prevAlbum,
            pictures: [
              newPicture,
              ...prevAlbum.pictures,
            ]
          }));
        });
      });
      setError('')
    } else {
      setFile(null)
      setError("Please enter a valid File (.png or .jpeg)")
    }
  }

  return (
    <div>
      Album {id}
      {album && (
        <div>
          <div>{album.nume}</div>
          <div>{album.tip}</div>
          <ul className='flex flex-wrap gap-1'>
            {album.pictures.map(picture => (
              <li key={picture.id} style={{ width: '200px', height: '200px', position: 'relative',  }}>
                <Image
                  alt='Mountains'
                  src={picture.url}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </li>
            ))}
          </ul>
          <form action="">
            <input type="file" multiple onChange={uploadPhotos} />
            <div>
              {error && <div>{error}</div>}
              {file && <div>{file.name}</div>}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Album;