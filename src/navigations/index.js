import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DetailScreen from 'screens/detail'
import HomeScreen from 'screens/home'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
        />
        <Stack.Screen
          name='Detail'
          component={DetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
