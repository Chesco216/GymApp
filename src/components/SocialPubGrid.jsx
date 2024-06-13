import React from 'react'
import { SocialPubs } from './SocialPubs'
import '../Screens/Social.css'

export const SocialPubGrid = (post) => {

  console.log(post.post)
  const mapPost = post.post
  console.log('maped',mapPost)

  return (
    <div className='post-grid-container'>
      {
        mapPost.map((item) => {
          console.log('pipipi')
          return (
            <SocialPubs key={item.title} post={item}/>
          )
        })
      }
    </div>
  )
}
