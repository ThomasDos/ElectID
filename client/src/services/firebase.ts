import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID + '.appspot.com',
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'localhost'
}

const app = initializeApp(firebaseConfig)

const storage = getStorage(app)

const auth = getAuth(app)
auth.useDeviceLanguage()
const googleProvider = new GoogleAuthProvider()

export { auth, googleProvider, storage }
