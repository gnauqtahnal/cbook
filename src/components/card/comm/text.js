import { CARD_FONTSIZE } from 'constants'
import { StyleSheet, Text, View } from 'react-native'

const CommCardTextView = ({ text, containerStyle, textStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: CARD_FONTSIZE,
  },
})

export default CommCardTextView
