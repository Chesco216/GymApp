import React, { useEffect, useState } from 'react'
import './SocialPubs.css'
import { CommentSVG, LikeSVG, LikedSVG } from './SVGS'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../services/firebase'

export const SocialPubs = ({post}) => {

  const ppost = post.post
  const id = post.id
  console.log('fomr pubs: ',post)
  const { user_name, profilePictureUrl, content, comments, createdAt, post_image, title, likes } = ppost
  const date = new Date(createdAt.seconds*1000)
  const userId = localStorage.getItem('user').replaceAll('"','');
  console.log('id from post', id)

  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if(ppost.likedBy) {
      ppost.likedBy.map((item) => {
        if( item == userId ) setLiked(true)
      })
    }
  })

  const setLike = async() => {

    const likesId = ppost.likedBy
    try {
      console.log('pubid', id)
      likesId.push(userId);
      console.log(likesId)
      await setDoc(doc(db, 'publicaciones', id), {
        ...ppost,
        likes: ppost.likes + 1,
        likedBy: likesId
      })
      setLiked(true)
      console.log('liked pipipi')
    } catch (error) {
      console.log(error)
    }
    console.log('liked', userId)
  }

  const createComment = () => {
    
  }
  
  return (
    <div className='post-card-container'>
      <div className='card-container'>
        <span className='post-span'>
          <img className='post-user-image' src={profilePictureUrl}/>
          <span style={{display:'flex', flexDirection: 'column'}}>
            <label className='post-user-name'>{user_name}</label>
            <label className='post-date'>{date.toDateString()}</label>
          </span>
        </span>
        <h3 className='post-title'>{title}</h3>
        <p className='post-content'>{content}</p>
        <img className='post-image' src={post_image}/>
        <div className='post-footer'>
          {
            (liked) ?
            <>
              <span className='like-comnts'>
                <LikedSVG/>
                <label className='like-comnts-content'>{likes}</label>
              </span>
            </>
            :
            <>
              <span onClick={setLike} className='like-comnts'>
                <LikeSVG/>
                <label className='like-comnts-content'>{likes}</label>
              </span>
            </>
          }
          <span className='like-comnts'>
            <CommentSVG/>
            <label className='like-comnts-content'>{comments}</label>
          </span>
        </div>
      </div>
    </div>
  )
}

const CommentBox = () => {

  const getComents = async() {
    try {
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='comment-box'>
      <textarea/>
      <button>Comentar</button>
    </div>
  )
}
