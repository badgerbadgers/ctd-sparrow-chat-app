import React from "react"
// Firebase SDK
import firebase from "firebase/compat/app"
import "firebase/compat/auth" 
// Hooks
import { useAuthState } from "react-firebase-hooks/auth"

import app from "./config/fire-config"
import logo from "./assets/sparrow-logo.svg"

import TopNavigationBar from "./components/TopNavigationBar"
import LeftSideComponent from "./components/LeftSideComponent"
import MiddleChatWindow from "./components/MiddleChatWindow"
import BottomInputComponent from "./components/BottomInputComponent"
import RightSideComponent from "./components/RightSideComponent"

// Import our initialized Firebase app (to identify our project)
// Make a reference to auth SDK as a global variable
const auth = app.auth()

function App() {
  // Identify whether or not a user is logged in
  const [user] = useAuthState(auth)

  return (
    <div>
      <section>
        {/* If the user is defined, show the chat room; otherwise, show the sign-in page */}
        {user ? <Chat /> : <SignIn />}
      </section>
    </div>
  )
}

function SignIn() {
  const signInWithGoogle = () => {
    // Instantiate Google auth provider
    const provider = new firebase.auth.GoogleAuthProvider()
    // Trigger pop-up window to authenticate user when user clicks the sign-in button
    auth.signInWithPopup(provider)
  }
  
  return (
    <div>
      <img 
        src={logo}
        // Temporary inline styling until we handle CSS
        style={{ height: 75, width: 75 }} 
        alt="Sparrow Logo" 
      />
      <h3>sparrow</h3>
      {/* Button listens to the click event and runs the signIn function */}
      <button onClick={signInWithGoogle}>Sign in with G</button>
    </div>
  )
}

function Chat() {
  return (
    <div>
      <TopNavigationBar />
      <LeftSideComponent />
      <MiddleChatWindow />
      <BottomInputComponent />
      <RightSideComponent />
    </div>
  )
}

export default App