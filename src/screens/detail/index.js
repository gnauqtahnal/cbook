import { useNavigation, useRoute } from '@react-navigation/native'
import {
  CommCardContainerView,
  CommCardImageView,
  CommCardTextView,
} from 'components/card'
import { CircleIcon, Icon } from 'components/icons'
import { keygen } from 'components/keygen'
import { useCatagoryVerticalScroll } from 'components/vscroll'
import {
  BORDER_COLOR,
  CARD_BORDER_RADIUS,
  CARD_MARGIN,
  DISABLE_COLOR,
  PADDING,
  RESIZE_HEIGHT,
  RESIZE_WIDTH,
} from 'constants'
import { useUser } from 'contexts'
import { Audio } from 'expo-av'
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'
import { db, uploadStorageAsync } from 'firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useEffect, useReducer, useState } from 'react'
import {
  KeyboardAvoidingView,
  Modal,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const imagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1],
  quality: 1,
}

const uploadStorageAllAsync = async ({ id, key, imageUri, audioUri }) => {
  const getFileType = (uri) => {
    const uriParts = uri.split('.')
    const fileType = uriParts[uriParts.length - 1]
    return fileType
  }

  const uploadImage = async () => {
    const type = getFileType(imageUri)
    const path = `${id}/image_${key}.${type}`
    return await uploadStorageAsync(path, imageUri)
  }

  const uploadAudio = async () => {
    const type = getFileType(audioUri)
    const path = `${id}/audio_${key}.${type}`
    return await uploadStorageAsync(path, audioUri)
  }

  return await Promise.all([uploadImage(), uploadAudio()])
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

  if (action.text || action.text === '') {
    return { ...state, text: action.text }
  }

  return state
}

const DetailScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { id } = useUser()
  const { item, index } = route.params
  const { ref: catagoryRef } = useCatagoryVerticalScroll()
  const [openInputText, setOpenInputText] = useState(false)
  const [submitable, setSubmitable] = useState(false)
  const [recording, setRecording] = useState(undefined)
  const [sound, setSound] = useState(undefined)
  const [state, dispatch] = useReducer(reducer, {
    key: item.key || keygen(),
    imageUri: item.imageUri,
    audioUri: item.audioUri,
    text: item.text,
  })

  useEffect(() => {
    if (state.audioUri) {
      Audio.Sound.createAsync({ uri: state.audioUri })
        .then(({ sound }) => {
          setSound(sound)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [state.audioUri])

  useEffect(() => {
    if (state.key && state.imageUri && state.audioUri && state.text) {
      setSubmitable(true)
    } else {
      setSubmitable(false)
    }
  }, [state])

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

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

  const onPressStartRecording = async () => {
    try {
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      )

      setRecording(recording)
    } catch (error) {
      console.error(error)
    }
  }

  const onPressStopRecording = async () => {
    try {
      setRecording(undefined)

      await recording.stopAndUnloadAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      })

      const uri = recording.getURI()

      dispatch({ audioUri: uri })
    } catch (error) {
      console.error(error)
    }
  }

  const onPressPlaySound = async () => {
    try {
      await sound.stopAsync()
      await sound.replayAsync()
    } catch (error) {
      console.error(error)
    }
  }

  const onPressOpenTextInput = () => {
    setOpenInputText(true)
  }

  const onPressCloseTextInput = () => {
    setOpenInputText(false)
  }

  const onPressSubmit = async () => {
    const [imageUri, audioUri] = await uploadStorageAllAsync({
      id: id,
      key: state.key,
      imageUri: state.imageUri,
      audioUri: state.audioUri,
    })
    try {
      await setDoc(
        doc(db, 'data', state.key),
        {
          text: state.text || '',
          imageUri: imageUri || '',
          audioUri: audioUri || '',
        },
        { merge: true }
      )

      if (index >= catagoryRef.current?.data.length) {
        catagoryRef.current?.push(state)
      } else {
        catagoryRef.current?.update(index, state)
      }

      await setDoc(doc(db, id, 'catagory'), {
        data: catagoryRef.current?.data,
      })

      navigation.goBack()
    } catch (error) {
      console.log('[error] onPressSubmit:', error)
    }
  }

  return (
    <>
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

          {sound ? (
            <Icon
              name='ios-volume-high-outline'
              style={{ position: 'absolute', top: -15 }}
              iconColor='green'
            />
          ) : (
            <Icon
              name='ios-volume-mute-outline'
              style={{ position: 'absolute', top: -15 }}
              iconColor='red'
            />
          )}

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
                <TouchableOpacity
                  onPress={onPressStartRecording}
                  disabled={!recording ? false : true}
                >
                  <CircleIcon
                    name='ios-mic-outline'
                    style={
                      !recording
                        ? { margin: CARD_MARGIN }
                        : {
                            margin: CARD_MARGIN,
                            borderColor: DISABLE_COLOR,
                            backgroundColor: DISABLE_COLOR,
                          }
                    }
                    iconColor={!recording ? undefined : DISABLE_COLOR}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={onPressStopRecording}
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
                  onPress={onPressPlaySound}
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
                <TouchableOpacity onPress={onPressOpenTextInput}>
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
          <TouchableOpacity
            onPress={onPressSubmit}
            disabled={submitable ? false : true}
          >
            <CircleIcon
              name='ios-checkmark-outline'
              style={
                submitable
                  ? {
                      margin: CARD_MARGIN,
                      backgroundColor: 'rgba(0,128,0,0.1)',
                      borderColor: 'green',
                    }
                  : {
                      margin: CARD_MARGIN,
                      borderColor: DISABLE_COLOR,
                      backgroundColor: DISABLE_COLOR,
                    }
              }
              iconColor={submitable ? 'green' : DISABLE_COLOR}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Modal
        visible={openInputText}
        animationType='slide'
        transparent
      >
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
            <View style={{ flex: 1 }} />

            <KeyboardAvoidingView behavior='position'>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: CARD_BORDER_RADIUS,
                  margin: PADDING * 2,
                  borderColor: BORDER_COLOR,
                  backgroundColor: 'white',
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={{
                      flex: 1,
                      width: '100%',
                      height: '100%',
                      padding: PADDING,
                    }}
                    onChangeText={(text) => {
                      dispatch({ text: text })
                    }}
                    autoFocus
                  />

                  <TouchableOpacity onPress={onPressCloseTextInput}>
                    <CircleIcon
                      name='ios-checkmark-outline'
                      style={{ margin: CARD_MARGIN }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>
    </>
  )
}

export default DetailScreen
