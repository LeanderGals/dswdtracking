import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

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
export const auth = getAuth(app);
export const database = getFirestore(app)