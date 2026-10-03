import { useEffect, useState } from "react";
import { useSessionContext } from "../../auth/hooks/session.context";
import { useNavigate } from "react-router-dom";
import "./InfoProfile.css";
import { CloseSVG, LogSignSVG } from "../../common/components/SVGS";
import { storage } from "../../common/firebase/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Loading } from "../../common/components/Loading";
import { getProfile, saveProfile } from "../repositories/profile.repository";
import type { Profile } from "../interfaces/profile";

export const InfoProfile = () => {
  const navigate = useNavigate();
  const { userinfo, setUserinfo } = useSessionContext();
  const [hide, setHide] = useState(true);

  useEffect(() => {
    getProfile(userinfo?.uid).then((data) => {
      if (data) setUserinfo(data);
    });
  }, []);

  return (
    <>
      { (!userinfo) ? ( <Loading/> )
      :
      (
          <>
      <div className='back-to-profile' onClick={() => {navigate('/profile')}}>
        <LogSignSVG/>
      </div>
      <div className='info-profile-container'>
        <img className='info-profile-image' src={(userinfo.profilePictureUrl) ? userinfo.profilePictureUrl : 'https://t4.ftcdn.net/jpg/03/40/12/49/360_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.jpg'} alt='profile'/>
        <div className='info-fields-container'>
          <label className='info-field'>Nombre de usuario:</label>
          <label className='info-field-value'>{userinfo.username}</label>
          <label className='info-field'>Correo electronico:</label>
          <label className='info-field-value'>{userinfo.email}</label>
          <label className='info-field'>Edad:</label>
          <label className='info-field-value'>{userinfo.age}</label>
          <label className='info-field'>Peso:</label>
          <label className='info-field-value'>{userinfo.weight}</label>
          <label className='info-field'>Altura:</label>
          <label className='info-field-value'>{userinfo.height}</label>
          <label className='info-field'>Alergias o restricciones:</label>
          <label className='info-field-value'>{userinfo.foodRestrictions}</label>
          <label className='info-field'>Limitaciones fisicas:</label>
          <label className='info-field-value'>{userinfo.physicalLimitations}</label>
          <label className='info-field'>Genero:</label>
          <label className='info-field-value'>{userinfo.gender}</label>
          <label className='info-field'>Meta:</label>
          <label className='info-field-value'>{userinfo.goal}</label>
        </div>
        <button className='update-info-button-1' onClick={() => {setHide(false)}}>Cambiar</button>
        <UpdateForm hide={(hide) ? 'hide' : ''} setHide={setHide}/>
      </div>
    </>
      )}
    </>
  )
}

const UpdateForm = ({ hide, setHide }: { hide: string; setHide: (hide: boolean) => void }) => {
  const { userinfo, setUserinfo } = useSessionContext();
  const [user, setUser] = useState<Profile>((userinfo ?? {}) as Profile);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userinfo) return;

    try {
      await saveProfile({ ...user, uid: userinfo.uid });
      setUserinfo({ ...userinfo, ...user });
      setHide(true);
    } catch {
      alert('no se pudo actualizar el perfil');
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (!image) return null;
    const profilePictureRef = ref(storage, `profile-images/${image.name}`);
    await uploadBytes(profilePictureRef, image);
    const getImageRef = ref(storage, `gs://jayani-power.appspot.com/profile-images/${image.name}`);
    const downloadURL = await getDownloadURL(getImageRef);
    return downloadURL;
  };

  return (
    <form className={`update-info-form ${hide}`} onSubmit={handleUpdate}>
      <div className='update-form-top'>
        <img className='info-profile-image-1' src={(userinfo?.profilePictureUrl) ? userinfo.profilePictureUrl : 'https://t4.ftcdn.net/jpg/03/40/12/49/360_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.jpg'} alt='profile'/>
        <input id='image-input' className='new-profile-picture' type='file' name='image' accept='.jpg, .png, .jpeg'
          onChange={async(e) => {
            if(e.target.files?.[0]) {
              const pic = await handleUploadImage(e);
              setUser({
                ...user,
                profilePictureUrl: pic,
                updatedAt: new Date()
              })
            }
          }}
        />
        <div className='exit-form' onClick={() => {setHide(true)}}>
          <CloseSVG/>
        </div>
      </div>
      <span className='update-span-form'>
        <label className='update-label-form'>Nombre de usuario</label>
        <input
          className='update-input-form'
          type='text'
          name='name'
          value={user.username ?? ''}
          onChange={e => setUser({
            ...user,
            username: e.target.value})}
        />
      </span>
      <span className='update-span-form'>
        <label className='update-label-form'>Peso</label>
        <input
          className='update-input-form'
          type='number'
          name='weight'
          value={user.weight ?? ''}
          onChange={e => setUser({
            ...user,
            weight: parseFloat(e.target.value)})}
        />
      </span>
      <span className='update-span-form'>
        <label className='update-label-form'>Alergias o restricciones</label>
        <input
          className='update-input-form'
          type='text'
          name='food'
          value={user.foodRestrictions ?? ''}
          onChange={e => setUser({
            ...user,
            foodRestrictions: e.target.value})}
        />
      </span>
      <span className='update-span-form'>
        <label className='update-label-form'>Limiataciones fisicas</label>
        <input
          className='update-input-form'
          type='text'
          name='body'
          value={user.physicalLimitations ?? ''}
          onChange={e => setUser({
            ...user,
            physicalLimitations: e.target.value})}
        />
      </span>
      <span className='update-span-form'>
        <label className='update-label-form'>Meta</label>
        <input
          className='update-input-form'
          type='text'
          name='goal'
          value={user.goal ?? ''}
          onChange={e => setUser({
            ...user,
            goal: e.target.value})}
        />
      </span>

      <button className='update-info-button-2' type='submit'>Actualizar</button>
    </form>
  )
}
