import { FirebaseOptions, initializeApp} from 'firebase/app'
import * as auth from 'firebase/auth'

const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    appId: process.env.REACT_APP_APP_ID,
}

export const appFirebase= initializeApp(firebaseConfig)
export const authFirebase = auth.initializeAuth(appFirebase)

