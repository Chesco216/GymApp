import { GoogleAuthProvider, signInWithPopup, getRedirectResult } from "firebase/auth";
import { auth } from "./firebase";


const provider = new GoogleAuthProvider()

export const googleSignin = async({ setUserinfo }) => {

  const result = await signInWithPopup(auth, provider)
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  const user = result.user;
  setUserinfo(user)

}
