import { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { Container, ThemeProvider } from "react-bootstrap"
import "./SignUp.css"
import { createEmail } from "../config/sign-in.js"
import { Link } from "react-router-dom"
import logo from "../assets/sparrow-logo.svg"

function SignUp() {
  const [user, setUser] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)

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
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint='xxs'
    >
      <Container className='bg-secondary'>
        <div className='bg-primary sign-up-container'>
          <img
            src={logo}
            className='filter-yellow'
            style={{ height: 55, width: 55 }}
            alt='Sparrow Logo'
          />
          <h1 className='h6 text-warning ms-2 pb-4'>sparrow</h1>
          <div className='sign-up-form-section'>
            <Form onSubmit={handleSubmit}>
              <h2 className='sign-up-text font-weight-bold'>Sign Up</h2>
              <Form.Group className='mb-3' controlId='formBasicName'>
                <Form.Label className='sign-up-text'>Name</Form.Label>
                <Form.Control
                  value={user.firstName}
                  type='name'
                  name='name'
                  placeholder='Enter name'
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label className='sign-up-text'>Email</Form.Label>
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

              <Button
                disabled={loading}
                variant='light'
                type='submit'
                className='bg-info rounded-pill w-100 sign-up-btn'
              >
                Sign Up
              </Button>

              <p className='sign-up-text'>
                Have an account?
                <Link to='/' className='link-text text-warning'>
                  {" "}
                  Sign In
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  )
}

export default SignUp
