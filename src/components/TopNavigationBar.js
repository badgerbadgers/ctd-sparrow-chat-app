import logo from "../assets/sparrow-logo.svg"
import { signOutUser } from "../config/googleSignIn"
import { Link } from "react-router-dom"

function TopNavigationBar() {
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
        <button onClick={signOutUser}>Logout</button>
      </Link>
    </>
  )
}

export default TopNavigationBar
