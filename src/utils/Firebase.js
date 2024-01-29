// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy3cRnktzTgUnOPl9EBJlDjo8DuSRkqyo",
  authDomain: "netflixgpt-cdf61.firebaseapp.com",
  projectId: "netflixgpt-cdf61",
  storageBucket: "netflixgpt-cdf61.appspot.com",
  messagingSenderId: "65537560333",
  appId: "1:65537560333:web:d684d042ecdd2159a3aa44",
  measurementId: "G-EQZWJY3DRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export  const auth = getAuth();