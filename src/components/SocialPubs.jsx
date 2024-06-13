import React from 'react'
import './SocialPubs.css'

export const SocialPubs = (post) => {

  const ppost = post.post
  console.log('fomr pubs: ',ppost)
  const { user_name, profilePictureURL, content, comments, createdAt, post_image, title, likes } = ppost
  const date = new Date(createdAt)
  
  return (
    <div className='post-card-container'>
      <div className='card-container'>
        <span className='post-span'>
          <img className='post-user-image' src={profilePictureURL}/>
          <span style={{display:'flex', flexDirection: 'column'}}>
            <label className='post-user-name'>{user_name}</label>
            <label className='post-user-name'>pipipi</label>
          </span>
        </span>
        <h3 className='post-title'>{title}</h3>
        <p className='post-content'>{content}</p>
        <img className='post-image' src={post_image}/>
        <div className='post-footer'>
          <label>{likes}</label><label>{comments}</label>
        </div>
      </div>
    </div>
  )
}

