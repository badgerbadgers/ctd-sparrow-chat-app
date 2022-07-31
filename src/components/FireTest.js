import { useState } from "react"
import { db } from "../config/fire-config"
import { addDoc, collection } from "firebase/firestore"

function FireTest() {
  const [message, setMessage] = useState("")
  const messagesCollectionRef = collection(db, "messages")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addDoc(messagesCollectionRef, { msg: message }).then(() =>
      setMessage("")
    )
  }
  return (
    <>
      <h1>Firebase test</h1>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Message'
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default FireTest
