import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useUser } from 'contexts'
import DetailScreen from 'screens/detail'
import HomeScreen from 'screens/home'
import LoginScreen from 'screens/login'

const LoginStack = createNativeStackNavigator()
const Stack = createNativeStackNavigator()

const Navigation = () => {
  const { isLogin } = useUser()
  return (
    <NavigationContainer>
      {isLogin ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name='Home'
            component={HomeScreen}
          />
          <Stack.Screen
            name='Detail'
            component={DetailScreen}
            options={{ presentation: 'modal' }}
          />
        </Stack.Navigator>
      ) : (
        <LoginStack.Navigator screenOptions={{ headerShown: false }}>
          <LoginStack.Screen
            name='Login'
            component={LoginScreen}
          />
        </LoginStack.Navigator>
      )}
    </NavigationContainer>
  )
}

export default Navigation
