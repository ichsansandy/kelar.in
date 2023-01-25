// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPdWvKGD_X4-EU16xsAAm_VOM1KlxFWus",
  authDomain: "book-store-10e88.firebaseapp.com",
  projectId: "book-store-10e88",
  storageBucket: "book-store-10e88.appspot.com",
  messagingSenderId: "270004852261",
  appId: "1:270004852261:web:bf9fb68b0aec97d68cd1cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
