import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SocialLeftMenu.css'
import { HomeSVG, LogoutSVG, PaymentSVG, PlanSVG, ProfileSVG, SocialSVG } from '../components/SVGS'
import closeSession from '../services/closeSession'

export const SocialLeftMenu = () => {

  const navigate = useNavigate()

  return (
    <div className='left-menu-container'>
      <span onClick={() => {
        localStorage.setItem('option', 'info')
        navigate('/profile')
      }} className='menu-profile-span-1'>
        <HomeSVG/>
        <label className='menu-profile-label-1'>Home</label>
      </span>
      <hr/>
      <span onClick={() => {
        localStorage.setItem('option', 'plan')
        navigate('/profile/plan')
      }} className='menu-profile-span-1'>
        <PlanSVG/>
        <label className='menu-profile-label-1'>Cambiar plan</label>
      </span>
      <hr/>
      <span onClick={() => {
        localStorage.setItem('option', 'payment')
        navigate('/profile/payment')
      }} className='menu-profile-span-1'>
        <PaymentSVG/>
        <label className='menu-profile-label-1'>Pagos</label>
      </span>
      <hr/>
      <span onClick={() => {
        localStorage.setItem('option', 'social')
        navigate('/profile/social')
      }} className='menu-profile-span-1'>
        <SocialSVG/>
        <label className='menu-profile-label-1'>Social</label>
      </span>
      <hr/>
      <span onClick={ closeSession } className='menu-profile-span'>
        <LogoutSVG/>
        <label className='menu-profile-label-1'>Cerrar Sesion</label>
      </span>
    </div>
  )
}

