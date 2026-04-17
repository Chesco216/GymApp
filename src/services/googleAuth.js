import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

const provider = new GoogleAuthProvider()
auth.config.authDomain = "jayani-power-bddfb.firebaseapp.com";

export const googleSignin = async ({ setUserinfo }) => {

  try {
    auth.config.authDomain = "jayani-power-bddfb.firebaseapp.com";
    const result = await signInWithPopup(auth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    localStorage.setItem('user', JSON.stringify(user.uid))
    setUserinfo(user)

    const userDoc = await getDoc(doc(db, 'users', user.uid))

    return userDoc.data()

  } catch (error) {
    alert("Error code: " + error.code + "Message: " + error.message)
    console.log(error)
  }

}
