import TopNavigationBar from "./TopNavigationBar"
import LeftSideComponent from "./LeftSideComponent"
import MiddleChatWindow from "./MiddleChatWindow"
import BottomInputComponent from "./BottomInputComponent"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Chat({ currentUser }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate("/")
    }
  }, [])

  return (
    <>
      <TopNavigationBar currentUser={currentUser} />
      <LeftSideComponent />
      <MiddleChatWindow currentUser={currentUser} />
      <BottomInputComponent currentUser={currentUser} isFocused />
    </>
  )
}

export default Chat
