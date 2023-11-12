import AsyncStorage from '@react-native-async-storage/async-storage'
import { CircleIcon } from 'components/icons'
import { PADDING } from 'constants'
import { useUser } from 'contexts'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { auth, db } from 'firebase'
import { signInAnonymously } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const listAvailableUser = []

const LoginScreen = () => {
  const [isReady, setIsReady] = useState(false)
  const [openScanner, setOpenScanner] = useState(false)
  const { setIsLogin } = useUser()

  useEffect(() => {
    signInAnonymously(auth)
      .then(async () => {
        try {
          const storedUserId = JSON.parse(await AsyncStorage.getItem('userId'))
          console.log('userId:', storedUserId)
          const querySnapshot = await getDocs(collection(db, 'users'))

          try {
            querySnapshot.forEach((doc) => {
              const data = doc.data()

              const expiredDate = new Date(
                data.expiredDate.seconds * 1000 +
                  data.expiredDate.nanoseconds / 1000000
              )
              const currentDate = new Date()

              if (expiredDate.getTime() >= currentDate.getTime()) {
                listAvailableUser.push(data)

                if (storedUserId === data.id) {
                  throw new Error('')
                }
              } else {
                if (storedUserId === data.id) {
                  AsyncStorage.removeItem('userId')
                }
              }
            })

            setIsReady(true)
          } catch {
            setIsReady(true)
            setIsLogin(true)
          }
        } catch {
          //
        }
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error(errorCode, errorMessage)
      })
  }, [])

  if (!isReady) {
    return null
  }

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text>Login</Text>

      <TouchableOpacity
        onPress={() => {
          setOpenScanner(true)
        }}
      >
        <CircleIcon
          name='ios-qr-code-outline'
          style={{ margin: PADDING }}
        />
      </TouchableOpacity>

      {openScanner && (
        <BarCodeScanner
          onBarCodeScanned={({ data }) => {
            console.log(data)

            try {
              listAvailableUser.forEach(async (user) => {
                if (data === user.id) {
                  await AsyncStorage.setItem('userId', JSON.stringify(user.id))

                  setIsLogin(true)
                  throw new Error()
                }
              })
            } catch {
              //
            }

            setOpenScanner(false)
          }}
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </SafeAreaView>
  )
}

export default LoginScreen
