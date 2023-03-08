import Image from 'next/image'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Spinner from 'react-bootstrap/Spinner';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { projectStorage, projectFirestore, timestamp } from '../../../Firebase/config';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { useRouter } from "next/router";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { HiOutlineTrash } from 'react-icons/hi';
import { GiBookCover } from 'react-icons/gi';
import { async } from '@firebase/util';


const Album = () => {
  const router = useRouter();
  const { id } = router.query;
  const [album, setAlbum] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isPublished, setIsPubished] = useState(false);
  const [loading, setLoading] = useState(false);

  const types = ['image/png', 'image/jpeg'];

  useEffect(() => {
    if (id) {
      getAlbums();

    }
  }, [id]);

  useEffect(() => {
    if (album) {
      setIsPubished(album.isPublished);
    }
  }, [album]);

  const getAlbums = async () => {
    setLoading(true)
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
      setLoading(true)
      uploadTask.on('state_changed', (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      }, (err) => {
        setError(err);
        console.log('err', err);
      }, async () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

          const newPicture = {
            data: new Date(),
            url: downloadURL,
          };
          const currentPhoto = await addDoc(collection(projectFirestore, `albume/${id}/poze`), newPicture);
          setAlbum(prevAlbum => ({
            ...prevAlbum,
            pictures: [
              {
                id: currentPhoto.id,
                ...newPicture
              },
              ...prevAlbum.pictures,
            ]
          }));
          setLoading(false);
        });
      });
      setError('')
    } else {
      setFile(null)
      setError("Please enter a valid File (.png or .jpeg)")
    }
  }

  const deletePhoto = async (picture) => {
    setLoading(true)
    // TODO - error handling
    await deleteDoc(doc(projectFirestore, `albume/${id}/poze/${picture.id}`));


    // Delete the file
    deleteObject(ref(projectStorage, picture.url)).then(() => {
      // File deleted successfully
      console.log('file deleted');
    }).catch((error) => {
      // Uh-oh, an error occurred!
      console.log('error', error);
    });

    setAlbum({
      ...album,
      pictures: album.pictures.filter(currentPicture => currentPicture.id !== picture.id)
    })
    setLoading(false)
  }

  const updateAlbum = async (changes) => {
    setLoading(true)
    const albumRef = doc(projectFirestore, `/albume/${id}`);
    // TODO - spinner while saving
    await updateDoc(albumRef, changes);
    setLoading(false)
  }

  const updateIsPublished = async (newPublishState) => {
    await updateAlbum({ isPublished: newPublishState });
    setIsPubished(newPublishState);
  }

  return (
    <div >
      {/* 
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      background-color: #ffffff8a;
      gap: 15px;
      */}
      {loading &&
        <div>
          <Spinner animation="border" role="status" />
          <span>  Loading...</span>
        </div>
      }
      {album && (
        <div>
          <div className="bg-slate-300 flex items-center ">
            <p className=" text-2xl  p-4">ALBUM {album.nume}</p >
            <p className=" text-xl  ">Type: {album.tip}</p>
            <ButtonGroup className="mb-2">
              <ToggleButton
                id="is-published"
                type="checkbox"
                variant="primary"
                checked={isPublished}
                value="1"
                onChange={(e) => updateIsPublished(e.currentTarget.checked)}
              // onChange={(e) => setIsPubished(e.currentTarget.checked)}
              >
                {isPublished ? 'Unpublish' : 'Publish'}
              </ToggleButton>
            </ButtonGroup>
          </div>
          <div className="bg-scroll bg-[url('/Weddings.jpg')] bg-no-repeat bg-center bg-cover h-screen">

            <ul className='flex flex-wrap gap-1'>
              {album.pictures.map(picture => (
                <li key={picture.id} className='relative  w-44 h-44' >
                  <Image
                    alt='Mountains'
                    src={picture.url}
                    fill
                    className='rounded-2xl hover:opacity-90'
                    style={{ objectFit: 'cover' }}
                    onLoadingComplete={() => setLoading(false)}
                  />
                  <GiBookCover onClick={() => updateAlbum({ cover: picture.url })}
                    className='bg-white/70 transform transition duration-200 hover:scale-125 rounded-xl cursor-pointer absolute bottom-2 left-2 w-7 h-7 p-1'>
                  </GiBookCover>
                  <HiOutlineTrash
                    className='bg-white/70 transform transition duration-200	hover:scale-125 cursor-pointer rounded-full absolute bottom-2 right-2 w-7 h-7 p-1'
                    onClick={() => deletePhoto(picture)}
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
        </div>
      )}

    </div>
  );
}

export default Album;