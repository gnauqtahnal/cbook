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
        },
        style,
      ]}
    >
      {children}
    </View>
  )
}

export const BackspaceIcon = ({ style, iconColor }) => {
  return (
    <RoundIconContainerView style={style}>
      <Ionicons
        name='ios-backspace-outline'
        size={ICON_SIZE}
        color={iconColor || ICON_COLOR}
      />
    </RoundIconContainerView>
  )
}

export const CameraIcon = ({ style, iconColor }) => {
  return (
    <RoundIconContainerView style={style}>
      <Ionicons
        name='ios-camera-outline'
        size={ICON_SIZE}
        color={iconColor || ICON_COLOR}
      />
    </RoundIconContainerView>
  )
}

export const ImageIcon = ({ style, iconColor }) => {
  return (
    <RoundIconContainerView style={style}>
      <Ionicons
        name='ios-image-outline'
        size={ICON_SIZE}
        color={iconColor || ICON_COLOR}
      />
    </RoundIconContainerView>
  )
}

export const CheckmarkIcon = ({ style, iconColor }) => {
  return (
    <RoundIconContainerView style={style}>
      <Ionicons
        name='ios-checkmark-outline'
        size={ICON_SIZE}
        color={iconColor || ICON_COLOR}
      />
    </RoundIconContainerView>
  )
}

export const TextIcon = ({ style, iconColor }) => {
  return (
    <RoundIconContainerView style={style}>
      <Ionicons
        name='ios-text-outline'
        size={ICON_SIZE}
        color={iconColor || ICON_COLOR}
      />
    </RoundIconContainerView>
  )
}

export const MicIcon = ({ style, iconColor }) => {
  return (
    <RoundIconContainerView style={style}>
      <Ionicons
        name='ios-mic-outline'
        size={ICON_SIZE}
        color={iconColor || ICON_COLOR}
      />
    </RoundIconContainerView>
  )
}

export const StopIcon = ({ style, iconColor }) => {
  return (
    <RoundIconContainerView style={style}>
      <Ionicons
        name='ios-stop-outline'
        size={ICON_SIZE}
        color={iconColor || ICON_COLOR}
      />
    </RoundIconContainerView>
  )
}
