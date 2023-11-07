import { Ionicons } from '@expo/vector-icons'
import {
  ICON_BORDER_COLOR,
  ICON_COLOR,
  ICON_PADDING,
  ICON_SIZE,
} from 'constants'
import { View } from 'react-native'

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

export const Icon = ({ name, style, iconColor }) => {
  return (
    <View
      style={[
        {
          alignItems: 'center',
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
