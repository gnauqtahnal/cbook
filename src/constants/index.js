import { Dimensions } from 'react-native'

export const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } =
  Dimensions.get('window')

export const PADDING = 5
export const BORDER_COLOR = 'rgba(0,0,0,0.5)'
export const DISABLE_COLOR = 'rgba(0,0,0,0.1)'

export const CARD_PADDING = PADDING
const CARD_NUM_COLUMNS =
  WINDOW_WIDTH < 450 ? 3 : WINDOW_WIDTH < 600 ? 4 : WINDOW_WIDTH < 900 ? 6 : 8
export const CARD_BORDER_RADIUS = 5
export const CARD_MARGIN = 5
export const CARD_WIDTH =
  (WINDOW_WIDTH - CARD_NUM_COLUMNS * CARD_PADDING * 2 - PADDING * 2) /
  CARD_NUM_COLUMNS
export const CARD_HEIGHT = CARD_WIDTH * 1.2
export const CARD_BORDER_COLOR = BORDER_COLOR
export const CARD_BACKGROUND = 'white'
export const CARD_FONTSIZE = 11

export const ICON_SIZE = 30
export const ICON_PADDING = 5
export const ICON_BACKGROUND = 'rgba(0,0,0,0.7)'
export const ICON_COLOR = 'black'
export const ICON_BORDER_COLOR = BORDER_COLOR

export const RESIZE_WIDTH = 256
export const RESIZE_HEIGHT = 256
