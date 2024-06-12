import { GoogleAuthProvider, signInWithPopup, getRedirectResult } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider()

export const googleSignin = async({ setUserinfo }) => {
 
  try {
    const result = await signInWithPopup(auth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    localStorage.setItem('user',JSON.stringify(user.uid))
    setUserinfo(user)

    const userDoc = await getDoc(doc(db, 'users', user.uid))

    return userDoc.data() 

  } catch (error) {
    console.log(error)
  }

}
