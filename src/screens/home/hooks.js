import { useContext } from 'react'
import { HomeScreenContext } from './contexts'

export const useHomeScreen = () => {
  return useContext(HomeScreenContext)
}
