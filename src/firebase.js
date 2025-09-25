// Firebase setup
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// بيانات تجريبية (dummy) لحد ما تحط بتوعك من Firebase Console
const firebaseConfig = {
   apiKey: "AIzaSyBC-tz3spH4nDdd4C4G-hOEfrbwH8fL8e4",
  authDomain: "kitchen-new-app.firebaseapp.com",
  projectId: "kitchen-new-app",
  storageBucket: "kitchen-new-app.firebasestorage.app",
  messagingSenderId: "937444483195",
  appId: "1:937444483195:web:d9ee279e6f702684c182de",
  measurementId: "G-5SHK4W9GDG"
};

// initialize
const app = initializeApp(firebaseConfig);

// database + auth
export const db = getFirestore(app);
export const auth = getAuth(app);
