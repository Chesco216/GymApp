
import { useContext, useState } from 'react'
import './LogSignIn.css'
import { NavLink } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'
import { userContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'
import { googleSignin } from '../services/googleAuth'
import { facebookSignin } from '../services/facebookSignin'

export const SignIn = () => {

  const navigate = useNavigate()
  const user = useContext(userContext)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [username, setUsername] = useState()
  
  const handleLogSubmit = async( e ) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, email, password)
    const currentUser = auth.currentUser
    // console.log('currentUser',currentUser)
    user.setUserinfo(currentUser)
    navigate('/profile')
  }

  const handleGoogleSignin = () => {
    googleSignin(user)
    navigate('/profile')
  }

  const handleFacebookSignin = () => {
    facebookSignin(user)
    navigate('/profile')
  }

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
          <form onSubmit={ handleLogSubmit }>

            <span className='form-fields'>
              <label className='form-label'>Nombre</label>
              <input
                className='form-input'
                name='username'
                type='text'
                value={username}
                onChange={ e => setUsername(e.target.value) }
              />
            </span>

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
              <label className='form-label'>Contraseña</label>
              <input
                className='form-input'
                name='password'
                type='password'
                value={password}
                onChange={ e => setPassword(e.target.value) }
              />
            </span>

            <label className='sign-in-checkbox'>
              <input name='terms' className='form-checkbox-input' type='checkbox' />
              Terminos y condiciones
            </label>

            <button className='logsign-button' type='submit'>Sign In</button>
            <button className='logsign-button' onClick={ handleFacebookSignin }>Sign In with google</button>
          </form>
          <span style={{marginTop:50, fontSize:13}}>
            Already have an account?, <NavLink to='/login'>login now</NavLink>
          </span>
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
  

