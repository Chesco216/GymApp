import { doc, getDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { useContext, useState } from 'react'
import { userContext } from '../context/UserProvider'

export const Profile = async() => {
  

  //FIX: i dont fucking know why but it is not working and it is calling the 
  //mother fucker function 8 fucking times
  const context = useContext(userContext)
  const response = await getDoc(doc(db, 'users', context.userinfo.uid))
  const data = await response.data().userObj
  // const [user, setUser] = useState(response.data().userObj)
  console.log('user',data)

  return (
    <div>Profile</div>
  )
}

