// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHfAOulkM1nlJBBFyHaPMmi42vkL-TOhk",
  authDomain: "email-password-authentic-26e79.firebaseapp.com",
  projectId: "email-password-authentic-26e79",
  storageBucket: "email-password-authentic-26e79.appspot.com",
  messagingSenderId: "82871753823",
  appId: "1:82871753823:web:d53e1679efdf1832e7cfea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth