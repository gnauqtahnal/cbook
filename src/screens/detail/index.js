import { useNavigation, useRoute } from '@react-navigation/native'
import {
  CommCardContainerView,
  CommCardImageView,
  CommCardTextView,
} from 'components/card'
import { CircleIcon } from 'components/icons'
import { keygen } from 'components/keygen'
import {
  CARD_MARGIN,
  DISABLE_COLOR,
  PADDING,
  RESIZE_HEIGHT,
  RESIZE_WIDTH,
} from 'constants'
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'
import { useReducer, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const imagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1],
  quality: 1,
}

const reducer = (state, action) => {
  if (action.key) {
    return { ...state, key: action.key }
  }

  if (action.imageUri) {
    return { ...state, imageUri: action.imageUri }
  }

  if (action.audioUri) {
    return { ...state, audioUri: action.audioUri }
  }

  if (action.text) {
    return { ...state, text: action.text }
  }

  return state
}

const DetailScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()

  const [openInputText, setOpenInputText] = useState(false)

  const [recording, setRecording] = useState(undefined)

  const [sound, setSound] = useState(undefined)

  const [state, dispatch] = useReducer(reducer, {
    key: route.params.item.key || keygen(),
    imageUri: route.params.item.imageUri,
    audioUri: route.params.item.audioUri,
    text: route.params.item.text,
  })

  console.log(JSON.stringify(state, null, 2))

  const onPressPickImageFromCamera = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync()
      const result = await ImagePicker.launchCameraAsync(imagePickerOptions)

      if (!result.canceled) {
        const { uri } = await manipulateAsync(
          result.assets[0].uri,
          [{ resize: { height: RESIZE_HEIGHT, width: RESIZE_WIDTH } }],
          { compress: 1, format: SaveFormat.JPEG }
        )

        dispatch({ imageUri: uri })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onPressPickImageFromLibrary = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync()
      const result =
        await ImagePicker.launchImageLibraryAsync(imagePickerOptions)

      if (!result.canceled) {
        const { uri } = await manipulateAsync(
          result.assets[0].uri,
          [{ resize: { height: RESIZE_HEIGHT, width: RESIZE_WIDTH } }],
          { compress: 1, format: SaveFormat.JPEG }
        )

        dispatch({ imageUri: uri })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onPressSubmit = async () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: PADDING,
        }}
      >
        <CommCardContainerView style={{ margin: CARD_MARGIN }}>
          <CommCardImageView source={state.imageUri} />
          <CommCardTextView text={state.text} />
        </CommCardContainerView>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={onPressPickImageFromCamera}>
                <CircleIcon
                  name='ios-camera-outline'
                  style={{ margin: CARD_MARGIN }}
                />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={onPressPickImageFromLibrary}>
                <CircleIcon
                  name='ios-image-outline'
                  style={{ margin: CARD_MARGIN }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={null}>
                <CircleIcon
                  name='ios-mic-outline'
                  style={{ margin: CARD_MARGIN }}
                />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={null}
                disabled={recording ? false : true}
              >
                <CircleIcon
                  name='ios-stop-outline'
                  style={
                    recording
                      ? { margin: CARD_MARGIN }
                      : {
                          margin: CARD_MARGIN,
                          borderColor: DISABLE_COLOR,
                          backgroundColor: DISABLE_COLOR,
                        }
                  }
                  iconColor={recording ? undefined : DISABLE_COLOR}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={null}
                disabled={sound ? false : true}
              >
                <CircleIcon
                  name='ios-play-outline'
                  style={
                    sound
                      ? { margin: CARD_MARGIN }
                      : {
                          margin: CARD_MARGIN,
                          borderColor: DISABLE_COLOR,
                          backgroundColor: DISABLE_COLOR,
                        }
                  }
                  iconColor={sound ? undefined : DISABLE_COLOR}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={null}>
                <CircleIcon
                  name='ios-text-outline'
                  style={{ margin: CARD_MARGIN }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: PADDING }}>
        <TouchableOpacity onPress={onPressSubmit}>
          <CircleIcon
            name='ios-checkmark-outline'
            style={{
              margin: CARD_MARGIN,
              backgroundColor: 'rgba(0,128,0,0.1)',
              borderColor: 'green',
            }}
            iconColor='green'
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default DetailScreen
