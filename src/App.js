import TopNavigationBar from "./components/TopNavigationBar"
import LeftSideComponent from "./components/LeftSideComponent"
import MiddleChatWindow from "./components/MiddleChatWindow"
import BottomInputComponent from "./components/BottomInputComponent"
import RightSideComponent from "./components/RightSideComponent"
import SignIn from "./components/SignIn"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route
        path='/signin'
        element={
          <>
            <SignIn />
          </>
        }
      />
      <Route
        path='/chat'
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
  )
}

export default App
