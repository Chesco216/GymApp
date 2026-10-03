import { useState } from "react";
import "./LogSignIn.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSessionContext } from "../hooks/session.context";
import { signInWithGoogle, signUpWithEmail } from "../repositories/auth.repository";
import { PolicyModal } from "../../common/components/PolicyModal";

export const SigninPage = () => {
  const navigate = useNavigate();
  const session = useSessionContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [modalIsOpen, setIsOpen] = useState(false);

  const handleLogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await signUpWithEmail(email, password, username);
      session.setUserinfo(user);
      navigate("/info-form");
    } catch (error) {
      console.log(error);
      alert((error as { code?: string }).code);
    }
  };

  const handleGoogleSignin = async () => {
    const userDoc = await signInWithGoogle();
    if (userDoc) session.setUserinfo(userDoc);
    !userDoc ? navigate("/info-form") : navigate("/profile");
  };

  return (
    <div className='logsign-container'>
      <div onClick={() => { navigate('/') }} className='back-to-landing'>
        <svg className='logsign-svg' xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" /><path d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z" /></svg>
      </div>
      <div className='formsignin-container'>
        <div className='logsign-form'>
          <span style={{ display: 'flex' }} className='logo-name'>
            <img src='../../public/logo.jpg' style={{ width: 60, height: 60, borderRadius: 15 }} />
            <h3>
              JAYANI POWER
            </h3>
          </span>
          <h2 style={{ margin: 20 }}>SIGN IN</h2>
          <label style={{ margin: 20, fontSize: 13, color: '#818181' }}>
            Sign In with your email amd password or use your google account instead
          </label>
          <form onSubmit={handleLogSubmit}>

            <span className='form-fields'>
              <label className='form-label'>Nombre</label>
              <input
                required
                className='form-input'
                name='username'
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </span>

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
              <label className='form-label'>Contraseña</label>
              <input
                required
                className='form-input'
                name='password'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </span>

            <div>
              <label className='sign-in-checkbox'>
                <input name='terms' className='form-checkbox-input' type='checkbox' required />
                Aceptar terminos y condiciones
              </label>
              <strong onClick={() => { setIsOpen(true) }}>ver</strong>
            </div>
            <PolicyModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
            <button className='logsign-button' type='submit'>Sign In</button>
          </form>
          <button className='logsign-button' onClick={handleGoogleSignin}>
            <img src='https://cdn.icon-icons.com/icons2/2429/PNG/512/google_logo_icon_147282.png' className='google-logo' />
            Log In with google
          </button>
          <span style={{ marginTop: 50, fontSize: 13 }}>
            Already have an account?, <NavLink to='/login'>login now</NavLink>
          </span>
        </div>
        <div className='login-rside'>
          <h1 style={{ color: 'white' }}>
            Make your goals became true
          </h1>
          <img src='https://img.freepik.com/free-vector/home-gym-with-different-workout-elements_23-2148864727.jpg' />
        </div>
      </div>
    </div>
  )
}
