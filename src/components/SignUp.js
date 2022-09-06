import { useContext } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { ThemeContext } from "../context.js"
import { Container } from "react-bootstrap"
import "./SignUp.css"

function SignUp() {
  const { theme } = useContext(ThemeContext)
  return (
    <Container className='sign-up-container'>
      <div style={{ backgroundColor: theme.primary }}>
        <h2 style={{ color: theme.light }}>Sign Up</h2>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label style={{ color: theme.light }}>
              Email address
            </Form.Label>
            <Form.Control type='email' placeholder='Enter email' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label style={{ color: theme.light }}>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Check type='checkbox' label='Check me out' />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  )
}

export default SignUp
