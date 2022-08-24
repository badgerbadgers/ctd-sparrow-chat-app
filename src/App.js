import Chat from "./components/Chat"
import SignIn from "./components/SignIn"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Container } from "react-bootstrap"

function App() {
  const [authState, setAuthState] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleAuthStateChange = (auth) => {
    setAuthState(auth)
  }

  const handleIsLoadingStateChange = (bool) => {
    bool ? setIsLoading(true) : setIsLoading(false)
  }

  useEffect(() => {
    if (authState) {
      setIsLoading(false)
      navigate("/chat")
    }
  }, [authState])

  return (
    <Container fluid>
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
    </Container>
  )
}

export default App
