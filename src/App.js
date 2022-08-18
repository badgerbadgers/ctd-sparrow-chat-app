import TopNavigationBar from "./components/TopNavigationBar"
import LeftSideComponent from "./components/LeftSideComponent"
import MiddleChatWindow from "./components/MiddleChatWindow"
import BottomInputComponent from "./components/BottomInputComponent"
import SignIn from "./components/SignIn"
import { Routes, Route } from "react-router-dom"
import { useState } from "react"

function App() {
  const [authState, setAuthState] = useState(null)

  const handleAuthStateChange = (auth) => {
    setAuthState(auth)
  }

  return (
    <>
      <TopNavigationBar currentUser={authState} />
      <Routes>
        <Route
          path='/'
          element={
            <>
              <SignIn handleAuthStateChange={handleAuthStateChange} />
            </>
          }
        />
        <Route
          path='/chat'
          element={
            <>
              <LeftSideComponent />
              <MiddleChatWindow currentUserData={authState} />
              <BottomInputComponent />
            </>
          }
        />
      </Routes>
    </>
  )
}

export default App
