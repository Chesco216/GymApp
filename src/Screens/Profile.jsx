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
    // return data
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
          <button onClick={ goToUpdate }>Update</button>
        </div>
        <div className='stats-section'>
          <span className='user-stats-span'>
            <h1 className='user-stats-value'>{ user.weight }</h1>
            <label className='user-stats-label'>PESO</label>
          </span>
          <span className='user-stats-span'>
            <h1 className='user-stats-value'>{ user.height }</h1>
            <label className='user-stats-label'>ALTURA</label>
          </span>
          <span className='user-stats-span'>
            <h1 className='user-stats-value'>{ user.age }</h1>
            <label className='user-stats-label'>EDAD</label>
          </span>
        </div>
        <div className='profile-diet-content'>
          <h1>Tu dieta semanal (le ponemos un iconito de comida)</h1>
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
