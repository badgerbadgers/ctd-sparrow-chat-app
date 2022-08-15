import { useEffect } from "react"
import { signInWithGoogle, auth } from "../config/googleSignIn"
import { onAuthStateChanged } from "firebase/auth"
import logo from "../assets/sparrow-logo.svg"
import { Link } from "react-router-dom"

function SignIn({ handleAuthStateChange }) {
  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      handleAuthStateChange(data)
    })
  }, [])

  return (
    <div>
      <img
        src={logo}
        // temporary inline styling until we handle CSS
        style={{ height: 75, width: 75 }}
        alt={"Sparrow Logo"}
      />
      <h3>sparrow</h3>
      <Link to='/chat'>
        <button onClick={signInWithGoogle}>Sign in with G</button>
      </Link>
    </div>
  )
}

export default SignIn
