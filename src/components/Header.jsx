import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'

export const Header = () => {
 
  return (
    <div className='header-container'>
      
      <NavLink to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className='logo-label-div'>
          <img id='logo-img' src='../../logo.jpg' alt='logo'/>
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

      <NavLink to='/login' style={{ textDecoration: 'none', color: 'inherit' }}>
        <button className='log-in-button' >Log in</button>
      </NavLink>
      
      <NavLink to='/signin' style={{ textDecoration: 'none', color: 'inherit' }}>
        <button className='sign-in-button' >Sign in</button>
      </NavLink>
    </div>
  )
}
