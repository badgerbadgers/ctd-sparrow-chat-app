import { useEffect } from "react"
import { signInWithGoogle, auth, signInError } from "../config/googleSignIn"
import { onAuthStateChanged } from "firebase/auth"
import logo from "../assets/sparrow-logo.svg"
import spinner from "../assets/loading_spinner_icon_yellow.png"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import "./SignIn.css"

function SignIn({
  handleAuthStateChange,
  isLoading,
  handleIsLoadingStateChange,
}) {
  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      handleAuthStateChange(data)
    })
  }, [])

  return (
    <div>
      <div className='min-vh-100 d-flex justify-content-center align-items-center flex-column border border-dark mx-auto w-50 bg-primary'>
        <img
          src={logo}
          className='filterYellow'
          style={{ height: 75, width: 75 }}
          alt='Sparrow Logo'
        />
        <h1 className='h6 text-warning'>sparrow</h1>

        {isLoading ? (
          <img
            src={spinner}
            style={{ height: 75, width: 75 }}
            alt='Loading Spinner'
          />
        ) : (
          <Button
            variant='light'
            onClick={() => {
              handleIsLoadingStateChange(true)
              signInWithGoogle(handleIsLoadingStateChange)
            }}
            className='px-4 rounded-pill bg-info'
          >
            Sign in with <i className='bi bi-google'></i>
          </Button>
        )}
      </div>
    </div>
  )
}

export default SignIn
