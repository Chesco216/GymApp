import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

const provider = new FacebookAuthProvider

export const facebookSignin = async({setUserinfo}) => {

  //WARN: idk if its the code or fb API but theres something wrong
  const result = await signInWithPopup(auth, provider)
  const user = result.user
  setUserinfo(user)
  const credential = FacebookAuthProvider.credentialFromResult(result);
  const accessToken = credential.accessToken;

}
