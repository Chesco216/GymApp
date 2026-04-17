import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBI8zRyd7OlQEhJOWr2m8RZQKJhH00yxc0",
  authDomain: "jayani-power-bddfb.firebaseapp.com",
  projectId: "jayani-power-bddfb",
  storageBucket: "jayani-power-bddfb.firebasestorage.app",
  messagingSenderId: "799292029570",
  appId: "1:799292029570:web:b07bfb1fdc0dec7cbf129b",
  measurementId: "G-97T140P9Q4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const db = getFirestore(app)

export const storage = getStorage(app, 'gs://jayani-power-bddfb.firebasestorage.app')
// const analytics = getAnalytics(app);
