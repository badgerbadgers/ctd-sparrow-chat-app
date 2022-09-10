import TopNavigationBar from "./TopNavigationBar"
import LeftSideComponent from "./LeftSideComponent"
import MiddleChatWindow from "./MiddleChatWindow"
import BottomInputComponent from "./BottomInputComponent"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ThemeContext } from "../context.js"
import { useContext } from "react"
import { SoundProvider } from "../context/SoundContext"

function Chat({ currentUser }) {
  const navigate = useNavigate()
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    if (!currentUser) {
      navigate("/")
    }
  }, [])

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
              <MiddleChatWindow currentUser={currentUser} />
            </div>
            <div className='col-2'></div>
          </div>
          {/* Provide the global sound context value to this component */}
          <SoundProvider>
            <BottomInputComponent currentUser={currentUser} isFocused />
          </SoundProvider>
        </div>
      </section>
    </>
  )
}

export default Chat
