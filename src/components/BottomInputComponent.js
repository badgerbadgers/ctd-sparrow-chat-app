import React, { useContext, useState } from "react"
import { db } from "../config/fire-config"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import "./BottomInputComponent.css"
import { BsFillArrowUpSquareFill } from "react-icons/bs"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import { ThemeContext } from "../context.js"
import useSound from "use-sound"
import buttonSound from "../sounds/stories_sounds_boop.mp3"
import { TbMusicOff } from "react-icons/tb"
import { BsMusicNoteBeamed } from "react-icons/bs"
import { useSoundHook } from "../hooks/useSoundHook"
import { TbArrowBigDown } from "react-icons/tb"

function BottomInputComponent({
  currentUser,
  isFocused,
  scrollToBottom,
  lastMessageIsInViewport,
}) {
  const [message, setMessage] = useState("")
  const { theme } = useContext(ThemeContext)
  const { changeSoundBool, sound, turnSoundOnOff } = useSoundHook()

  const handleMessageChange = (e) => {
    const newMessage = e.target.value
    setMessage(newMessage)
  }

  const handleSoundButton = () => {
    changeSoundBool(sound === false ? true : false)
  }

  const messagesCollectionRef = collection(db, "messages")

  // Saves a new message to Cloud Firestore.
  async function saveMessage(messageText) {
    // Add a new message entry to the Firebase database.
    try {
      await addDoc(messagesCollectionRef, {
        name: currentUser.displayName || currentUser.email,
        email: currentUser.email,
        text: messageText,
        profilePicUrl: currentUser.photoURL || "",
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
    e.preventDefault()
    if (message.trim() === "") {
      setMessage("")
      return
    } else {
      saveMessage(message)
      setMessage("")
      turnSoundOnOff(sound === true ? buttonSfx() : null)
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
      <Navbar fixed='bottom' style={{ backgroundColor: theme.primary }}>
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
              maxLength='500'
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
                  backgroundColor: "#fff",
                }}
                title='Send message'
              />
            )}
            <Button
              onClick={handleSoundButton}
              className='ms-3 bg-info rounded btn-sound-toogle'
            >
              {sound ? (
                <>
                  <BsMusicNoteBeamed
                    title='Sound on'
                    className='text-primary'
                  />
                </>
              ) : (
                <>
                  <TbMusicOff title='Sound off' className='text-primary' />
                </>
              )}
            </Button>
          </form>
          <button
            className={`${
              lastMessageIsInViewport ? "btn-scroll" : ""
            } bg-info rounded btn-scroll-down`}
            onClick={scrollToBottom}
            title='Scroll to last message'
          >
            <TbArrowBigDown />
          </button>
        </Container>
      </Navbar>
    </>
  )
}

export default BottomInputComponent
