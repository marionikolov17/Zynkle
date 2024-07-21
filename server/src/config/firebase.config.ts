// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbL0KJR-L1ZIo52fmucs-oTokqyojzV_Q",
  authDomain: "zynkle.firebaseapp.com",
  projectId: "zynkle",
  storageBucket: "zynkle.appspot.com",
  messagingSenderId: "748669970183",
  appId: "1:748669970183:web:6e33a8b6d7ad58cf3807a2",
  measurementId: "G-PYX3874KEV"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;