import { useEffect } from "react"
import { createContext, useState } from "react"

const themes = {
  dark: {
    backgroundColor: "black",
    color: "white",
  },
  light: {
    backgroundColor: "white",
    color: "black",
  },
}

const initialState = {
  light: false,
  theme: themes.dark,
  toggle: () => {},
}
const ThemeContext = createContext(initialState)

function ThemeContextProvider({ children }) {
  //initial state
  const [light, setLight] = useState(false)

  useEffect(() => {
    //Gets previous state from localStorage
    const isLight = localStorage.getItem("light") === "true"
    setLight(isLight)
  }, [light])

  const toggle = () => {
    const isLight = !light
    //Saves state on local storage
    localStorage.setItem("light", JSON.stringify(isLight))
    setLight(isLight)
  }

  const theme = light ? themes.dark : themes.light

  return (
    <ThemeContext.Provider value={{ light, setLight, toggle, theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContextProvider, ThemeContext }
