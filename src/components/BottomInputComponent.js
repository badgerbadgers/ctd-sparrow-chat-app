import React from "react"
import { useState } from "react"
import { db } from "../config/fire-config"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import "./BottomInputComponent.css"

function BottomInputComponent({ currentUser, isFocused }) {
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

  // Perform focus on input field's element via the DOM API when component renders/ dependency changes
  // (imperative approach)
  const inputRef = React.useRef()

  // Execute focus() only if isFocused is set & current property is existent
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isFocused])

  return (
    <div>
      <form onSubmit={handleSubmitMessage} className='bottom-input-form'>
        <input
          type='text'
          value={message}
          placeholder='Type something...'
          onChange={handleMessageChange}
          className='bottom-input-field'
          ref={inputRef}
        ></input>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default BottomInputComponent
