import Chat from "./components/Chat"
import SignIn from "./components/SignIn"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function App() {
  const [authState, setAuthState] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleAuthStateChange = (auth) => {
    setAuthState(auth)
  }

  const handleIsLoadingStateChange = (bool) => {
    bool ? setIsLoading(bool) : setIsLoading(false)
  }

  useEffect(() => {
    if (authState) {
      setIsLoading(false)
      navigate("/chat")
    }
  }, [authState])

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <SignIn
                handleAuthStateChange={handleAuthStateChange}
                isLoading={isLoading}
                handleIsLoadingStateChange={handleIsLoadingStateChange}
              />
            </>
          }
        />
        <Route path='/chat' element={<Chat currentUser={authState} />} />
      </Routes>
    </>
  )
}

export default App
