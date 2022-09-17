import TopNavigationBar from "./TopNavigationBar"
import LeftSideComponent from "./LeftSideComponent"
import MiddleChatWindow from "./MiddleChatWindow"
import BottomInputComponent from "./BottomInputComponent"
import { db } from "../config/fire-config"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { useEffect, useContext, useState, useRef, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { ThemeContext } from "../context/themeContext.js"
import { SoundProvider } from "../context/SoundContext"

function Chat({ currentUser }) {
  const [messages, setMessages] = useState([])
  const messagesCollectionRef = collection(db, "messages")
  const screenBottom = useRef(null)
  const lastMessageIsInViewport = useIsInViewport(screenBottom)
  const queryMessages = query(
    messagesCollectionRef,
    orderBy("timestamp", "desc")
  )
  const navigate = useNavigate()
  const { theme } = useContext(ThemeContext)

  const getMessages = () => {
    onSnapshot(queryMessages, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }

  const scrollToBottom = () => {
    screenBottom.current?.scrollIntoView({ behavior: "smooth" })
  }

  function useIsInViewport(ref) {
    const [isIntersecting, setIsIntersecting] = useState(false)

    const observer = useMemo(
      () =>
        new IntersectionObserver(([entry]) => {
          setIsIntersecting(entry.isIntersecting)
        }),
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

  useEffect(() => {
    if (!currentUser) {
      navigate("/")
    } else {
      getMessages()
    }
  }, [])

  useEffect(() => {
    if (lastMessageIsInViewport) {
      scrollToBottom()
    }
  }, [messages])

  return (
    <>
      <TopNavigationBar currentUser={currentUser} />
      <section
        className='min-vh-100'
        style={{ backgroundColor: theme.primary }}
      >
        <div className='container'>
          <div className='row'>
            <div className='col-2'>
              <LeftSideComponent />
            </div>
            <div className='col-8'>
              <MiddleChatWindow
                currentUser={currentUser}
                messages={messages}
                screenBottom={screenBottom}
              />
            </div>
            <div className='col-2'></div>
          </div>
          {/* Provide the global sound context value to this component */}
          <SoundProvider>
            <BottomInputComponent
              currentUser={currentUser}
              lastMessageIsInViewport={lastMessageIsInViewport}
              scrollToBottom={scrollToBottom}
              isFocused
            />
          </SoundProvider>
        </div>
      </section>
    </>
  )
}

export default Chat
