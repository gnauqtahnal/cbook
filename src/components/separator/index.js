import { memo } from 'react'
import { View } from 'react-native'
import { styles } from './styles'

export const HSeparator = memo(() => {
  return (
    <View style={styles.container}>
      <View style={styles.shape} />
    </View>
  )
})
HSeparator.displayName = 'HSeparator'
