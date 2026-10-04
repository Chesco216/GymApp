import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "../../auth/hooks/session.context";
import "./Profile.css";
import "./UserAvatar.css";
import { UserAvatar } from "./UserAvatar";
import { PlanSkeleton } from "./PlanSkeleton";
import "./PlanSkeleton.css";
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
  const navigate = useNavigate();
  const { userinfo } = useSessionContext();
  const { diets, routines, refresh, isLoading } = useProfileContent();

  if (!userinfo) {
    return (
      <div className='profile-page'>
        <section className='profile-plan-card'>
          <PlanSkeleton />
        </section>
        <section className='profile-plan-card'>
          <PlanSkeleton />
        </section>
      </div>
    );
  }

  const displayName = userinfo.username ?? userinfo.displayName ?? userinfo.email ?? "Mi perfil";

  return (
    <div className='profile-page'>
      <header className='profile-hero'>
        <UserAvatar name={displayName} photoUrl={userinfo.profilePictureUrl} size={96} />
        <div className='profile-hero-info'>
          <h1>{displayName}</h1>
          <p>{userinfo.email}</p>
          {userinfo.goal && <span className='profile-goal-chip'>{userinfo.goal}</span>}
        </div>
        <button
          className='profile-menu-button'
          onClick={() => { setMenuOpen(menuOpen => !menuOpen) }}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {(menuOpen) == true ? (<CloseSVG />) : (<MenuSVG />)}
        </button>
        <motion.nav
          className='config-menu-motion'
          animate={menuOpen ? "open" : "closed"}
          variants={variants}>
          <MenuProfile />
        </motion.nav>
      </header>

      <section className='profile-stats' aria-label='Tus medidas'>
        <div className='profile-stat-card'>
          <span className='profile-stat-value'>{userinfo.weight ?? "—"}<small>kg</small></span>
          <span className='profile-stat-label'>PESO</span>
        </div>
        <div className='profile-stat-card'>
          <span className='profile-stat-value'>{userinfo.height ?? "—"}<small>cm</small></span>
          <span className='profile-stat-label'>ALTURA</span>
        </div>
        <div className='profile-stat-card'>
          <span className='profile-stat-value'>{userinfo.age ?? "—"}<small>años</small></span>
          <span className='profile-stat-label'>EDAD</span>
        </div>
      </section>

      {(userinfo.weight == null || userinfo.height == null || userinfo.age == null) && (
        <button className='profile-complete-cta' onClick={() => navigate("/info-form")}>
          Completa tu perfil para generar tu plan
        </button>
      )}

      <section className='profile-plan-card'>
        <h2>Tu dieta semanal</h2>
        {isLoading ? <PlanSkeleton /> : (diets) ? <DietGrid onChanged={refresh} /> : <EmptyDiet onGenerated={refresh} />}
      </section>

      <section className='profile-plan-card'>
        <h2>Tu rutina semanal</h2>
        {isLoading ? <PlanSkeleton /> : (routines) ? <RoutineGrid onChanged={refresh} /> : <EmptyRoutine onGenerated={refresh} />}
      </section>
    </div>
  )
}
