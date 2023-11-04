import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'

const CommCardImageView = ({ source, containerStyle, imageStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        style={[styles.image, imageStyle]}
        source={source}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  image: {
    aspectRatio: 1,
  },
})

export default CommCardImageView
