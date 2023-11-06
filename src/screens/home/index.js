import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import {
  CommCardContainerView,
  CommCardImageView,
  CommCardTextView,
} from 'components/card'
import { StackHorizontalScrollView } from 'components/hscroll'
import { BackspaceIcon } from 'components/icons'
import { HSeparator } from 'components/separator'
import { CatagoryVerticalScrollView } from 'components/vscroll'
import { CARD_MARGIN, ICON_SIZE, PADDING } from 'constants'
import { useCallback, useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HomeScreenProvider } from './contexts'
import { useHomeScreen } from './hooks'
const HomeScreenComponent = () => {
  const navigation = useNavigation()
  const { stackRef, catagoryRef } = useHomeScreen()

  useEffect(() => {
    const data = [
      { imageUri: 'https://picsum.photos/200/300?random=1', text: 'PicSum 1' },
      { imageUri: 'https://picsum.photos/200/300?random=2', text: 'PicSum 2' },
      { imageUri: 'https://picsum.photos/200/300?random=3', text: 'PicSum 3' },
      { imageUri: 'https://picsum.photos/200/300?random=4', text: 'PicSum 4' },
      { imageUri: 'https://picsum.photos/200/300?random=5', text: 'PicSum 5' },
    ]

    data.forEach((item) => {
      catagoryRef.current?.push(item)
    })
  }, [])

  const StackRenderItem = ({ item, index }) => {
    return (
      <CommCardContainerView style={{ margin: CARD_MARGIN }}>
        <CommCardImageView source={item.imageUri} />
        <CommCardTextView text={item.text} />
      </CommCardContainerView>
    )
  }

  const CatagoryRenderItem = ({ item, index }) => {
    const onPressPushToStack = () => {
      stackRef.current?.push(item)
    }

    const onPressNavigateToDetail = () => {
      navigation.navigate({
        name: 'Detail',
        params: {
          item,
          index,
        },
      })
    }

    if (index === catagoryRef.current?.data.length) {
      return (
        <TouchableOpacity onPress={onPressNavigateToDetail}>
          <CommCardContainerView
            style={{
              margin: CARD_MARGIN,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons
              name='add-outline'
              size={ICON_SIZE}
              color='black'
            />
          </CommCardContainerView>
        </TouchableOpacity>
      )
    }

    return (
      <TouchableOpacity
        onPress={onPressPushToStack}
        onLongPress={onPressNavigateToDetail}
      >
        <CommCardContainerView style={{ margin: CARD_MARGIN }}>
          <CommCardImageView source={item.imageUri} />
          <CommCardTextView text={item.text} />
        </CommCardContainerView>
      </TouchableOpacity>
    )
  }

  const backspaceOnPress = useCallback(() => {
    stackRef.current?.pop()
  }, [])

  const backspaceOnLongPress = useCallback(() => {
    stackRef.current?.reset()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: PADDING,
        }}
      >
        <View style={{ flex: 1 }} />

        <TouchableOpacity
          onPress={backspaceOnPress}
          onLongPress={backspaceOnLongPress}
        >
          <BackspaceIcon style={{ margin: PADDING, marginBottom: 0 }} />
        </TouchableOpacity>
      </View>

      <View style={{ width: '100%', padding: PADDING }}>
        <StackHorizontalScrollView
          ref={stackRef}
          renderItem={StackRenderItem}
        />
      </View>

      <HSeparator />

      <View style={{ width: '100%', padding: PADDING, flex: 1 }}>
        <CatagoryVerticalScrollView
          ref={catagoryRef}
          renderItem={CatagoryRenderItem}
        />
      </View>
    </SafeAreaView>
  )
}

const HomeScreen = () => {
  return (
    <HomeScreenProvider>
      <HomeScreenComponent />
    </HomeScreenProvider>
  )
}

export default HomeScreen
