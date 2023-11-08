import { CatagoryVerticalScrollProvider } from 'components/vscroll'
import { StatusBar } from 'expo-status-bar'
import Navigation from './navigations'

const AppProvider = ({ children }) => {
  return (
    <>
      <CatagoryVerticalScrollProvider>
        {children}
      </CatagoryVerticalScrollProvider>
    </>
  )
}

const App = () => {
  return (
    <AppProvider>
      <Navigation />
      <StatusBar style='dark' />
    </AppProvider>
  )
}

export default App
