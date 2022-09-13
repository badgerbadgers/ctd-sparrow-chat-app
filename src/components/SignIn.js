import { useEffect } from "react"
import { signInWithGoogle, auth, signInError } from "../config/sign-in"
import { onAuthStateChanged } from "firebase/auth"
import logo from "../assets/sparrow-logo.svg"
import spinner from "../assets/loading_spinner_icon_yellow.png"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import "./SignIn.css"
import { useContext, useState } from "react"
import { ThemeContext } from "../context.js"
import Form from "react-bootstrap/Form"
import { Container } from "react-bootstrap"
import { signInEmail } from "../config/sign-in"

function SignIn({
  handleAuthStateChange,
  isLoading,
  handleIsLoadingStateChange,
}) {
  const { theme } = useContext(ThemeContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    signInEmail(email, password)
  }
  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      handleAuthStateChange(data)
    })
  }, [])

  return (
    <div>
      <div className='min-vh-100 d-flex justify-content-center align-items-center flex-column border border-dark mx-auto w-50 bg-primary'>
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
                <h2 className='sign-in-text'>Sign In</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label className='sign-in-text'>
                      Email address
                    </Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Enter email'
                      value={email}
                      onChange={onEmailChange}
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label className='sign-in-text'>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={onPasswordChange}
                    />
                  </Form.Group>
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicCheckbox'
                  ></Form.Group>
                  <Button
                    variant='info'
                    type='submit'
                    className='w-100 rounded-pill submit-btn'
                  >
                    Submit
                  </Button>
                  <br />
                  <Button
                    variant='info'
                    onClick={() => {
                      handleIsLoadingStateChange(true)
                      signInWithGoogle(handleIsLoadingStateChange)
                    }}
                    className='px-4 rounded-pill bg-info w-100 google-btn'
                  >
                    Sign in with <i className='bi bi-google'></i>
                  </Button>
                  <Link to='/SignUp' className='sign-in-text link-text'>
                    <p>Don't Have An Account? Sign Up With Email</p>
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
