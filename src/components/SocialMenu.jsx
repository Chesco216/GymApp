import { useState } from 'react'
import './SocialMenu.css'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../services/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { AddPictureSVG } from './SVGS'

export const SocialMenu = ({user}) => {

  const { profilePictureUrl, username, email } = user 

  // const [postform, setPostform] = useState(false)
  const [post, setPost] = useState({
    content: '',
    comments: 0,
    createdAt: '',
    likes: 0,
    likedBy: [],
    post_image: '',
    profilePictureUrl: profilePictureUrl,
    title: '',
    user_name: username
  })

  const handleSubmit = async(e) => {
    e.preventDefault()
    const pic = await handleUploadImage(e)
    try {
      await addDoc(collection(db, 'publicaciones'), {
        ...post,
        post_image: pic,
        createdAt: new Date()
      })
      setPost({
        content: '',
        comments: 0,
        createdAt: '',
        likes: 0,
        likedBy: [],
        post_image: '',
        profilePictureUrl: profilePictureUrl,
        title: '',
        user_name: username
      })
      // setPostform(false)
      alert('publicacion subido correctamente')
      console.log('post uploaded correctly')
    } catch (error) {
      console.log(error.code)
    }
  }
  
  const handleUploadImage = async(e) => {
    const image = e.target.picture.files[0]
    if(!image) return null
    const profilePictureRef = ref(storage, `post-pictures/${image.name}`)
    await uploadBytes(profilePictureRef, image)
    const getImageRef = ref(storage, `gs://jayani-power.appspot.com/post-pictures/${image.name}`)
    const downloadURL = await getDownloadURL(getImageRef)
    return downloadURL
  }

  return (
    <form className='upload-post-form' onSubmit={handleSubmit}>
      <div className='social-menu-container'>
        <div className='menu-info-header'>
          <span className='menu-name-email-container'>
            <img className='profile-pic-menu' src={profilePictureUrl} alt='pipipi'/>
          </span>
        <span className='upload-post-span-title'>
          <label className='upload-post-label'>Agrega un titulo</label>
          <input className='upload-post-input'
            type='text'
            name='title'
            value={post.title}
            onChange={(e) => {setPost({
              ...post,
              title: e.target.value,
            })}}
          />
        </span>
        </div>
        <span className='upload-post-span'>
          <textarea className='upload-post-input'
            placeholder='Que estas pensando?'
            style={{ height: '80px'}}
            name='content'
            value={post.content}
            onChange={(e) => {setPost({
              ...post,
              content: e.target.value
            })}}
          />
        </span>
        <span className='upload-picture-post-span'>
          <label for='post-pic-upload'>
            <AddPictureSVG for='post-pic-upload'/>
          </label>
          <input className='upload-post-input-pic'
            id='post-pic-upload'
            type='file'
            name='picture'
          />
        </span>
        <button className='create-post-btn' type='submit'>Publicar</button>
      </div>
    </form>
  )
}

