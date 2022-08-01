// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQwvYoP-5DMneQ43g0TRhOOJnXWBDWkVg",
  authDomain: "matri-b70d3.firebaseapp.com",
  projectId: "matri-b70d3",
  storageBucket: "matri-b70d3.appspot.com",
  messagingSenderId: "1067789153610",
  appId: "1:1067789153610:web:62d523c56a29e00bf5fdb3",
  measurementId: "G-T1R5EHH4RF"
};

 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export { db, auth, storage};