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
      <section className='bg-secondary'>
        <div className='container'>
          <div className='row'>
            <div className='col-2'>
              <LeftSideComponent />
            </div>
            <div className='col-8'>
              <MiddleChatWindow currentUser={currentUser} />
            </div>
              <div className='col-2'>
            </div>
          </div>
        </div>
      </section>
      <BottomInputComponent currentUser={currentUser} isFocused />
    </>
  )
}

export default Chat
