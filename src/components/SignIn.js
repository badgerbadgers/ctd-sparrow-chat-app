import React from "react"
import { signInWithGoogle } from "../config/fire-config"
import logo from "../assets/sparrow-logo.svg"
import { Link } from "react-router-dom"

function SignIn() {
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
