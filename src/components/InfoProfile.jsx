import React, { useContext, useState } from 'react'
import { userContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'
import './InfoProfile.css'
import { CloseSVG, LogSignSVG } from './SVGS'
import { setDoc, doc } from 'firebase/firestore'
import { db, storage } from '../services/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

//TODO: UPDATE PROFILE PICTURE

export const InfoProfile = () => {
  
  const navigate = useNavigate()
  const {userinfo, setUserinfo} = useContext(userContext)
  const [hide, setHide] = useState(true)

  console.log(userinfo)

  return (
    <>
      <div className='back-to-profile' onClick={() => {navigate('/profile')}}>
        <LogSignSVG/>
      </div>
      <div className='info-profile-container'>
        <img className='info-profile-image' src={(userinfo.profilePictureURL) ? userinfo.profilePictureURL : 'https://t4.ftcdn.net/jpg/03/40/12/49/360_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.jpg'}/>
        <div className='info-fields-container'>
          {/*NOTE: must implement a mapper*/}
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
          <label className='info-field-value'>{userinfo.restrictFood}</label>
          <label className='info-field'>Limitaciones fisicas:</label>
          <label className='info-field-value'>{userinfo.bodyLimits}</label>
          <label className='info-field'>Genero:</label>
          <label className='info-field-value'>{userinfo.gender}</label>
          <label className='info-field'>Meta:</label>
          <label className='info-field-value'>{userinfo.goal}</label>
        </div>
        <button className='update-info-button-1' onClick={() => {setHide(false)}}>Cambiar</button>
        <UpdateForm hide={(hide) ? 'hide' : ''} setHide={setHide}/>
      </div>
    </>
  )
}

const UpdateForm = ({hide, setHide}) => {

  const { userinfo, setUserinfo } = useContext(userContext)
  const [user, setUser] = useState(userinfo)

  const handleUpdate = async(e) => {
    e.preventDefault()
    const currDate =new Date()
    const picture = await handleUploadImage(e)
    console.log(picture)
    setUserinfo({
      ...userinfo,
      ...user,
      updateAt: currDate,
      profilePictureURL: picture
    })
    try {
      await setDoc(doc(db, 'users', userinfo.uid), { ...userinfo })
      setHide(true)
    } catch (error) {
      alert('no se pudo cargar')
    }
  }

  const handleUploadImage = async(e) => {
    const image = e.target.image.files[0]
    if(!image) return null
    const profilePictureRef = ref(storage, `profile-images/${image.name}`)
    await uploadBytes(profilePictureRef, image)
    const getImageRef = ref(storage, `gs://jayani-power.appspot.com/profile-images/${image.name}`)
    const downloadURL = getDownloadURL(getImageRef)
    return downloadURL
  }

  //WARN: validate options before update
  return (
    <form className={`update-info-form ${hide}`} onSubmit={handleUpdate}>
      <div className='update-form-top'>
        <img className='info-profile-image-1' src={(userinfo.profilePictureURL) ? userinfo.profilePictureURL : 'https://t4.ftcdn.net/jpg/03/40/12/49/360_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.jpg'}/>
        <input id='image-input' className='new-profile-picture' type='file' name='image' accept='.jpg, .png, .jpeg'/>
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
          value={user.username}
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
          value={user.weight}
          onChange={e => setUser({
            ...user,
            weight: e.target.value})}
        />
      </span>
      <span className='update-span-form'>
        <label className='update-label-form'>Alergias o restricciones</label>
        <input
          className='update-input-form'
          type='text'
          name='food'
          value={user.restrictFood}
          onChange={e => setUser({
            ...user,
            restrictFood: e.target.value})}
        />
      </span>
      <span className='update-span-form'>
        <label className='update-label-form'>Limiataciones fisicas</label>
        <input
          className='update-input-form'
          type='text'
          name='body'
          value={user.bodyLimits}
          onChange={e => setUser({
            ...user,
            bodyLimits: e.target.value})}
        />
      </span>
      <span className='update-span-form'>
        <label className='update-label-form'>Meta</label>
        <input
          className='update-input-form'
          type='text'
          name='goal'
          value={user.goal}
          onChange={e => setUser({
            ...user,
            goal: e.target.value})}
        />
      </span>

      <button className='update-info-button-2' type='submit'>Actualizar</button>
    </form>
  )
}
