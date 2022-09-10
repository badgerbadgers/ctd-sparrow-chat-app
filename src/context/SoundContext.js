// File to create our sound context and context provider

import { createContext, useReducer } from "react"

// Invoking createContext() creates a new context object stored in SoundContext
export const SoundContext = createContext()
// All of our state logic (state change) lives inside this function
const soundReducer = (state, action) => {
  // Check the type of state change we want to make, then return an updated state based on that
  switch (action.type) {
    case "BOOL_SOUND":
      // Overwrite any other properties in this state update
      return { ...state, sound: action.payload }
    case "TURN_SOUND":
      return { ...state, change: action.payload }
    default:
      return state
  }
}

// This custom SoundProvider component will wrap our <BottomInputComponent>
export function SoundProvider({ children }) {
  // useReduser hook specifies: a) the Reducer function we use to update state & b) the initial state value
  // dispatch function dispatches state change to the reducer function (calls soundReducer to change state)
  const [state, dispatch] = useReducer(soundReducer, {
    sound: false,
    change: null,
  })

  // type: type of state change we want to make; payload: any data we want to base the state change on
  const changeSoundBool = (sound) => {
    dispatch({ type: "BOOL_SOUND", payload: sound })
  }

  const turnSoundOnOff = (change) => {
    dispatch({ type: "TURN_SOUND", payload: change })
  }

  return (
    // All the children components (BottomInputComponent) get access to the sound context provider value
    <SoundContext.Provider
      value={{ ...state, changeSoundBool, turnSoundOnOff }}
    >
      {children}
    </SoundContext.Provider>
  )
}
