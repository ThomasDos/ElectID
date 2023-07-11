import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID + '.appspot.com',
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY
}

const app = initializeApp(firebaseConfig)

const storage = getStorage(app)

const db = getFirestore(app)

const auth = getAuth(app)

export { auth, db, storage }
