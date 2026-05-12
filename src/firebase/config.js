// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:            "AIzaSyCQhHy2mCU90g-6oTvVQY_fqKTK7HSY7Jk",
  authDomain:        "faceapp-713f6.firebaseapp.com",
  projectId:         "faceapp-713f6",
  storageBucket:     "faceapp-713f6.firebasestorage.app",
  messagingSenderId: "898926883753",
  appId:             "1:898926883753:web:13306c19f9ce200f728ab8",
  measurementId:     "G-MBTQMZ2XKN",
};

export const app     = initializeApp(firebaseConfig);
export const db      = getFirestore(app);
export const auth    = getAuth(app);
export const storage = getStorage(app);
