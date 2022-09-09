import { useEffect } from "react"
import {
  signInWithGoogle,
  auth,
  // signInError,
} from "../config/sign-in"
import { onAuthStateChanged } from "firebase/auth"
import logo from "../assets/sparrow-logo.svg"
import spinner from "../assets/loading_spinner_icon_yellow.png"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import "./SignIn.css"
import { useContext, useRef } from "react"
import { ThemeContext } from "../context.js"
import Form from "react-bootstrap/Form"
import { Container } from "react-bootstrap"
import { signin } from "../config/sign-in"

function SignIn({
  handleAuthStateChange,
  isLoading,
  handleIsLoadingStateChange,
}) {
  const { theme } = useContext(ThemeContext)
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = () => {
    // try {
    //   signin(emailRef.current.value, passwordRef.current.value)
    // } catch {
    //   alert("Error")
    // }
    // return signsInWithEmailAndPassword(
    //   auth,
    //   emailRef.current.value,
    //   passwordRef.current.value
    // )
  }
  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      handleAuthStateChange(data)
    })
  }, [])

  return (
    <div>
      <div className='min-vh-100 d-flex justify-content-center align-items-center flex-column border border-dark mx-auto w-50 bg-primary'>
        {/* <img
          src={logo}
          className='filterYellow'
          style={{ height: 75, width: 75 }}
          alt='Sparrow Logo'
        />
        <h1 className='h6 text-warning'>sparrow</h1> */}

        {isLoading ? (
          <>
            <img
              src={logo}
              className='filterYellow'
              style={{ height: 75, width: 75 }}
              alt='Sparrow Logo'
            />
            <h1 className='h6 text-warning'>sparrow</h1>
            <img
              src={spinner}
              style={{ height: 75, width: 75 }}
              alt='Loading Spinner'
            />
          </>
        ) : (
          <>
            <Container className='sign-in-container'>
              <div className='sign-in-form-section'>
                <img
                  src={logo}
                  className='filterYellow'
                  style={{ height: 75, width: 75 }}
                  alt='Sparrow Logo'
                />
                <h1 className='h6 text-warning'>sparrow</h1>
                <h2 style={{ color: theme.dark }}>Sign In</h2>
                <Form>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label style={{ color: theme.dark }}>
                      Email address
                    </Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Enter email'
                      ref={emailRef}
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label style={{ color: theme.dark }}>
                      Password
                    </Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Password'
                      ref={passwordRef}
                    />
                  </Form.Group>
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicCheckbox'
                  ></Form.Group>
                  <Button variant='info' type='submit' onSubmit={handleSubmit}>
                    Submit
                  </Button>
                  <br />
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
                  <p>Don't Have An Account?</p>
                  <Link to='/SignUp' style={{ color: theme.light }}>
                    Sign Up With Email
                  </Link>
                </Form>
              </div>
            </Container>
          </>
        )}
      </div>
    </div>
  )
}

export default SignIn
