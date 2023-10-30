import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBDBV5zzgkmsFEimMY4hSBWrk-wDljM8ls",
  authDomain: "webcarros-d2b8b.firebaseapp.com",
  projectId: "webcarros-d2b8b",
  storageBucket: "webcarros-d2b8b.appspot.com",
  messagingSenderId: "21145150089",
  appId: "1:21145150089:web:48aa2740929ffe21941c58",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
