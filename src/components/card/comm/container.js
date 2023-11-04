import {
  CARD_BACKGROUND,
  CARD_BORDER_COLOR,
  CARD_BORDER_RADIUS,
  CARD_HEIGHT,
  CARD_PADDING,
  CARD_WIDTH,
} from 'constants'
import { StyleSheet, View } from 'react-native'

const CommCardContainerView = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CARD_BACKGROUND,
    borderColor: CARD_BORDER_COLOR,
    borderRadius: CARD_BORDER_RADIUS,
    borderWidth: 1,
    height: CARD_HEIGHT,
    overflow: 'hidden',
    padding: CARD_PADDING,
    paddingBottom: 0,
    width: CARD_WIDTH,
  },
})

export default CommCardContainerView
