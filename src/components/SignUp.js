import { useContext } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { ThemeContext } from "../context.js"
import { Container } from "react-bootstrap"
import "./SignUp.css"

function SignUp() {
  const { theme } = useContext(ThemeContext)
  return (
    <Container className='sign-up-container' fluid>
      <div className='sign-up-form-section'>
        <Form>
          <h2 style={{ color: theme.dark }}>Sign Up</h2>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label style={{ color: theme.dark }}>Email address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label style={{ color: theme.dark }}>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>
          <Form.Group
            className='mb-3'
            controlId='formBasicCheckbox'
          ></Form.Group>
          <Button variant='primary' type='submit'>
            Sign Up
          </Button>
        </Form>
      </div>
    </Container>
  )
}

export default SignUp
