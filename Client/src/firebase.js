import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqSRO1y296Yl2Y43GRIgklnCrL08jIBOA",
  authDomain: "dinos-marketplace.firebaseapp.com",
  projectId: "dinos-marketplace",
  storageBucket: "dinos-marketplace.appspot.com",
  messagingSenderId: "431553567526",
  appId: "1:431553567526:web:b6cde8c7df45bd8ae03fe7"
};

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export {auth}