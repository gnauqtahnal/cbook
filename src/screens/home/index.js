import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import {
  CommCardContainerView,
  CommCardImageView,
  CommCardTextView,
} from 'components/card'
import { CommCardPlaySoundPressable } from 'components/card/comm/play-sound-pressable'
import { StackHorizontalScrollView } from 'components/hscroll'
import { CircleIcon } from 'components/icons'
import { HSeparator } from 'components/separator'
import {
  CatagoryVerticalScrollView,
  useCatagoryVerticalScroll,
} from 'components/vscroll'
import { CARD_MARGIN, ICON_SIZE, PADDING } from 'constants'
import { useUser } from 'contexts'
import { db } from 'firebase'
import { doc, getDoc } from 'firebase/firestore'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const StackRenderItem = ({ item }) => {
  return (
    <CommCardPlaySoundPressable audioUri={item.audioUri}>
      <CommCardContainerView style={{ margin: CARD_MARGIN }}>
        <CommCardImageView source={item.imageUri} />
        <CommCardTextView text={item.text} />
      </CommCardContainerView>
    </CommCardPlaySoundPressable>
  )
}

const HomeScreen = () => {
  const navigation = useNavigation()
  const stackRef = useRef()
  const { ref: catagoryRef } = useCatagoryVerticalScroll()
  const { id } = useUser()

  useLayoutEffect(() => {
    const getData = async () => {
      const docSnap = await getDoc(doc(db, id, 'catagory'))

      if (docSnap.exists()) {
        const data = docSnap.data()

        catagoryRef.current?.init(data.data)
      }
    }

    getData()
  }, [])

  const CatagoryRenderItem = ({ item, index }) => {
    const onPressPushToStack = () => {
      stackRef.current?.push(item)
    }

    const onPressNavigateToDetail = () => {
      navigation.navigate('Detail', {
        item,
        index,
      })
    }

    if (index === catagoryRef.current?.data.length) {
      return (
        <TouchableOpacity
          onPress={onPressNavigateToDetail}
          onLongPress={onPressNavigateToDetail}
        >
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
          <CircleIcon
            name='ios-backspace-outline'
            style={{ margin: PADDING, marginBottom: 0 }}
          />
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

export default HomeScreen
