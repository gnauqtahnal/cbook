import { createContext, useMemo, useRef } from 'react'

export const HomeScreenContext = createContext()
export const HomeScreenProvider = ({ children }) => {
  const stackRef = useRef(null)
  const catagoryRef = useRef(null)

  const value = useMemo(() => {
    return {
      stackRef,
      catagoryRef,
    }
  }, [stackRef, catagoryRef])

  return (
    <HomeScreenContext.Provider value={value}>
      {children}
    </HomeScreenContext.Provider>
  )
}
