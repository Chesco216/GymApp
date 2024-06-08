import { doc, getDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { useContext, useEffect, useState } from 'react'
import { userContext } from '../context/UserProvider'
import { Loading } from '../components/Loading'
import closeSession from '../services/closeSession'
import './Profile.css'
import { DietGrid } from '../components/DietGrid'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {

  const navigate = useNavigate()
  
  const { userinfo } = useContext(userContext)
  const [user, setUser] = useState(null)

  const getUserInfo = async() => {
    const response = await getDoc(doc(db, 'users', userinfo.uid))
    const data = response.data()
    setUser(data.userObj)
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  const goToUpdate = () => {
    navigate('/profile/update')
  }
  return (
    <div>
      { (user) === null ? ( <Loading/> ) 
      :
      (
      <div className='profile-container'>
        <div className='user-pic-name-email'>
          <img className='user-image' src={ user.profilePictureURL } alt='profile-picture'/>
          <span className='user-name-email'>
            <h1>{ user.username }</h1>
            <label>{ user.email }</label>
          </span>
          <button className='update-info-button' onClick={ goToUpdate }><svg width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>file_type_config</title><path d="M23.265,24.381l.9-.894c4.164.136,4.228-.01,4.411-.438l1.144-2.785L29.805,20l-.093-.231c-.049-.122-.2-.486-2.8-2.965V15.5c3-2.89,2.936-3.038,2.765-3.461L28.538,9.225c-.171-.422-.236-.587-4.37-.474l-.9-.93a20.166,20.166,0,0,0-.141-4.106l-.116-.263-2.974-1.3c-.438-.2-.592-.272-3.4,2.786l-1.262-.019c-2.891-3.086-3.028-3.03-3.461-2.855L9.149,3.182c-.433.175-.586.237-.418,4.437l-.893.89c-4.162-.136-4.226.012-4.407.438L2.285,11.733,2.195,12l.094.232c.049.12.194.48,2.8,2.962l0,1.3c-3,2.89-2.935,3.038-2.763,3.462l1.138,2.817c.174.431.236.584,4.369.476l.9.935a20.243,20.243,0,0,0,.137,4.1l.116.265,2.993,1.308c.435.182.586.247,3.386-2.8l1.262.016c2.895,3.09,3.043,3.03,3.466,2.859l2.759-1.115C23.288,28.644,23.44,28.583,23.265,24.381ZM11.407,17.857a4.957,4.957,0,1,1,6.488,2.824A5.014,5.014,0,0,1,11.407,17.857Z" style={{fill: '#242933'}}/></svg></button>
        </div>
        <div className='stats-section'>
          <span className='user-stats-span'>
            <h1 className='user-stats-value'>{ user.weight }<label className='stats-value-metric'>kg</label></h1>
            <label className='user-stats-label'>PESO</label>
          </span>
          <span className='user-stats-span'>
            <h1 className='user-stats-value'>{ user.height }<label className='stats-value-metric'>cm</label></h1>
            <label className='user-stats-label'>ALTURA</label>
          </span>
          <span className='user-stats-span'>
            <h1 className='user-stats-value'>{ user.age }<label className='stats-value-metric'>años</label></h1>
            <label className='user-stats-label'>EDAD</label>
          </span>
        </div>
        <div className='profile-diet-content'>
          <h1>Tu dieta semanal </h1>
          <DietGrid/>
        </div>
        <div className='profile-routine-section'>
          routines content
        </div>
        <div className='profile-progress-section'>
          progress content
        </div>
            <button onClick={closeSession}>exit</button>
      </div>
      )}
    </div>
  )
}
