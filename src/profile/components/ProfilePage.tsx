import { useState } from "react";
import { useSessionContext } from "../../auth/hooks/session.context";
import { Loading } from "../../common/components/Loading";
import "./Profile.css";
import { DietGrid } from "../../diet/components/DietGrid";
import { motion } from "framer-motion";
import { MenuProfile } from "./MenuProfile";
import { CloseSVG, MenuSVG } from "../../common/components/SVGS";
import { RoutineGrid } from "../../routine/components/RoutineGrid";
import { EmptyDiet } from "../../diet/components/EmptyDiet";
import { EmptyRoutine } from "../../routine/components/EmptyRoutine";
import { useProfileContent } from "../hooks/useProfile";

const variants = {
  open: { opacity: 1, x: 100 },
  closed: { opacity: 0, x: "+100%" },
}

export const ProfilePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userinfo } = useSessionContext();
  const { diets, routines } = useProfileContent();

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {(!userinfo) ? (<Loading />)
        :
        (
          <div className='profile-container'>
            <div className='user-pic-name-email'>
              <div style={{ display: 'flex' }}>
                <img className='user-image' src={(userinfo.profilePictureUrl) ? userinfo.profilePictureUrl : 'https://t4.ftcdn.net/jpg/03/40/12/49/360_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.jpg'} alt='profile-picture' />
                <span className='user-name-email'>
                  <h1>{userinfo.username}</h1>
                  <label>{userinfo.email}</label>
                </span>
              </div>
              <motion.nav
                className='config-menu-motion'
                animate={menuOpen ? "open" : "closed"}
                variants={variants}>
                <MenuProfile />
              </motion.nav>
              <button className='update-info-button' onClick={() => { setMenuOpen(menuOpen => !menuOpen) }}>
                {
                  (menuOpen) == true ? (<CloseSVG />)
                    : (<MenuSVG />)
                }
              </button>
            </div>
            <div className='stats-section'>
              <span className='user-stats-span'>
                <h1 className='user-stats-value'>{userinfo.weight}<label className='stats-value-metric'>kg</label></h1>
                <label className='user-stats-label'>PESO</label>
              </span>
              <span className='user-stats-span'>
                <h1 className='user-stats-value'>{userinfo.height}<label className='stats-value-metric'>cm</label></h1>
                <label className='user-stats-label'>ALTURA</label>
              </span>
              <span className='user-stats-span'>
                <h1 className='user-stats-value'>{userinfo.age}<label className='stats-value-metric'>años</label></h1>
                <label className='user-stats-label'>EDAD</label>
              </span>
            </div>
            <div className='profile-diet-content'>
              <h1>Tu dieta semanal </h1>
              {
                (diets) ? <DietGrid />
                  :
                  <EmptyDiet />
              }
            </div>
            <div className='profile-routine-section'>
              <h1>Tu rutina semanal</h1>
              {
                (routines) ? <RoutineGrid />
                  :
                  <EmptyRoutine />
              }
            </div>
          </div>
        )}
    </div>
  )
}
