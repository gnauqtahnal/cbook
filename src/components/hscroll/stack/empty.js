import { CARD_HEIGHT, CARD_MARGIN } from 'constants'
import { memo } from 'react'
import { View } from 'react-native'

const EmptyView = memo(() => {
  return <View style={{ height: CARD_HEIGHT + CARD_MARGIN * 2 }} />
})
EmptyView.displayName = 'EmptyView'

export default EmptyView
