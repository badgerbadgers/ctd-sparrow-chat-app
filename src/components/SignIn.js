import { useEffect } from "react"
import { signInWithGoogle, auth } from "../config/googleSignIn"
import { onAuthStateChanged } from "firebase/auth"
import logo from "../assets/sparrow-logo.svg"
import spinner from "../assets/loading_spinner_icon_yellow.png"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import style from "./SignIn.module.css"

function SignIn({ handleAuthStateChange, isLoading, handleIsLoadingStateChange }) {
  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      handleAuthStateChange(data)
    })
  }, [])

  return (
    <div className='bg-secondary'>
      <div className='min-vh-100 d-flex justify-content-center align-items-center flex-column border border-dark mx-auto w-50 bg-primary'>
        <img
          src={logo}
          className={style.filterYellow}
          style={{ height: 75, width: 75 }}
          alt='Sparrow Logo'
        />
        <h1 className='h6 text-warning'>sparrow</h1>

				{ isLoading ? 
					
						<img 
							src={spinner} 
							style={{ height: 75, width: 75 }}
          		alt='Loading Spinner'
						/>

						:

            <Button
              variant='light'
              onClick={() => {
								signInWithGoogle(); 
								handleIsLoadingStateChange(isLoading);
							}}
              className='px-4 rounded-pill bg-info'
            >
              Sign in with <i className='bi bi-google'></i>
            </Button>
				}

        <Link to='/chat'>
          <div className='mt-5'>
          </div>
        </Link>

      </div>
    </div>
  )
}

export default SignIn
