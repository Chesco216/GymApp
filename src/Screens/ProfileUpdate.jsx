import React, { useContext } from 'react'
import { userContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'
import { InfoProfile } from '../components/InfoProfile'
import { ChangePlan } from '../components/ChangePlan'

export const ProfileUpdate = ({ option }) => {

  const { userinfo } = useContext(userContext)
  console.log('user', userinfo)

  const goToProfile = () => {
    navigate('/profile')
  }

  return (
    <div style={{
      width: '100vw',
      height: 'fit-content',
      overflowY: 'scroll',
      display: 'grid',
      placeContent: 'center',
      paddingTop: '50px',
      paddingBottom: '50px'
    }}>
      {
        (option === 'info') ? (<InfoProfile/>)
        : (option === 'plan') ? (<ChangePlan/>)
        : (<div>payment</div>)
      }
    </div>
  )
}

