import { useEffect } from "react"
import { createContext, useState } from "react"

//theme object
const themes = {
  light: {
    primary: "#f5f5f5",
    secondary: "#1A2930",
    dark: "#F2F2F2",
    light: "#2B2B2B",
  },
  dark: {
    primary: "#1A2930",
    secondary: "#202020",
    light: "#FFFFFF",
  },
}

const initialState = {
  light: false,
  theme: themes.dark,
  toggle: () => {},
}

//default value for ThemeContext uses react hook create context
const ThemeContext = createContext(initialState)

function ThemeContextProvider({ children }) {
  //initial state
  const [light, setLight] = useState(false)

  useEffect(() => {
    //gets state
    const isLight = localStorage.getItem("light") === "true"
    setLight(isLight)
  }, [light])

  const toggle = () => {
    const isLight = !light
    //saves state
    localStorage.setItem("light", JSON.stringify(isLight))
    setLight(isLight)
  }

  const theme = light ? themes.light : themes.dark

  return (
    <ThemeContext.Provider value={{ light, setLight, toggle, theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContextProvider, ThemeContext }
