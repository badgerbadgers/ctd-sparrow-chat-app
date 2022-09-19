import { useContext } from "react"
import "./MiddleChatWindow.css"
import { ThemeContext } from "../themeContext.js"
import Message from "./Message"


function MiddleChatWindow({ messages, screenBottom }) {
  const { theme } = useContext(ThemeContext)

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
         
          //   ? message.email
     

          return <Message key={message.id} {...message} />
       
        })}
      </ul>
    </>
  )
}

export default MiddleChatWindow
