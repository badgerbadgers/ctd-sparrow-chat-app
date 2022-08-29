import logo from "../assets/sparrow-logo.svg"
import { signOutUser, removeUser } from "../config/googleSignIn"
import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import "./TopNavigationBar.css"
import { ThemeContext } from "../context.js"
import { useContext } from "react"

function TopNavigationBar({ currentUser }) {
  const { light, toggle, theme } = useContext(ThemeContext)
  console.log("light", light)
  // When signing out removes user from 'users' collection and signs out user.
  const handleSignOutUser = () => {
    removeUser(currentUser)
    signOutUser()
  }
  return (
    <div>
      <Navbar
        bg='navbar-dark'
        className='pt-2'
        fixed='top'
        style={
          light ? { backgroundColor: "white" } : { backgroundColor: "black" }
        }
      >
        <Container>
          <Navbar.Brand>
            <img
              src={logo}
              width='50'
              height='50'
              className='filter-yellow'
              alt='Sparrow Logo'
            />
            <p className='h6 text-warning'>sparrow</p>
          </Navbar.Brand>
          <span className='fs-5 text-white ms-auto me-2'>
            {currentUser ? currentUser.displayName : ""}
          </span>
          <Image
            src={currentUser ? currentUser.photoURL : ""}
            width='55'
            height='55'
            className='me-5 rounded-circle'
          />
          <Link to='/'>
            <Button
              variant='light'
              className='px-3 rounded bg-info'
              onClick={handleSignOutUser}
            >
              Sign Out
            </Button>
          </Link>
          <button
            type='button'
            onClick={toggle}
            style={{
              backgroundColor: theme.backgroundColor,
              color: theme.color,
            }}
          >
            toggle {!light ? "Light" : "Dark"} theme
          </button>
        </Container>
      </Navbar>
    </div>
  )
}

export default TopNavigationBar
