import { useState } from 'react'
import './SocialMenu.css'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../services/firebase'
import { addDoc, collection } from 'firebase/firestore'

export const SocialMenu = ({user}) => {

  const { profilePictureUrl, username, email } = user 

  const [postform, setPostform] = useState(false)
  const [post, setPost] = useState({
    content: '',
    comments: 10,
    createdAt: '',
    likes: 7,
    post_image: '',
    profilePictureUrl: profilePictureUrl,
    title: '',
    user_name: username
  })

  const handleSubmit = async(e) => {
    e.preventDefault()
    // console.log('post to upload', post)
    try {
      await addDoc(collection(db, 'publicaciones'), { ...post })
      setPostform(false)
      console.log('post uploaded correctly')
    } catch (error) {
      console.log(error.code)
    }
  }
  
  const handleUploadImage = async(e) => {
    const image = e.target.files[0]
    if(!image) return null
    const profilePictureRef = ref(storage, `post-pictures/${image.name}`)
    await uploadBytes(profilePictureRef, image)
    const getImageRef = ref(storage, `gs://jayani-power.appspot.com/post-pictures/${image.name}`)
    const downloadURL = await getDownloadURL(getImageRef)
    return downloadURL
  }

  return (
    <div className='social-menu-container'>
      <div className='menu-info-header'>
        <span className='menu-name-email-container'>
          <img className='profile-pic-menu' src={profilePictureUrl} alt='pipipi'/>
          <label className='name-email-menu-label'>{username}</label>
          <label className='name-email-menu-label'>{email}</label>
        </span>
        <button className='create-post-btn' onClick={() => {setPostform(!postform)}}>+ Crear publicacion</button>
      </div>
      {
        (postform) && (
          <form className='upload-post-form' onSubmit={handleSubmit}>
            <span className='upload-post-span'>
              <label className='upload-post-label'>Titulo de la publicacion</label>
              <input className='upload-post-input'
                type='text'
                name='title'
                value={post.title}
                onChange={(e) => {setPost({
                  ...post,
                  title: e.target.value,
                  createdAt: new Date()
                })}}
              />
            </span>
            <span className='upload-post-span'>
              <label className='upload-post-label'>Descripcion</label>
              <textarea className='upload-post-input'
                style={{ height: '80px'}}
                name='content'
                value={post.content}
                onChange={(e) => {setPost({
                  ...post,
                  content: e.target.value
                })}}
              />
            </span>
            <span className='upload-post-span'>
              <label className='upload-post-label'></label>
              <input className='upload-post-input new-profile-picture'
                type='file'
                name='picture'
                onChange={ async(e) => {
                  if(e.target.files[0]) {
                    const pic = await handleUploadImage(e)
                    setPost({
                      ...post,
                      post_image: pic
                    })
                  }
                  
                }}
              />
            </span>
            <button className='create-post-btn' type='submit'>Publicar</button>
          </form>
        )
      }
    </div>
  )
}

