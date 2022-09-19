import { useMemo, useContext } from "react"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import "./Message.css"
import UserLogo from "../assets/sparrow-user-profile.svg"
import { ThemeContext } from "../context/themeContext.js"

TimeAgo.addLocale(en)

function Message({ name, text, timestamp, email, profilePicUrl, currentUser }) {
  const { theme } = useContext(ThemeContext)

  const timeAgo = useMemo(
    () => new TimeAgo("en-US").format(timestamp.toDate()),
    [timestamp]
  )

  let username
  //if username contains @ symbol then return the text before @
  if (name.includes("@")) {
    username = `${name.split("@")[0]}`
    //if username contains a space then format second text with period if there is more than one character or just return the second character with no period
  } else if (name.includes(" ")) {
    username = `${name.split(" ")[0]} ${name.split(" ")[1][0]}.`
    //by default return user name
  } else {
    username = name
  }

  return (
    <div
      className={
        email === currentUser.email
          ? "profile-pic-and-message-end"
          : "profile-pic-and-message"
      }
      style={{ backgroundColor: theme.backgroundColor }}
    >
      <img
        className='user-image'
        // Conditional statement for profile image
        src={profilePicUrl ? profilePicUrl : UserLogo}
        width='75'
        alt='profile pic'
      />
      <li className='list-item'>
        <div className='card-header d-flex justify-content-between p-0 list-item-divider'>
          <p className='list-item-name fw-bold mb-0'>{username}</p>
        </div>
        <div className='card-body'>
          <p className='mb-0'>{text}</p>
        </div>
        <div className='card-header d-flex justify-content-end p-0'>
          <p className='text-muted small mb-0 mt-1'>{timeAgo}</p>
        </div>
      </li>
    </div>
  )
}

export default Message
