import { useEffect } from "react"
import { signInWithGoogle, auth, signInError } from "../config/googleSignIn"
import { onAuthStateChanged } from "firebase/auth"
import logo from "../assets/sparrow-logo.svg"
import spinner from "../assets/loading_spinner_icon_yellow.png"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import "./SignIn.css"
import { useContext } from "react"
import { ThemeContext } from "../context.js"
import Form from "react-bootstrap/Form"
import { Container } from "react-bootstrap"

function SignIn({
  handleAuthStateChange,
  isLoading,
  handleIsLoadingStateChange,
}) {
  const { theme } = useContext(ThemeContext)

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
                    <Form.Control type='email' placeholder='Enter email' />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label style={{ color: theme.dark }}>
                      Password
                    </Form.Label>
                    <Form.Control type='password' placeholder='Password' />
                  </Form.Group>
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicCheckbox'
                  ></Form.Group>
                  <Button variant='info' type='submit'>
                    <p style={{ color: theme.dark }}>Submit</p>
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
