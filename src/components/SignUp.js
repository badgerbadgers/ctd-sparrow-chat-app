import { useContext, useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { ThemeContext } from "../context.js"
import { Container } from "react-bootstrap"
import "./SignUp.css"
import { createEmail } from "../config/sign-in.js"
import { useNavigate, Link } from "react-router-dom"

function SignUp() {
  const [user, setUser] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const { theme } = useContext(ThemeContext)

  const navigate = useNavigate()
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await createEmail(user.name, user.email, user.password)
    } catch {
      alert("Error")
    }
    setLoading(false)
    navigate("/")
  }

  return (
    <Container className='sign-up-container' fluid>
      <div className='sign-up-form-section'>
        <Form onSubmit={handleSubmit}>
          <h2 style={{ color: theme.dark }}>Sign Up</h2>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label style={{ color: theme.dark }}>First Name</Form.Label>
            <Form.Control
              value={user.firstName}
              type='name'
              name='name'
              placeholder='Enter name'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label style={{ color: theme.dark }}>Email address</Form.Label>
            <Form.Control
              value={user.email}
              type='email'
              name='email'
              placeholder='Enter email'
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label style={{ color: theme.dark }}>Password</Form.Label>
            <Form.Control
              value={user.password}
              type='password'
              name='password'
              placeholder='Password'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group
            className='mb-3'
            controlId='formBasicCheckbox'
          ></Form.Group>
          <Button disabled={loading} variant='primary' type='submit'>
            Sign Up
          </Button>
          <Link to='/'>
            <p>Have an account?</p>
            <p>Sign in</p>
          </Link>
        </Form>
      </div>
    </Container>
  )
}

export default SignUp
