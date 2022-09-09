import { useContext, useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { ThemeContext } from "../context.js"
import { Container } from "react-bootstrap"
import "./SignUp.css"
import { createEmail } from "../config/sign-in.js"
import { Navigate } from "react-router-dom"

function SignUp() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { theme } = useContext(ThemeContext)

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // try {
    //   await signup(emailRef.current.value, passwordRef.current.value)
    // } catch {
    //   alert("Error")
    // }
    // setLoading(false)
    createEmail(email, password)
  }

  return (
    <Container className='sign-up-container' fluid>
      <div className='sign-up-form-section'>
        <Form onSubmit={handleSubmit}>
          <h2 style={{ color: theme.dark }}>Sign Up</h2>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label style={{ color: theme.dark }}>Email address</Form.Label>
            <Form.Control
              value={email}
              type='email'
              placeholder='Enter email'
              onChange={onEmailChange}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label style={{ color: theme.dark }}>Password</Form.Label>
            <Form.Control
              value={password}
              type='password'
              placeholder='Password'
              onChange={onPasswordChange}
            />
          </Form.Group>
          <Form.Group
            className='mb-3'
            controlId='formBasicCheckbox'
          ></Form.Group>
          <Button disabled={loading} variant='primary' type='submit'>
            Sign Up
          </Button>
        </Form>
      </div>
    </Container>
  )
}

export default SignUp
