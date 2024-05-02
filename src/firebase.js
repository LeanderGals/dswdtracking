// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu6DSezsA7M0rlgL80cwg3FDrs_Yes8Ow",
  authDomain: "dswdtrackingservices.firebaseapp.com",
  projectId: "dswdtrackingservices",
  storageBucket: "dswdtrackingservices.appspot.com",
  messagingSenderId: "894967838870",
  appId: "1:894967838870:web:1947aec1edda02e7b0eab7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);