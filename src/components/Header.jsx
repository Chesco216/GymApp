import React from 'react'
import './Header.css'

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
      {/*
      TODO: implement routes on header to different screens 
      */}
      <button className='log-in-button' onClick={ logIn }>Log in</button>
      <button className='sign-in-button' onClick={ signIn }>Sign in</button>
    </div>
  )
}
