import TopNavigationBar from "./components/TopNavigationBar";
import LeftSideComponent from "./components/LeftSideComponent";
import MiddleChatWindow from "./components/MiddleChatWindow";
import BottomInputComponent from "./components/BottomInputComponent";
import RightSideComponent from "./components/RightSideComponent"
import { Routes, Route, Link } from "react-router-dom";
import logo from "./assets/sparrow-logo.svg";
 
function App() {
 return (
   <Routes>
     <Route path="/signin"
       element={
         <>
           <div>
             <img
               src={logo}
               // temporary inline styling until we handle CSS
               style={{ height: 75, width: 75 }}
               alt={"Sparrow Logo"}
             />
             <h3>sparrow</h3>
             <Link to="/signin">
               <button>Sign in with G</button>
             </Link>
           </div>
         </>
       }
     />
     <Route path="/chat"
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
 );
}
 
export default App;
 

