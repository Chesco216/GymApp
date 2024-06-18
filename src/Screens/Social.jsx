import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Social.css'
import { SocialMenu } from '../components/SocialMenu'
import { SocialPubGrid } from '../components/SocialPubGrid'
import { userContext } from '../context/UserProvider'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { Loading } from '../components/Loading'
import { LogSignSVG } from '../components/SVGS'
import { SocialLeftMenu } from './SocialLeftMenu'

export const Social = () => {
  
  const { userinfo, setUserinfo } = useContext(userContext)
  const navigate = useNavigate()

  const [post, setPost] = useState([])
  const postArr = []
  
  const getUserinfo = async({id}) => {
    const res = await getDoc(doc(db, 'users', id))
    const data = res.data()
    return data
  }

  const getPosts = async() => {
    try {
      const querySnapshot = await getDocs(collection(db, 'publicaciones'));
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        postArr.push({
          post: data,
          id: doc.id
        })
        setPost(postArr)
        // ( post.length > 0 ) ? setPost([post, data])
        // : setPost(data)
      })
      console.log(post)
    } catch (error) {
      console.log('firebase get pubs error: ', error)
    }
  }
  
  if(!userinfo) {
    const userID = localStorage.getItem('user')
    const id = userID.replaceAll('"', '')
    getUserinfo({id})
    .then(data => setUserinfo(data))
    .catch(err => console.log(err))
  }

  // useEffect(() => {
  //   getPosts()
  //     .then(console.log('post useEffect', post))
  //     .catch(err => console.log('error:', err))
  // }, [])

  if(post.length === 0) {
    getPosts().then(console.log('get Post fn'))
  }

  return (
    <>
      {
        (!userinfo) ? (<Loading/>)
        :
        (
          <>
            <div className='social-screen-container'>
              <div onClick={() => { navigate('/profile') }} className='back-to-profile'>
                <LogSignSVG/>
              </div>
                <SocialLeftMenu/>
                {
                  (post.length > 0) ? <SocialPubGrid user={userinfo} post={post}/>
                  : <Loading/>
                }
            </div>
          </>
        )
      }
    </>
  )
}

