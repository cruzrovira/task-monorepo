import { APP_CONST } from "@/const/configurationsCont"
import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

const firebaseConfig = {
  apiKey: APP_CONST.GOOGLE.API_KEY,
  authDomain: APP_CONST.GOOGLE.AUTH_DOMAIN,
  projectId: APP_CONST.GOOGLE.PROJECT_ID,
  storageBucket: APP_CONST.GOOGLE.STORAGE_BUCKET,
  messagingSenderId: APP_CONST.GOOGLE.MESSAGING_SENDER_ID,
  appId: APP_CONST.GOOGLE.APP_ID,
}

const googleProvider = new GoogleAuthProvider()
// configurar que initializeApp solo se ejecute una vez

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
auth.languageCode = "es"

export const loginWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      // const token = credential?.accessToken
      const user = result.user
      console.log(credential)
      console.log("User", user)
    })
    .catch(error => {
      console.error(error)
      // const errorCode = error.code
      // const errorMessage = error.message
      // const email = error.customData.email
      // const credential = GoogleAuthProvider.credentialFromError(error)
    })
}
