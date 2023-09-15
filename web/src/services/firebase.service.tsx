import { APP_CONST } from "@/const/configurationsCont"
import { IUser } from "@/types/user.type"
import { initializeApp } from "firebase/app"
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth"

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

export const loginWithGoogle = async (): Promise<IUser> => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const userResult = result.user
    const user: IUser = {
      email: userResult.email,
      name: userResult.displayName,
      picture: userResult.photoURL,
    }
    return user
  } catch (error) {
    throw new Error("Error al iniciar sesión")
  }
}

export const logoutWithGoogle = () => {
  signOut(auth)
    .then(() => {
      console.log("Session close")
    })
    .catch(error => {
      console.log(error)
    })
}
