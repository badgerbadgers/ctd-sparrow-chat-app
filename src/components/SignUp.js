import { useContext, useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { ThemeContext } from "../context.js"
import { Container } from "react-bootstrap"
import "./SignUp.css"
import { createEmail } from "../config/sign-in.js"
import { useNavigate, Link } from "react-router-dom"
import logo from "../assets/sparrow-logo.svg"

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
  }

  return (
    <Container className='sign-up-container' fluid>
      <div className='sign-up-form-section bg-primary min-vh-100'>
        <img
          src={logo}
          className='filterYellow'
          style={{ height: 75, width: 75 }}
          alt='Sparrow Logo'
        />
        <h1 className='h6 text-warning'>sparrow</h1>
        <Form onSubmit={handleSubmit}>
          <h2 className='sign-up-text'>Sign Up</h2>
          <Form.Group className='mb-3' controlId='formBasicName'>
            <Form.Label className='sign-up-text'>Enter Name</Form.Label>
            <Form.Control
              value={user.firstName}
              type='name'
              name='name'
              placeholder='Enter name'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label className='sign-up-text'>Email address</Form.Label>
            <Form.Control
              value={user.email}
              type='email'
              name='email'
              placeholder='Enter email'
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label className='sign-up-text'>Password</Form.Label>
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
          <Button
            disabled={loading}
            variant='info'
            type='submit'
            className='rounded-pill w-100'
          >
            Sign Up
          </Button>
          <Link to='/'>
            <p className='sign-up-text link-text'>Have an account? Sign in</p>
          </Link>
        </Form>
      </div>
    </Container>
  )
}

export default SignUp
