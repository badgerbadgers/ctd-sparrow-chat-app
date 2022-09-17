import Chat from "./components/Chat"
import SignIn from "./components/SignIn"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { Container } from "react-bootstrap"
import "./App.css"
import { ThemeContext } from "./context/themeContext.js"
import SignUp from "./components/SignUp"

function App() {
  const [authState, setAuthState] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { light, theme } = useContext(ThemeContext)

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
    <Container fluid style={{ backgroundColor: theme.secondary }}>
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
        <Route path='/SignUp' element={<SignUp />} />
      </Routes>
    </Container>
  )
}

export default App
