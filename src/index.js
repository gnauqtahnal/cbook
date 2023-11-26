import { LoadingModal, LoadingModalProvider } from 'components/loading-modal'
import { CatagoryVerticalScrollProvider } from 'components/vscroll'
import { UserProvider } from 'contexts'
import { StatusBar } from 'expo-status-bar'
import Navigation from './navigations'

const AppProvider = ({ children }) => {
  return (
    <>
      <UserProvider>
        <LoadingModalProvider>
          <CatagoryVerticalScrollProvider>
            {children}
          </CatagoryVerticalScrollProvider>
        </LoadingModalProvider>
      </UserProvider>
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
