import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SocialPubs } from './SocialPubs'
import '../Screens/Social.css'
import { Loading } from './Loading'
import { LogSignSVG } from './SVGS'

export const SocialPubGrid = ({post}) => {

  // console.log(post.post)
  const navigate = useNavigate()
  const [mapPost,setMappost] = useState([])
  console.log('maped from grid',mapPost)

  useEffect(() => {
    setMappost(post)
  }, [])

  return (
    <div className='post-grid-container'>
      {
        (mapPost.length > 0) ? 
          <>
            {
              mapPost.map((item) => {
                // console.log('pipipi')
                return (
                  <SocialPubs key={item.title} post={item}/>
                )
              })
            }
          </>
        : <Loading/>

      }
    </div>
  )
}
