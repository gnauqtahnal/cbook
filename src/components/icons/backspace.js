import { Ionicons } from '@expo/vector-icons'
import { ICON_COLOR, ICON_SIZE } from 'constants'
import { RoundIconContainerView } from './round-container'

export const BackspaceIcon = ({ style }) => {
  return (
    <RoundIconContainerView style={style}>
      <Ionicons
        name='ios-backspace-outline'
        size={ICON_SIZE}
        color={ICON_COLOR}
      />
    </RoundIconContainerView>
  )
}
