import { useNavigation, useRoute } from '@react-navigation/native'
import {
  CommCardContainerView,
  CommCardImageView,
  CommCardTextView,
} from 'components/card'
import {
  CameraIcon,
  CheckmarkIcon,
  ImageIcon,
  MicIcon,
  StopIcon,
  TextIcon,
} from 'components/icons'
import { CARD_MARGIN, PADDING, RESIZE_HEIGHT, RESIZE_WIDTH } from 'constants'
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const imagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1],
  quality: 1,
}

const DetailScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()

  const [imageUri, setImageUri] = useState(route.params.item.imageUri)
  const [audioUri, setAudioUri] = useState(route.params.item.audioUri)
  const [text, setText] = useState(route.params.item.text)

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

        setImageUri(uri)
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

        setImageUri(uri)
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
          <CommCardImageView source={imageUri} />
          <CommCardTextView text={text} />
        </CommCardContainerView>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={onPressPickImageFromCamera}>
                <CameraIcon style={{ margin: CARD_MARGIN }} />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={onPressPickImageFromLibrary}>
                <ImageIcon style={{ margin: CARD_MARGIN }} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={null}>
                <MicIcon style={{ margin: CARD_MARGIN }} />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={null}>
                <StopIcon style={{ margin: CARD_MARGIN }} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={null}>
                <TextIcon style={{ margin: CARD_MARGIN }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={onPressSubmit}>
        <CheckmarkIcon
          style={{
            margin: CARD_MARGIN,
            backgroundColor: 'rgba(0,128,0,0.1)',
            borderColor: 'green',
          }}
          iconColor='green'
        />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default DetailScreen
