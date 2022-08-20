import logo from "../assets/sparrow-navbar-w-bg-logo.png"
import { signOutUser, removeUser } from "../config/googleSignIn"
import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import Col from "react-bootstrap/Col"
import style from "./TopNavigationBar.module.css"

function TopNavigationBar({ currentUser }) {
  // When signing out removes user from 'users' collection and signs out user.
  const handleSignOutUser = () => {
    removeUser(currentUser)
    signOutUser()
  }
  return (
    <>
      <Navbar className={style.navbarContainer}>
        <Container>
          <Col md={7}>
            <Image src={logo} width='70' />
          </Col>
          <Col sm={1}>
            <Image
              src={currentUser ? currentUser.photoURL : ""}
              width='50'
              className={style.logoImg}
            />
          </Col>
          <Col sm={2}>
            <p className={style.navText}>
              {currentUser ? currentUser.displayName : ""}
            </p>
          </Col>
          <Col sm={2}>
            <Link to='/'>
              <Button className={style.navButton} onClick={handleSignOutUser}>
                Sign Out
              </Button>
            </Link>
          </Col>
        </Container>
      </Navbar>
    </>
  )
}

export default TopNavigationBar
