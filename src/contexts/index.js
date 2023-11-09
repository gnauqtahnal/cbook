import { createContext, useContext, useMemo, useState } from 'react'

export const UserContext = createContext()
export const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false)

  const value = useMemo(() => {
    return { isLogin, setIsLogin }
  }, [isLogin, setIsLogin])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
export const useUser = () => {
  return useContext(UserContext)
}
