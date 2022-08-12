// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// auth object is the gateway to the Firebase authentication API
// -> we can reference auth objects to manage user accounts and credentials
export const auth = getAuth(app)
export const db = getFirestore(app)

// provider object represents everything related to Google authentication
const provider = new GoogleAuthProvider()
const usersCollectionRef = collection(db, "users")

// Prompt user to sign in w/their Google account by opening a pop-up window
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      addDoc(usersCollectionRef, {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        timestamp: serverTimestamp(),
      })
      // Information about the user based on who signed in
      console.log(result.user)
    })
    .catch((error) => {
      console.log(error)
    })
}
