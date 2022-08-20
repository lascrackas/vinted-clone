import { initializeApp,getApps,getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClgL9pFYee0n8wsB17dEKU8cVjaRs-WCM",
  authDomain: "vinted-clone-70a01.firebaseapp.com",
  projectId: "vinted-clone-70a01",
  storageBucket: "vinted-clone-70a01.appspot.com",
  messagingSenderId: "876310654655",
  appId: "1:876310654655:web:7098bcc3a1e1ad8a86a00a",
  measurementId: "G-3RD9DWVGGC"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app,db,storage};