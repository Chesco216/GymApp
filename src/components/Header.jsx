import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'

export const Header = () => {
 
  const signIn = () => {
    console.log('signin')
    {/*
      TODO: implement signIn screen
    */}
  }

  const logIn = () => {
    console.log('login')
    {/*
      TODO: implement logIn screen
    */}
  }
  
  return (
    <div className='header-container'>
      
      <NavLink to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className='logo-label-div'>
          <img id='logo-img' src='../../public/logo.jpg' alt='logo'/>
          <label>BEST ME</label>
        </div>
      </NavLink>

      <NavLink to='/calculator' style={{ textDecoration: 'none', color: 'inherit' }}>
        <span id='calcu' className='header-links'>calculator</span>
      </NavLink>

      <NavLink to='/macros' style={{ textDecoration: 'none', color: 'inherit' }}>
        <span id='macro' className='header-links'>macros</span>
      </NavLink>

      <NavLink to='/prices' style={{ textDecoration: 'none', color: 'inherit' }}>
        <span id='price' className='header-links'>prices</span>
      </NavLink>

      <button className='log-in-button' onClick={ logIn }>Log in</button>
      <button className='sign-in-button' onClick={ signIn }>Sign in</button>
    </div>
  )
}
