import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import "./custom.scss"
import { BrowserRouter } from "react-router-dom"
import { ThemeContextProvider } from "./context.js"
// import reportWebVitals from "./reportWebVitals"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeContextProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
