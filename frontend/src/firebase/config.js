import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGlr0Eln5kaAAqh30fzDjqVQcZgLxep50",
  authDomain: "ayurveda-app-bab1d.firebaseapp.com",
  projectId: "ayurveda-app-bab1d",
  storageBucket: "ayurveda-app-bab1d.firebasestorage.app",
  messagingSenderId: "616030185661",
  appId: "1:616030185661:web:d447d3b20be4fd1caa6fd4",
  measurementId: "G-1FWCWT63K0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);