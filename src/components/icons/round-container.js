import { ICON_BORDER_COLOR, ICON_PADDING } from 'constants'
import { View } from 'react-native'

export const RoundIconContainerView = ({ children, style }) => {
  return (
    <View
      style={[
        {
          padding: ICON_PADDING,
          borderRadius: 9999,
          borderWidth: 1,
          borderColor: ICON_BORDER_COLOR,
        },
        style,
      ]}
    >
      {children}
    </View>
  )
}
