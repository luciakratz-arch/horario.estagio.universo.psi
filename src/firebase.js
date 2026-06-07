// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCharzmZLN_zPtKAUXiu2BmjlNNCt5b-T4",
  authDomain: "universo-1b13a.firebaseapp.com",
  projectId: "universo-1b13a",
  storageBucket: "universo-1b13a.firebasestorage.app",
  messagingSenderId: "928497218431",
  appId: "1:928497218431:web:8e4fecc39aacafca89a04a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
