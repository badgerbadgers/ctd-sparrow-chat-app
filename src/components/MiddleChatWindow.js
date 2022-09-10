import { db } from "../config/fire-config"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { useState, useEffect, useContext, useRef, useMemo } from "react"
import "./MiddleChatWindow.css"
import { ThemeContext } from "../context.js"
import UserLogo from "../assets/sparrow-user-profile.svg"

function MiddleChatWindow({ currentUser }) {
  const [messages, setMessages] = useState([])
  const messagesCollectionRef = collection(db, "messages")
  const queryMessages = query(
    messagesCollectionRef,
    orderBy("timestamp", "desc")
  )
  const { theme } = useContext(ThemeContext)
  const screenBottom = useRef(null)
  const lastMessageIsInViewport = useIsInViewport(screenBottom)

  // captures data
  const getMessages = () => {
    onSnapshot(queryMessages, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }

  function useIsInViewport(ref) {
    const [isIntersecting, setIsIntersecting] = useState(false)

    const observer = useMemo(
      () =>
        new IntersectionObserver(
          ([entry]) => {
            setIsIntersecting(entry.isIntersecting)
          },
          {
            rootMargin: "20px",
          }
        ),
      []
    )

    useEffect(() => {
      observer.observe(ref.current)

      return () => {
        observer.disconnect()
      }
    }, [ref, observer])

    return isIntersecting
  }

  const scrollToBottom = () => {
    screenBottom.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (lastMessageIsInViewport) {
      scrollToBottom()
    }
  }, [messages])

  useEffect(() => {
    getMessages()
  }, [])

  return (
    <>
      <ul
        className='list-container d-flex list-unstyled'
        style={{ backgroundColor: theme.primary }}
      >
        {/* div to check if last message is in viewport */}
        <div ref={screenBottom}></div>
        {/* renders message */}
        {messages.map((message) => {
          console.log(message)
          const name = `${message.name.split(" ")[0]} ${
            message.name.split(" ")[1][0]
          }.`

          return (
            <div
              key={message.id}
              className={
                message.email === currentUser.email
                  ? "profile-pic-and-message-end"
                  : "profile-pic-and-message"
              }
              style={{ backgroundColor: theme.backgroundColor }}
            >
              <img
                className='user-image'
                // Conditional statement for profile image
                src={message ? message.profilePicUrl : ""}
                width='75'
                alt='profile pic'
              />
              <li className='list-item'>
                <div className='card-header d-flex justify-content-between p-0 list-item-divider'>
                  <p className='list-item-name fw-bold mb-0'>{name}</p>
                </div>
                <div className='card-body'>
                  <p className='mb-0'>{message.text}</p>
                </div>
                {/* TODO Implement TimeAgo */}
                {/* <div className='card-header d-flex justify-content-end p-0'>
                  <p className='text-dark small mb-0 mt-1'>1 min ago</p>
                </div> */}
              </li>
            </div>
          )
        })}
      </ul>
    </>
  )
}

export default MiddleChatWindow
