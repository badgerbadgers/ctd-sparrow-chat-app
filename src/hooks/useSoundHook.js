// Custom hook allows us to add extra functionality inside this hook
// -> catches error when using context in different components the SoundProvider doesn't wrap to

import { useContext } from "react"
import { SoundContext } from "../context/SoundContext"

export const useSoundHook = () => {
  // Get the context
  const context = useContext(SoundContext)

  // Provide a check: context is undefined if trying to use it outside of scope (outside of BottomInputComponent)
  if (context === undefined) {
    // Message: can't use this context unless the component that is using it is wrapped inside the SoundProvider, thus, has access to the sound context
    throw new Error("useSoundHook() must be used inside a SoundProvider")
  }

  return context
}
