// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4a6YgSvWWB3ov-NpAU_EIgWZrHNnt1Mo",
  authDomain: import.meta.env.VITE_DOMAIN,
  projectId: "zehnda-dev",
  storageBucket: "zehnda-dev.firebasestorage.app",
  messagingSenderId: "1034839670338",
  appId: "1:1034839670338:web:5fc4d0c3499de01ebef7db",
  measurementId: "G-JWSZF3P8MG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth };