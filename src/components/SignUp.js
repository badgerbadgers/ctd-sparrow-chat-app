import { useContext, useRef } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { ThemeContext } from "../context.js"
import { Container } from "react-bootstrap"
import "./SignUp.css"
import { signup } from "../config/sign-in.js"
import { useState } from "react"

function SignUp() {
  const [loading, setLoading] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const { theme } = useContext(ThemeContext)

  const handleSubmit = async () => {
    try {
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch {
      alert("Error")
    }
    setLoading(false)
  }

  return (
    <Container className='sign-up-container' fluid>
      <div className='sign-up-form-section'>
        <Form>
          <h2 style={{ color: theme.dark }}>Sign Up</h2>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label style={{ color: theme.dark }}>Email address</Form.Label>
            <Form.Control
              ref={emailRef}
              type='email'
              placeholder='Enter email'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label style={{ color: theme.dark }}>Password</Form.Label>
            <Form.Control
              ref={passwordRef}
              type='password'
              placeholder='Password'
            />
          </Form.Group>
          <Form.Group
            className='mb-3'
            controlId='formBasicCheckbox'
          ></Form.Group>
          <Button
            disabled={loading}
            variant='primary'
            type='submit'
            onSubmit={handleSubmit}
          >
            Sign Up
          </Button>
        </Form>
      </div>
    </Container>
  )
}

export default SignUp
