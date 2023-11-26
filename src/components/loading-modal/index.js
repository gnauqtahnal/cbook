import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'constants'
import { createContext, useContext, useMemo, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export const LoadingModalContext = createContext()
export const LoadingModalProvider = ({ children }) => {
  const [visible, setVisible] = useState(false)

  const value = useMemo(() => {
    return { visible, setVisible }
  }, [visible, setVisible])

  return (
    <LoadingModalContext.Provider value={value}>
      {children}
    </LoadingModalContext.Provider>
  )
}

export const useLoadingModal = () => {
  return useContext(LoadingModalContext)
}

export const LoadingModal = () => {
  const { visible } = useLoadingModal()

  if (!visible) {
    return null
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size='large'
        color='#ffffff'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
})
