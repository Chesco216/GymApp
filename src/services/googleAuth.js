import { GoogleAuthProvider, signInWithPopup, getRedirectResult } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const provider = new GoogleAuthProvider()

export const googleSignin = async({ setUserinfo }) => {

  // WARN: something is failing, throws an erro like: misisng-email

  const result = await signInWithPopup(auth, provider)
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  const user = result.user;
  setUserinfo(user)

  const createUserDoc = async({ displayName, email, photoURL, uid }) => {

    const storage = getStorage();
    const mountainsRef = ref(storage, user.photoURL);
    console.log('urlphoto:', mountainsRef)

    await setDoc(doc(db, 'users', uid), {
      age: 15,
      //TODO: get the actual date
      createdAt: '',
      email: email,
      height: 10,
      memberType: 'estandar',
      profilePictureURL: photoURL,
      publicProfile: true,
      uid: uid,
      updateAt: '',
      username: displayName,
      weight: 10
    })
  }

  createUserDoc(user)


}
