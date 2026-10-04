import { useState } from "react";
import "./LogSignIn.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSessionContext } from "../hooks/session.context";
import { signInWithGoogle, signUpWithEmail } from "../repositories/auth.repository";
import { PolicyModal } from "../../common/components/PolicyModal";

const friendlySignupError = (code?: string): string => {
  if (code === "auth/email-already-in-use") return "Ese email ya está registrado. Inicia sesión.";
  if (code === "auth/weak-password") return "La contraseña debe tener al menos 6 caracteres.";
  if (code === "auth/invalid-email") return "El email no es válido.";
  return "No se pudo crear la cuenta. Inténtalo de nuevo.";
};

export const SigninPage = () => {
  const navigate = useNavigate();
  const session = useSessionContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);

  const handleLogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await signUpWithEmail(email, password, username);
      session.setUserinfo(user);
      navigate("/info-form");
    } catch (err) {
      console.log(err);
      setError(friendlySignupError((err as { code?: string }).code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    setError(null);
    setLoading(true);
    try {
      const { user, profile } = await signInWithGoogle();
      session.setUserinfo(profile ?? user);
      navigate(profile ? "/profile" : "/info-form");
    } catch (err) {
      console.log(err);
      setError("No se pudo registrar con Google. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='logsign-container'>
      <button onClick={() => { navigate('/') }} className='back-to-landing' aria-label='Volver al inicio'>
        <svg className='logsign-svg' xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" /><path d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z" /></svg>
      </button>
      <div className='formsignin-container'>
        <div className='logsign-form'>
          <span className='logo-name'>
            <img src='/logo.jpg' alt='Jayani Power' />
            <h3>
              JAYANI POWER
            </h3>
          </span>
          <h2>SIGN IN</h2>
          <label className='logsign-subtitle'>
            Crea tu cuenta con email y contraseña o usa tu cuenta de Google
          </label>
          {error && <div className='logsign-error' role='alert'>{error}</div>}
          <form onSubmit={handleLogSubmit}>

            <span className='form-fields'>
              <label className='form-label'>Nombre</label>
              <input
                required
                className='form-input'
                name='username'
                type='text'
                placeholder='Tu nombre'
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </span>

            <span className='form-fields'>
              <label className='form-label'>Correo electrónico</label>
              <input
                required
                className='form-input'
                name='email'
                type='email'
                placeholder='tu@email.com'
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
                placeholder='Mínimo 6 caracteres'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </span>

            <div>
              <label className='sign-in-checkbox'>
                <input name='terms' type='checkbox' required />
                Acepto los términos y condiciones
              </label>
              <strong className='sign-in-terms-link' onClick={() => { setIsOpen(true) }}>Ver términos</strong>
            </div>
            <PolicyModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
            <button className='logsign-button' type='submit' disabled={loading}>
              {loading ? "Cargando…" : "Sign In"}
            </button>
          </form>
          <div className='logsign-divider'>o</div>
          <button className='logsign-google-button' onClick={handleGoogleSignin} disabled={loading}>
            <img src='https://cdn.icon-icons.com/icons2/2429/PNG/512/google_logo_icon_147282.png' className='google-logo' alt='Google' />
            Sign In with Google
          </button>
          <span className='logsign-switch'>
            ¿Ya tienes cuenta? <NavLink to='/login'>Entra aquí</NavLink>
          </span>
        </div>
        <div className='login-rside'>
          <h1>
            Haz tus metas realidad
          </h1>
          <img className='logsign-image' src='https://img.freepik.com/free-vector/home-gym-with-different-workout-elements_23-2148864727.jpg' alt='Entrena en casa' />
        </div>
      </div>
    </div>
  )
}
