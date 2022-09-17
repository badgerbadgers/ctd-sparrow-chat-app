import { useContext } from "react"
import "./MiddleChatWindow.css"
import { ThemeContext } from "../themeContext.js"
import Message from "./Message"
import UserLogo from "../assets/sparrow-user-profile.svg"

function MiddleChatWindow({ currentUser, messages, screenBottom }) {
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
          // const name = message.name.includes("@")
          //   ? message.email
          //   : `${message.name.split(" ")[0]} ${message.name.split(" ")[1][0]}.`

          return <Message key={message.id} {...message} />
          // return (
          //   <div
          //     key={message.id}
          //     className={
          //       message.email === currentUser.email
          //         ? "profile-pic-and-message-end"
          //         : "profile-pic-and-message"
          //     }
          //     style={{ backgroundColor: theme.backgroundColor }}
          //   >
          //     <img
          //       className='user-image'
          //       // Conditional statement for profile image
          //       src={message.profilePicUrl ? message.profilePicUrl : UserLogo}
          //       width='75'
          //       alt='profile pic'
          //     />
          //     <li className='list-item'>
          //       <div className='card-header d-flex justify-content-between p-0 list-item-divider'>
          //         <p className='list-item-name fw-bold mb-0'>{name}</p>
          //       </div>
          //       <div className='card-body'>
          //         <p className='mb-0'>{message.text}</p>
          //       </div>
          //       <div className='card-header d-flex justify-content-end p-0'>
          //         <p className='text-dark small mb-0 mt-1'>1 min ago</p>
          //       </div>
          //     </li>
          //   </div>
          // )
        })}
      </ul>
    </>
  )
}

export default MiddleChatWindow
