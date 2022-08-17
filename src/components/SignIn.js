import { useEffect } from "react"
import { signInWithGoogle, auth } from "../config/googleSignIn"
import { onAuthStateChanged } from "firebase/auth"
import logo from "../assets/sparrow-logo.svg"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"

function SignIn({ handleAuthStateChange }) {
  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      handleAuthStateChange(data)
    })
  }, [])

  return (
    <div className='min-vh-100 d-flex justify-content-center align-items-center flex-column border border-dark mx-auto w-50'>
      <img src={logo} style={{ height: 75, width: 75 }} alt='Sparrow Logo' />
      <h1 className='h6'>sparrow</h1>
      <Link to='/chat'>
        <div className='mt-5'>
          <Button
            variant='light'
            onClick={signInWithGoogle}
            className='px-4 rounded-pill'
          >
            Sign in with <i class='bi bi-google'></i>
          </Button>
        </div>
      </Link>
    </div>
  )
}

export default SignIn
