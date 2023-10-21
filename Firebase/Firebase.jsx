// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACxidLSoYnQyEX0qw2u2cJhRb7ul4I2RA",
  authDomain: "outerbase-cd976.firebaseapp.com",
  projectId: "outerbase-cd976",
  storageBucket: "outerbase-cd976.appspot.com",
  messagingSenderId: "738792185590",
  appId: "1:738792185590:web:7e3833397cbc06da4716d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, app };
