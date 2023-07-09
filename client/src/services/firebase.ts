import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID + '.appspot.com'
}

const app = initializeApp(firebaseConfig)

const storage = getStorage(app)

const db = getFirestore(app)

export { db, storage }
