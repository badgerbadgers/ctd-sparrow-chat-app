import logo from "../assets/sparrow-logo-w-bg.png"
import { signOutUser, removeUser } from "../config/googleSignIn"
import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"

function TopNavigationBar({ currentUser }) {
  console.log(currentUser)
  const signedInUser = currentUser ? currentUser.displayName : "user"
  // const profilePic = currentUser ? currentUser.photoUrl : null

  // When signing out removes user from 'users' collection and signs out user.
  const handleSignOutUser = () => {
    // removeUser(currentUser)
    signOutUser()
  }
  return (
    <Navbar expand='lg'>
      <Container>
        <Image src={logo} width='75' />
        {/* <img className='navbar-brand img-thumbnail' src={logo} alt='logo'></img> */}
        <p className='navbar-text'>{signedInUser}</p>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {/* <p className='navbar-text'>{signedInUser}</p> */}
            <Link to='/'>
              <Button onClick={handleSignOutUser}>Sign Out</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default TopNavigationBar
