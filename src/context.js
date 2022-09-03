import { useEffect } from "react"
import { createContext, useState } from "react"
import useSound from "use-sound"
import toggleSound from "./sounds/stories_sounds_switch-off.mp3"

//theme object
const themes = {
  light: {
    primary: "#FFF",
    secondary: "#1A2930",
    dark: "#F2F2F2",
    light: "#2B2B2B",
  },
  dark: {
    primary: "#1A2930",
    secondary: "#202020",
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
  const [toggleOn, setToggleOn] = useState(false)

  useEffect(() => {
    //gets state
    const isLight = localStorage.getItem("light") === "true"
    setLight(isLight)
  }, [light])

  useEffect(() => {}, [])

  const toggle = () => {
    const isLight = !light
    //saves state
    localStorage.setItem("light", JSON.stringify(isLight))
    setLight(isLight)
    setToggleOn(!toggleOn)
    toggleSfx()
  }
  const [toggleSfx] = useSound(toggleSound)

  const theme = light ? themes.light : themes.dark

  return (
    <ThemeContext.Provider
      value={{ light, setLight, toggle, theme, setToggleOn, toggleOn }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContextProvider, ThemeContext }
