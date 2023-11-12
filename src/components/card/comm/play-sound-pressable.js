import { Audio } from 'expo-av'
import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'

export const CommCardPlaySoundPressable = ({ audioUri, children }) => {
  const [sound, setSound] = useState(undefined)

  useEffect(() => {
    Audio.Sound.createAsync({ uri: audioUri })
      .then(({ sound }) => {
        setSound(sound)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  const onPressPlaySound = async () => {
    try {
      await sound.stopAsync()
      await sound.replayAsync()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <TouchableOpacity onPress={sound && onPressPlaySound}>
      {children}
    </TouchableOpacity>
  )
}
