import { BORDER_COLOR, PADDING } from 'constants'
import { memo } from 'react'
import { StyleSheet, View } from 'react-native'

export const HSeparator = memo(() => {
  return (
    <View style={styles.container}>
      <View style={styles.shape} />
    </View>
  )
})
HSeparator.displayName = 'HSeparator'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING * 4,
  },
  shape: {
    height: 1,
    borderRadius: 999,
    backgroundColor: BORDER_COLOR,
  },
})
