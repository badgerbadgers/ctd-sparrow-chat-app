import { db } from "../config/fire-config"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { useState } from "react"
import React from "react"


function MiddleChatWindow() {
  const [messages, setMessages] = useState([])
  const messagesCollectionRef = collection(db, "messages")
  const queryMessages = query(messagesCollectionRef, orderBy("timestamp"))
  
  // captures data
  onSnapshot(queryMessages, function(snapshot) {
    setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })

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
