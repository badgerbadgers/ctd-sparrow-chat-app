import { useMemo } from "react"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import "./Message.css"

TimeAgo.addLocale(en)

function Message({ name, text, timestamp, email, profilePicUrl }) {
  const timeAgo = useMemo(
    () => new TimeAgo("en-US").format(timestamp.toDate()),
    [timestamp]
  )
  const username = name.includes("@")
    ? email
    : `${name.split(" ")[0]} ${name.split(" ")[1][0]}.`
  return (
    <>
      <br />
      <p>{timeAgo}</p>
      <p>{text}</p>
      <p>{username}</p>
    </>
  )
}

export default Message
