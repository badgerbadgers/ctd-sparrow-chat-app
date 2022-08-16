import logo from "../assets/sparrow-logo.svg"
import { signOutUser, removeUser } from "../config/googleSignIn"
import { Link } from "react-router-dom"

function TopNavigationBar({ currentUser }) {
  // When signing out removes user from 'users' collection and signs out user.
  const handleSignOutUser = () => {
    removeUser(currentUser)
    signOutUser()
  }
  return (
    <>
      {/* Sparrow logo is HUGE, put some temporary inline styling */}
      <img src={logo} alt='Sparrow Logo' style={{ height: "28px" }} />

      {/* Search input and button */}
      {/* <input type="text" placeholder='Search chat for...' /> */}
      {/* <button>Search</button> */}

      {/* Profile */}
      <span> Placeholder Username </span>

      {/* Logout button */}
      <Link to='/'>
        <button onClick={handleSignOutUser}>Logout</button>
      </Link>
    </>
  )
}

export default TopNavigationBar
