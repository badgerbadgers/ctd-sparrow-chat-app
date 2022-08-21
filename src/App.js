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
      <Routes>
        <Route
          path='/'
          element={
            <>
            {/* <TopNavigationBar currentUser={authState} />  */}
              <SignIn handleAuthStateChange={handleAuthStateChange} />
            </>
          }
        />
        <Route
          path='/chat'
          element={
            <>
      				<TopNavigationBar currentUser={authState} />
              <LeftSideComponent />
              <MiddleChatWindow currentUser={authState} />
              <BottomInputComponent currentUser={authState}/>
            </>
          }
        />
      </Routes>
    </>
  )
}

export default App
