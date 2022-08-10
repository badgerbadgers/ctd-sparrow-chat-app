import { db } from "../config/fire-config"
import { collection, onSnapshot } from "firebase/firestore"
import { useState, useEffect } from "react"
import React from "react"


function MiddleChatWindow() {
  const [messages, setMessages] = useState([])
  const messagesCollectionRef = collection(db, "messages")
  
  useEffect(() => {
    // captures data
    const getMessages = async () => {
     await onSnapshot(messagesCollectionRef, function(snapshot) {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
    
  }
  
  getMessages()
  }, [])
  
  return (
    <>
    <ul>
      {/* renders message */}
      {messages.map((message) => {
      return <li key={message.id}>{message.text}</li>
          })}
    </ul>
    </>
  )
}

export default MiddleChatWindow
