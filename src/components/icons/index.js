import { Ionicons } from '@expo/vector-icons'
import {
  ICON_BORDER_COLOR,
  ICON_COLOR,
  ICON_PADDING,
  ICON_SIZE,
} from 'constants'
import { View } from 'react-native'

const RoundIconContainerView = ({ children, style }) => {
  return (
    <View
      style={[
        {
          padding: ICON_PADDING,
          borderRadius: 9999,
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: ICON_BORDER_COLOR,
          backgroundColor: 'white',
        },
        style,
      ]}
    >
      {children}
    </View>
  )
}

export const CircleIcon = ({ name, style, iconColor }) => {
  return (
    <View
      style={[
        {
          alignItems: 'center',
          backgroundColor: 'white',
          borderColor: ICON_BORDER_COLOR,
          borderRadius: 9999,
          borderWidth: 1,
          justifyContent: 'center',
          padding: ICON_PADDING,
        },
        style,
      ]}
    >
      <Ionicons
        name={name}
        size={ICON_SIZE}
        color={iconColor || ICON_COLOR}
      />
    </View>
  )
}
