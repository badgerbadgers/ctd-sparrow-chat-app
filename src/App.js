import TopNavigationBar from "./components/TopNavigationBar"
import LeftSideComponent from "./components/LeftSideComponent"
import MiddleChatWindow from "./components/MiddleChatWindow"
import BottomInputComponent from "./components/BottomInputComponent"
import RightSideComponent from "./components/RightSideComponent"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import logo from "./assets/sparrow-logo.svg"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <nav>
                <img 
                  src={logo}
                  // temporary styling until we handle CSS styling
                  style={{ height: 50, width: 50 }} 
                  alt="website sparrow logo" 
                />
                <h1>sparrow</h1>
                <Link to="/chat">
                  <button>Sign In</button>
                </Link>
              </nav>
            </>
          }
        />
        <Route
          path="/chat"
          element={
            <>
              <TopNavigationBar />
              <LeftSideComponent />
              <MiddleChatWindow />
              <BottomInputComponent />
              <RightSideComponent />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
