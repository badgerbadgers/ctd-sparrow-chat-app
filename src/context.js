import { useEffect } from "react"
import { createContext, useState } from "react"

const themes = {
  light: {
    // backgroundColor: "#212020",
    // color: "#fff",
    // primary: "#F2F2F2",
    primary: "#FFF",
    secondary: "#1A2930",
    dark: "#F2F2F2",
    light: "#2B2B2B",
  },
  dark: {
    primary: "#1A2930",
    secondary: "#202020",
    dark: "#2B2B2B",
    light: "#F2F2F2",
    info: "#C5C1C0",
    accent: "#F7CE3F",
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
