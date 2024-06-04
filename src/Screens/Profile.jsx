import { doc, getDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { useContext, useEffect, useState } from 'react'
import { userContext } from '../context/UserProvider'

export const Profile = () => {
  
  const { userinfo } = useContext(userContext)
  const [user, setUser] = useState(null)
  
  const getUserInfo = async() => {
    const response = await getDoc(doc(db, 'users', userinfo.uid))
    const data = response.data()
    setUser(data.userObj)
    // console.log('data', data.userObj)
    // return data
  }
  
  console.log(user)
  //NOTE: a component cant be asyncronous
  useEffect(() => {
    getUserInfo()
    // console.log('user', user)
  }, [])

  return (
    <>
      <div className='user-pic-name-email'>
        <img src={ user.profilePictureURL } alt='profile-picture'/>
        <span>
          <label>{ user.username }</label>
          <label>{ user.email }</label>
        </span>
      </div>
      <div className='stats-section'>
        <span>
          <h1>{ user.weight }</h1>
          <label>PESO</label>
        </span>
        <span>
          <h1>{ user.height }</h1>
          <label>ALTURA</label>
        </span>
        <span>
          <h1>{ user.age }</h1>
          <label>EDAD</label>
        </span>
      </div>
      <div className='profile-diet-content'>
        dient context
      </div>
      <div className='profile-routine-section'>
        routines content
      </div>
      <div className='profile-progress-section'>
        progress content
      </div>
    </>
  )
}


