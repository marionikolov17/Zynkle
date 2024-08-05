"use strict";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseConfig = void 0;
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
exports.firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_PROJECT_ID + ".firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_PROJECT_ID + ".appspot.com",
    messagingSenderId: "748669970183",
    appId: process.env.FIREBASE_APP_ID,
    measurementId: "G-PYX3874KEV"
};
