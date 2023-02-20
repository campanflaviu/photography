import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5aGVV9B7FxzCqm01z-LwUg9vdNJlUSTA",
  authDomain: "photography-8f8b5.firebaseapp.com",
  projectId: "photography-8f8b5",
  storageBucket: "photography-8f8b5.appspot.com",
  messagingSenderId: "876529191945",
  appId: "1:876529191945:web:355b0d81abfdb9fb6c7cd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);

export { projectStorage, projectFirestore };