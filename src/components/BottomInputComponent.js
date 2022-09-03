import React, { useContext, useState } from "react"
import { db } from "../config/fire-config"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import "./BottomInputComponent.css"
import { BsFillArrowUpSquareFill } from "react-icons/bs"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import { ThemeContext } from "../context.js"
// import use-sound React hook for sound effects
import useSound from "use-sound"
import buttonSound from "../sounds/stories_sounds_boop.mp3"

function BottomInputComponent({ currentUser, isFocused }) {
  const [message, setMessage] = useState("")
  const { light, theme } = useContext(ThemeContext)

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

  //  ========================================================
  // add character limit & prevent page reload on space submission
  //  ========================================================
  const handleSubmitMessage = (e) => {
    if (message === null || message.trim() === "") {
      return
    } else {
      e.preventDefault()
      saveMessage(message)
      setMessage("")
      buttonSfx()
    }
  }

  const [buttonSfx] = useSound(buttonSound)

  // Perform focus on input field's element via the DOM API when component renders/dependency changes
  // (imperative approach)
  const inputRef = React.useRef()

  // Execute focus() only if isFocused is set & current property is existent
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isFocused])

  return (
    <>
      <Navbar
        fixed='bottom'
        style={
          light
            ? { backgroundColor: theme.primary }
            : { backgroundColor: theme.primary }
        }
      >
        <Container className='container-bottom-input-form'>
          <form
            onSubmit={handleSubmitMessage}
            className='bottom-input-form'
            fixed='bottom'
          >
            <input
              required
              type='text'
              value={message}
              placeholder='Type something...'
              onChange={handleMessageChange}
              className='bottom-input-field'
              ref={inputRef}
            ></input>
            {message.length === 0 ? (
              <div className='wrapper'>
                <BsFillArrowUpSquareFill
                  type='button'
                  disabled={true}
                  className='pointer-events-none'
                  style={{
                    color: "rgb(59, 191, 105, .6)",
                    fontSize: "40px",
                    marginLeft: "-42px",
                    border: "1px solid #fff",
                    borderRadius: "0 10px 10px 0",
                  }}
                />
              </div>
            ) : (
              <BsFillArrowUpSquareFill
                type='button'
                onClick={handleSubmitMessage}
                style={{
                  color: "#3BBF69",
                  fontSize: "40px",
                  marginLeft: "-42px",
                  border: "1px solid #fff",
                  borderRadius: "0 10px 10px 0",
                }}
              />
            )}
          </form>
        </Container>
      </Navbar>
    </>
  )
}

export default BottomInputComponent
