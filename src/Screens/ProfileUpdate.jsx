import React, { useContext } from 'react'
import { userContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'

export const ProfileUpdate = () => {

  const navigate = useNavigate()
  const { userinfo } = useContext(userContext)
  console.log('user', userinfo)

  const goToProfile = () => {
    navigate('/profile')
  }

  return (
    <>
      <button onClick={ goToProfile }>{'<-'}</button>
      <div>ProfileUpdate</div>
      <form>
        <span>
          <label>
            campo
          </label>
          <input/>
        </span>
      </form>
    </>
  )
}

