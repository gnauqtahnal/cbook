// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAnnbUuMr2dLvEuke4-7LOpeS4qbhHzz0I',
  authDomain: 'cbook-afa1a.firebaseapp.com',
  projectId: 'cbook-afa1a',
  storageBucket: 'cbook-afa1a.appspot.com',
  messagingSenderId: '921899358959',
  appId: '1:921899358959:web:9d42df74e3ff008069591a',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

const createBlobAsync = async (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      try {
        resolve(xhr.response)
      } catch (error) {
        console.error(error)
      }
    }
    xhr.onerror = (e) => {
      console.error(e)
      reject(new TypeError('Network request failed'))
    }
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)
    xhr.send(null)
  })
}

export const uploadStorageAsync = async (path, uri) => {
  try {
    const blob = await createBlobAsync(uri)
    const storageRef = ref(storage, path)
    await uploadBytesResumable(storageRef, blob)
    const url = await getDownloadURL(storageRef)

    return url
  } catch {
    return undefined
  }
}
