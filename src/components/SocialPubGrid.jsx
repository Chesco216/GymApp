import React, { useEffect, useState } from 'react'
import { SocialPubs } from './SocialPubs'
import '../Screens/Social.css'
import { Loading } from './Loading'
import { LogSignSVG } from './SVGS'
import { SocialMenu } from './SocialMenu'

export const SocialPubGrid = ({post, user}) => {

  console.log(post)
  const [mapPost,setMappost] = useState([])
  console.log('maped from grid',mapPost)

  useEffect(() => {
    setMappost(post)
  }, [])

  return (
    <div className='post-grid-container'>
      <div className='social-menu-pubs-container'>
        <SocialMenu user={user}/>
      </div>
      <div className='social-grid-pubs-container'>
        {
          (mapPost.length > 0) ? 
            <>
              {
                mapPost.map((item) => {
                  console.log('item', item)
                  return (
                    <SocialPubs key={item.post.title} post={item}/>
                  )
                })
              }
            </>
          : <Loading/>

        }
      </div>
      </div>
  )
}
