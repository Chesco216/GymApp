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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await signInWithEmail(email, password);
      context.setUserinfo(user);
      navigate("/profile");
    } catch {
      setError("Credenciales inválidas. Revisa tu email y contraseña.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const { user, profile } = await signInWithGoogle();
      // Siempre setear sesión: si no hay perfil (usuario nuevo) usamos el
      // usuario de Auth para que RequireAuth deje pasar a /info-form.
      context.setUserinfo(profile ?? user);
      navigate(profile ? "/profile" : "/info-form");
    } catch (err) {
      console.log(err);
      setError("No se pudo iniciar sesión con Google. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='logsign-container'>
      <button onClick={() => { navigate('/') }} className='back-to-landing' aria-label='Volver al inicio'>
        <LogSignSVG />
      </button>
      <div className='formlogin-container'>
        <div className='logsign-form'>
          <span className='logo-name'>
            <img src='/logo.jpg' alt='Jayani Power' />
            <h3>
              JAYANI POWER
            </h3>
          </span>
          <h2>LOG IN</h2>
          <label className='logsign-subtitle'>
            Entra con tu email y contraseña o usa tu cuenta de Google
          </label>
          {error && <div className='logsign-error' role='alert'>{error}</div>}
          <form onSubmit={handleLogSubmit}>

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
              <label className='form-label'>
                Contraseña
              </label>
              <input
                required
                className='form-input'
                name='pswd'
                type='password'
                placeholder='••••••••'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </span>

            <button className='logsign-button' type='submit' disabled={loading}>
              {loading ? "Cargando…" : "Log In"}
            </button>
          </form>
          <div className='logsign-divider'>o</div>
          <button className='logsign-google-button' onClick={handleGoogleLogin} disabled={loading}>
            <img src='https://cdn.icon-icons.com/icons2/2429/PNG/512/google_logo_icon_147282.png' className='google-logo' alt='Google' />
            Log In with Google
          </button>
          <span className='logsign-switch'>
            ¿No tienes cuenta? <NavLink to='/signin'>Regístrate</NavLink>
          </span>
        </div>
        <div className='login-rside'>
          <h1>
            Welcome back!
          </h1>
          <img className='logsign-image' src='/logsign.jpg' alt='Entrenamiento en Jayani Power' />
        </div>
      </div>
    </div>
  )
}
