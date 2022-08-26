import { db } from "../config/fire-config"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { useState, useEffect } from "react"
import "./MiddleChatWindow.css"

function MiddleChatWindow({ currentUser }) {
  const [messages, setMessages] = useState([])
  const messagesCollectionRef = collection(db, "messages")
  const queryMessages = query(
    messagesCollectionRef,
    orderBy("timestamp", "desc")
  )

  // captures data
  const getMessages = () => {
    onSnapshot(queryMessages, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }

  useEffect(() => {
    getMessages()
  }, [])

  return (
    <>
      <ul className='list-container d-flex'>
        {/* renders message */}
        {messages.map((message) => {
          return (
            <div
              key={message.id}
              className={
                message.email === currentUser.email
                  ? "profile-pic-and-message-end"
                  : "profile-pic-and-message"
              }
            >
              <img
                className='user-image'
                src={message.profilePicUrl}
                width='75'
                alt='profile pic'
              />
              <li className='list-item'>{message.text}</li>
            </div>
          )
        })}
      </ul>
    </>
  )
}

export default MiddleChatWindow
