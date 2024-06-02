import React, { useContext, useState } from 'react'
import { userContext } from '../context/UserProvider'
import closeSession from '../services/closeSession'

export const Profile = () => {
  
  const context = useContext(userContext)
  // console.log(context)
  const [user, setUser] = useState(context)
  // console.log('userinfo', user.userinfo)

  return (
    <div>
      <label>user: {user.userinfo.displayName}</label>
      <br/>
      <label>email: {user.userinfo.email}</label>
      <br/>
      <span>
        <label>profile picture</label>
        <img src={user.userinfo.photoURL} alt='profile'/>
      </span>

      <button onClick={closeSession}>log out</button>
    </div>
  )
}

