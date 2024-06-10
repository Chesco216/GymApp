import { doc, getDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { useContext, useEffect, useState } from 'react'
import { userContext } from '../context/UserProvider'
import { Loading } from '../components/Loading'
import './Profile.css'
import { DietGrid } from '../components/DietGrid'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { MenuProfile } from '../components/MenuProfile'
import { CloseSVG, MenuSVG } from '../components/SVGS'
import { RoutineGrid } from '../components/RoutineGrid'

const variants = {
  open: { opacity: 1, x: 100 },
  closed: { opacity: 0, x: "+100%" },
}

export const Profile = ({ setMenuOption }) => {

  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  
  const { userinfo, setUserinfo } = useContext(userContext)
  const [user, setUser] = useState(null)

  const getUserInfo = async() => {
    const response = await getDoc(doc(db, 'users', userinfo.uid))
    const data = response.data()
    setUser(data)
    setUserinfo(data)
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <div>
      { (user) === null ? ( <Loading/> ) 
      :
      (
      <div className='profile-container'>
        <div className='user-pic-name-email'>
          <div style={{ display: 'flex'}}>
          <img className='user-image' src={ (user.profilePictureURL) ? user.profilePictureURL : 'https://t4.ftcdn.net/jpg/03/40/12/49/360_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.jpg' } alt='profile-picture'/>
          <span className='user-name-email'>
            <h1>{ user.username }</h1>
            <label>{ user.email }</label>
          </span>
          </div>
          <motion.nav
            className='config-menu-motion'
            animate={menuOpen ? "open" : "closed"}
            variants={variants}>
              <MenuProfile setMenuOption={setMenuOption}/>
          </motion.nav>
          <button className='update-info-button' onClick={() => { setMenuOpen(menuOpen => !menuOpen) }}>
                {
                  (menuOpen) == true ? ( <CloseSVG/> )
                  : ( <MenuSVG/> )
                }
          </button>
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
          <h1>Tu rutina semanal</h1>
          <RoutineGrid/>
        </div>
        <div className='profile-progress-section'>
          <h1>Tu Progreso</h1>
          {/*TODO: replace with routines content*/}
        </div>
      </div>
      )}
    </div>
  )
}
