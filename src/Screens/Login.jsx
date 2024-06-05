import React, { useContext, useState } from 'react'
import './LogSignIn.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../services/firebase'
import { userContext } from '../context/UserProvider'
import { googleSignin } from '../services/googleAuth'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { InfoForm } from '../components/InfoForm'

export const LogIn = () => {

  const navigate = useNavigate()
  const context = useContext(userContext)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [isNew, setIsNew] = useState(true)

  const handleLogSubmit = async( e ) => {
    e.preventDefault()
    signInWithEmailAndPassword( auth, email, password )
    .then()


    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        context.setUserinfo(user)
        navigate('/info-form')
        // ...
      })
      .catch((error) => {
        alert('credenciales invalidas')
      })
    // const user = auth.currentUser
  }

  const handleGoogleLogin = async() => {
    
    const userDoc = await googleSignin( context )
    !userDoc ? navigate('/info-form') : navigate('/profile')
    
    
  }

  return (
    <div className='logsign-container'>
      <div className='formlogin-container'>
        <div className='logsign-form'>
          <span style={{display:'flex'}} className='logo-name'>
            <img src='../../public/logo.jpg' style={{width:60, height:60, borderRadius:15}}/>
            <h3>
              JAYANI POWER
            </h3>
          </span>
          <h2 style={{margin:20}}>LOG IN</h2>
          <label style={{margin:20, fontSize:13, color:'#818181'}}>
            Log In with your email amd password or use your google account instead
          </label>
          <form onSubmit={ handleLogSubmit }>

            <span className='form-fields'>
              <label className='form-label'>Correo electrionico</label>
              <input 
                className='form-input' 
                name='email'
                type='email'
                value={email}
                onChange={ e => setEmail(e.target.value) }
              />
            </span>

            <span className='form-fields'>
              <label className='form-label'>
                Contraseña
              </label>
              <input 
                className='form-input'
                name='pswd'
                type='password'
                value={password}
                onChange={ e => setPassword(e.target.value) }
              />
            </span>

            <button className='logsign-button' type='submit'>Log In</button>
          </form>
            <button className='logsign-google-button' onClick={ handleGoogleLogin }>
              <img src='https://cdn.icon-icons.com/icons2/2429/PNG/512/google_logo_icon_147282.png' className='google-logo'/>
              Log In with google
            </button>
          <span style={{marginTop:50, fontSize:13}}>
            Don't have an account?, <NavLink to='/signin'>register now</NavLink>
          </span>
        </div>
        <div className='login-rside'>
          <h1 style={{color:'white'}}>
            Welcome back!
          </h1>
          <img src='https://img.freepik.com/free-vector/home-gym-with-different-workout-elements_23-2148864727.jpg'/>
        </div>
      </div>
    </div>
  )
}

