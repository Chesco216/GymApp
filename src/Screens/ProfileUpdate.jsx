import React, { useContext } from 'react'
import { userContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'
import { InfoProfile } from '../components/InfoProfile'
import { ChangePlan } from '../components/ChangePlan'
import { PaymentMethod} from '../components/PaymentMethod'
import { Social } from './Social'
import { Loading } from '../components/Loading'
import './ProfileUpdate.css'

export const ProfileUpdate = ({ option, setMenuOption }) => {

  const { userinfo } = useContext(userContext)
  console.log('user', userinfo)

  const goToProfile = () => {
    navigate('/profile')
  }

  const prevOpt = localStorage.getItem('option')

  if(prevOpt) setMenuOption(prevOpt)

  //FIX: option get value 'info' on reload
  console.log(option)

  return (
    <div className='profile-update-container'>
      {
        (option === 'info') ? (<InfoProfile/>)
        : (option === 'plan') ? (<ChangePlan/>)
        : (option === 'payment') ? (<PaymentMethod/>)
        : (option === 'social') ? (<Social/>)
        : <Loading/>
      }
    </div>
  )
}

