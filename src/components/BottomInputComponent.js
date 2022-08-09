import { useState } from "react"
import { db } from "../config/fire-config"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

function BottomInputComponent() {
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
        name: "getUserName",
        text: messageText,
        profilePicUrl: "getProfilePicUrl",
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
    <form onSubmit={handleSubmitMessage}>
      <input
        type='text'
        value={message}
        placeholder='type something'
        onChange={handleMessageChange}
      ></input>
      <button>Submit</button>
    </form>
  )
}

export default BottomInputComponent
