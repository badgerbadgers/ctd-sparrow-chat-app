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
              <section>
                <div>
                  <h2>
                    Get to chatting
                    <br />
                    and reconnect
                  </h2>
                  <p>
                    A serene chat experience for you and your friends
                  </p>
                  <Link to="/chat">
                    <button>Sign In</button>
                  </Link>
                </div>
                <div>
                  <img 
                    src="https://via.placeholder.com/200"
                    alt="placeholder"
                  />
                </div>
              </section>
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
