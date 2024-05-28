import React, { useContext } from 'react'
import { userContext } from '../context/UserProvider'

export const Profile = () => {
  
  const user = useContext(userContext)
  console.log(user)

  return (
    <div>
      <label>Profile</label>    
    </div>
  )
}

