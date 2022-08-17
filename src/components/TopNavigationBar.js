import logo from "../assets/sparrow-logo-w-bg.png"
import { signOutUser, removeUser } from "../config/googleSignIn"
import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import style from "./TopNavigationBar.module.css"

function TopNavigationBar({ currentUser }) {
  const signedInUser = currentUser ? currentUser.displayName : "user"

  // When signing out removes user from 'users' collection and signs out user.
  const handleSignOutUser = () => {
    removeUser(currentUser)
    signOutUser()
  }
  return (
    <>
      <Navbar className={style.navbarContainer}>
        <Container>
          <Image src={logo} width='75' />
          <Image src={currentUser.photoURL} width='75' />
          <p className={style.navText}>{signedInUser}</p>
          <Navbar.Toggle aria-expanded='true' />
          <Link to='/'>
            <Button className={style.navButton} onClick={handleSignOutUser}>
              Sign Out
            </Button>
          </Link>
        </Container>
      </Navbar>
    </>
  )
}

export default TopNavigationBar
