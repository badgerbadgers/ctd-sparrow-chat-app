import { db } from "./fire-config"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import {
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  collection,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore"

export const auth = getAuth()
// Signs out user from application
export const signOutUser = () => {
  signOut(auth)
}
// when user signs out this function is called to also remove user from 'users' collection
export const removeUser = async (currentUser) => {
  const userDocs = await getDocs(
    query(usersCollectionRef, where("email", "==", currentUser.email))
  )
  await deleteDoc(doc(db, "users", userDocs.docs[0].id))
}

// provider object represents everything related to Google authentication
const provider = new GoogleAuthProvider()
const usersCollectionRef = collection(db, "users")

// Prompt user to sign in w/their Google account by opening a pop-up window
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // Checks if user is already on "users" collection
      const userDocs = await getDocs(
        query(usersCollectionRef, where("email", "==", result.user.email))
      )
      const user = userDocs.docs.map((doc) => doc.data())
      if (!user.length) {
        addDoc(usersCollectionRef, {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          timestamp: serverTimestamp(),
        })
      }
      // Information about the user based on who signed in
      // console.log(result.user)
    })
    .catch((error) => {
      console.log(error)
    })
}
