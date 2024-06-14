import React from 'react'
import { useNavigate } from 'react-router-dom'
import './MenuProfile.css'
import { LogoutSVG, PaymentSVG, PlanSVG, ProfileSVG, SocialSVG } from './SVGS'
import closeSession from '../services/closeSession'

export const MenuProfile = ({ setMenuOption }) => {

  const navigate = useNavigate()

  return (
    <div className='menu-profile-container'>
      <span onClick={() => {
        setMenuOption('info')
        localStorage.setItem('option', 'info')
        navigate('/profile/info')
      }} className='menu-profile-span'>
        <ProfileSVG/>
        <label className='menu-profile-label'>Informacion Personal</label>
      </span>
      <hr/>
      <span onClick={() => {
        setMenuOption('plan')
        localStorage.setItem('option', 'plan')
        navigate('/profile/plan')
      }} className='menu-profile-span'>
        <PlanSVG/>
        <label className='menu-profile-label'>Cambiar plan</label>
      </span>
      <hr/>
      <span onClick={() => {
        setMenuOption('payment')
        localStorage.setItem('option', 'payment')
        navigate('/profile/payment')
      }} className='menu-profile-span'>
        <PaymentSVG/>
        <label className='menu-profile-label'>Pagos</label>
      </span>
      <hr/>
      <span onClick={() => {
        setMenuOption('social')
        localStorage.setItem('option', 'social')
        navigate('/profile/social')
      }} className='menu-profile-span'>
        <SocialSVG/>
        <label className='menu-profile-label'>Social</label>
      </span>
      <hr/>
      <span onClick={ closeSession } className='menu-profile-span'>
        <LogoutSVG/>
        <label className='menu-profile-label'>Cerrar Sesion</label>
      </span>
    </div>
  )
}

