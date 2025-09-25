// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBC-tz3spH4nDdd4C4G-hOEfrbwH8fL8e4",
  authDomain: "kitchen-new-app.firebaseapp.com",
  projectId: "kitchen-new-app",
  storageBucket: "kitchen-new-app.firebasestorage.app",
  messagingSenderId: "937444483195",
  appId: "1:937444483195:web:d9ee279e6f702684c182de",
  measurementId: "G-5SHK4W9GDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);