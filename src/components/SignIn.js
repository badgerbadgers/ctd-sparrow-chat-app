import { useEffect } from "react"
import { signInWithGoogle, auth } from "../config/sign-in"
import { onAuthStateChanged } from "firebase/auth"
import logo from "../assets/sparrow-logo.svg"
import spinner from "../assets/loading_spinner_icon_yellow.png"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import "./SignIn.css"
import { useContext, useState } from "react"
import { ThemeContext } from "../themeContext.js"
import Form from "react-bootstrap/Form"
import { Container, ThemeProvider } from "react-bootstrap"
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
      {!isLoading ? (
        <ThemeProvider
          breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
          minBreakpoint='xxs'
        >
          <div className='bg-secondary'>
            <div className='sign-in-container bg-primary'>
              <img
                src={logo}
                className='filter-yellow bird-logo'
                style={{ height: 55, width: 55 }}
                alt='Sparrow Logo'
              />
              <h1 className='h6 text-warning ms-2 pb-4'>sparrow</h1>
              <h2 className='sign-in-text font-weight-bold'>Sign In</h2>
              <div className='sign-in-form-section'>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label className='sign-in-text'>Email</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Enter email'
                      value={email}
                      onChange={onEmailChange}
                      rerquired
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label className='sign-in-text'>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={onPasswordChange}
                      required
                    />
                  </Form.Group>
                  <Button
                    variant='light'
                    type='submit'
                    className='bg-info w-100 rounded-pill submit-btn'
                  >
                    Submit
                  </Button>
                  <br />
                  <Button
                    variant='light'
                    onClick={() => {
                      handleIsLoadingStateChange(true)
                      signInWithGoogle(handleIsLoadingStateChange)
                    }}
                    className='px-4 rounded-pill bg-info w-100 google-btn'
                  >
                    Sign in with <i className='bi bi-google'></i>
                  </Button>
                  <p className='sign-in-text'>Don't have an account?</p>
                  <p className='sign-in-text'>
                    {" "}
                    Sign up with
                    <Link to='/SignUp' className='link-text text-warning'>
                      {" "}
                      Email
                    </Link>
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </ThemeProvider>
      ) : (
        <div className='bg-secondary'>
          <div className='sign-in-container bg-primary'>
            <img
              src={logo}
              className='filter-yellow bird-logo'
              style={{ height: 75, width: 75 }}
              alt='Sparrow Logo'
            />
            <h1 className='h6 text-warning'>sparrow</h1>
            <img
              src={spinner}
              style={{ height: 75, width: 75 }}
              alt='Loading Spinner'
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default SignIn
