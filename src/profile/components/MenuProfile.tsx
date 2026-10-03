import { useNavigate } from "react-router-dom";
import "./MenuProfile.css";
import { LogoutSVG, ProfileSVG } from "../../common/components/SVGS";
import { signOutSession } from "../../auth/repositories/auth.repository";

export const MenuProfile = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOutSession();
    navigate("/");
  };

  return (
    <div className='menu-profile-container'>
      <span onClick={() => {
        navigate('/profile/info')
      }} className='menu-profile-span'>
        <ProfileSVG/>
        <label className='menu-profile-label'>Informacion Personal</label>
      </span>
      <hr/>
      <span onClick={handleSignOut} className='menu-profile-span'>
        <LogoutSVG/>
        <label className='menu-profile-label'>Cerrar Sesion</label>
      </span>
    </div>
  )
}
