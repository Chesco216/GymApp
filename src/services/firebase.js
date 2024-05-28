// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtsT0rzms7DLyv90m89BMaWU_fp1yC-O0",
  authDomain: "jayani-power.firebaseapp.com",
  projectId: "jayani-power",
  storageBucket: "jayani-power.appspot.com",
  messagingSenderId: "184247539439",
  appId: "1:184247539439:web:9158d65ca9072db77c6d1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
