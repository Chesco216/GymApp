import { useState } from "react";
import "./LogSignIn.css";
import { NavLink, useNavigate } from "react-router-dom";
import { LogSignSVG } from "../../common/components/SVGS";
import { signInWithEmail, signInWithGoogle } from "../repositories/auth.repository";
import { useSessionContext } from "../hooks/session.context";

export const LoginPage = () => {
  const navigate = useNavigate();
  const context = useSessionContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await signInWithEmail(email, password);
      context.setUserinfo(user);
      navigate("/profile");
    } catch {
      alert("credenciales invalidas");
    }
  };

  const handleGoogleLogin = async () => {
    const userDoc = await signInWithGoogle();
    if (userDoc) context.setUserinfo(userDoc);
    !userDoc ? navigate("/info-form") : navigate("/profile");
  };

  return (
    <div className='logsign-container'>
      <div onClick={() => { navigate('/') }} className='back-to-landing'>
        <LogSignSVG />
      </div>
      <div className='formlogin-container'>
        <div className='logsign-form'>
          <span style={{ display: 'flex' }} className='logo-name'>
            <img src='../../public/logo.jpg' style={{ width: 60, height: 60, borderRadius: 15, marginRight: 10 }} />
            <h3>
              JAYANI POWER
            </h3>
          </span>
          <h2 style={{ margin: 20 }}>LOG IN</h2>
          <label style={{ margin: 20, fontSize: 13, color: '#818181' }}>
            Log In with your email amd password or use your google account instead
          </label>
          <form onSubmit={handleLogSubmit}>

            <span className='form-fields'>
              <label className='form-label'>Correo electronico</label>
              <input
                required
                className='form-input'
                name='email'
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </span>

            <span className='form-fields'>
              <label className='form-label'>
                Contraseña
              </label>
              <input
                required
                className='form-input'
                name='pswd'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </span>

            <button className='logsign-button' type='submit'>Log In</button>
          </form>
          <button className='logsign-google-button' onClick={handleGoogleLogin}>
            <img src='https://cdn.icon-icons.com/icons2/2429/PNG/512/google_logo_icon_147282.png' className='google-logo' />
            Log In with google
          </button>
          <span style={{ marginTop: 50, fontSize: 13 }}>
            Don't have an account?, <NavLink to='/signin'>register now</NavLink>
          </span>
        </div>
        <div className='login-rside'>
          <h1 style={{ color: 'white' }}>
            Welcome back!
          </h1>
          <img className='logsign-image' src='../../public/logsign.jpg' />
        </div>
      </div>
    </div>
  )
}
