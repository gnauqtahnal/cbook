import { createContext, useContext, useMemo, useState } from 'react'

export const UserContext = createContext()
export const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false)
  const [id, setId] = useState(undefined)

  const value = useMemo(() => {
    return { isLogin, setIsLogin, id, setId }
  }, [isLogin, setIsLogin, id, setId])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
export const useUser = () => {
  return useContext(UserContext)
}

export const CatagoryContext = createContext()
export const CatagoryProvider = ({ children }) => {
  const [data, setData] = useState([])

  const value = useMemo(() => {
    return { data, setData }
  }, [data, setData])

  return (
    <CatagoryContext.Provider value={value}>
      {children}
    </CatagoryContext.Provider>
  )
}
