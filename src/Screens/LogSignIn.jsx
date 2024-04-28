import React from 'react'
import './LogSignIn.css'
import { NavLink } from 'react-router-dom'

export const LogIn = () => {

  const getFormValues = ( event ) => {
    event.preventDefault()
    const formdata = new FormData(event.target)
    const fields = formdata.values()
    

    // NOTE: idk why it doesnt work how its supossed to
    console.log(formdata)
    return fields;
  }

  const googleLogIn = () => {
    // TODO: google LogIn
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
          <form onSubmit={ getFormValues }>

            <span className='form-fields'>
              <label className='form-label'>
                Correo electrionico
              </label>
              <input name='address' className='form-input' type='text' />
            </span>

            <span className='form-fields'>
              <label className='form-label'>
                Contraseña
              </label>
              <input name='pswd' className='form-input' type='password' />
            </span>

            <button className='logsign-button' type='submit'>Log In</button>
            <button className='logsign-google-button' onClick={ googleLogIn }>
              <img src='https://cdn.icon-icons.com/icons2/2429/PNG/512/google_logo_icon_147282.png' className='google-logo'/>
              Log In with google
            </button>
          </form>
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

export const SignIn = () => {
  return (
    <div className='logsign-container'>
      <div className='formsignin-container'>
        <div className='logsign-form'>
          <span style={{display:'flex'}} className='logo-name'>
            <img src='../../public/logo.jpg' style={{width:60, height:60, borderRadius:15}}/>
            <h3>
              JAYANI POWER
            </h3>
          </span>
          <h2 style={{margin:20}}>SIGN IN</h2>
          <label style={{margin:20, fontSize:13, color:'#818181'}}>
            Sign In with your email amd password or use your google account instead
          </label>
          <form onSubmit={ console.log('submit') }>

            <span className='form-fields'>
              <label className='form-label'>
                Nombre
              </label>
              <input name='username' className='form-input' type='text' />
            </span>

            <span className='form-fields'>
              <label className='form-label'>
                Correo electrionico
              </label>
              <input name='address' className='form-input' type='password' />
            </span>

            <span className='form-fields'>
              <label className='form-label'>
                Contraseña
              </label>
              <input name='pswd' className='form-input' type='password' />
            </span>

            <label className='sign-in-checkbox'>
              <input name='terms' className='form-checkbox-input' type='checkbox' />
              Terminos y condiciones
            </label>

            <button className='logsign-button' type='submit'>Sign In</button>
            <button className='logsign-button' onClick={ console.log('googlelogin') }>Sign In with google</button>
          </form>
        </div>
        <div className='login-rside'>
          <h1 style={{color: 'white'}}>
            Make your goals became true
          </h1>
          <img src='https://img.freepik.com/free-vector/home-gym-with-different-workout-elements_23-2148864727.jpg'/>
        </div>
      </div>
    </div>
  )
}
  
