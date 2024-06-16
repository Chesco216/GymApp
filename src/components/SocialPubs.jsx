import React from 'react'
import './SocialPubs.css'
import { CommentSVG, LikeSVG } from './SVGS'

export const SocialPubs = (post) => {

  const ppost = post.post
  console.log('fomr pubs: ',ppost)
  const { user_name, profilePictureUrl, content, comments, createdAt, post_image, title, likes } = ppost
  const date = new Date(createdAt.seconds)

  console.log(date.toDateString())

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
          <span className='like-comnts'>
            <LikeSVG/>
            <label className='like-comnts-content'>{likes}</label>
          </span>
          <span className='like-comnts'>
            <CommentSVG/>
            <label className='like-comnts-content'>{comments}</label>
          </span>
        </div>
      </div>
    </div>
  )
}

