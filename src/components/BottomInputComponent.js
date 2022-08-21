import { useState } from "react"
import { db } from "../config/fire-config"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import style from './BottomInputComponent.module.css'

function BottomInputComponent( {currentUser} ) {
  const [message, setMessage] = useState("")

  const handleMessageChange = (e) => {
    const newMessage = e.target.value
    setMessage(newMessage)
  }

  const messagesCollectionRef = collection(db, "messages")

  // Saves a new message to Cloud Firestore.
  async function saveMessage(messageText) {
    // Add a new message entry to the Firebase database.
    try {
      await addDoc(messagesCollectionRef, {
        name: currentUser.displayName,
				email: currentUser.email,
        text: messageText,
        profilePicUrl: currentUser.photoURL,
        timestamp: serverTimestamp(),
      })
    } catch (error) {
      console.error("Error writing new message to Firebase Database", error)
    }
  }

  const handleSubmitMessage = (e) => {
    e.preventDefault()
    saveMessage(message)
    setMessage("")
  }

  return (
    <div>
    <form onSubmit={handleSubmitMessage} className={style.formGroup} >
      <input
        type='text'
        value={message}
        placeholder='Type something...'
        onChange={handleMessageChange}
        className={style.userInput}
        
        
      ></input>
      {/* <button>Submit</button> */}
    </form>
    </div>
  )
}

export default BottomInputComponent
