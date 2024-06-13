import React, { useContext, useState } from 'react'
import './Social.css'
import { SocialMenu } from '../components/SocialMenu'
import { SocialPubGrid } from '../components/SocialPubGrid'
import { userContext } from '../context/UserProvider'
import { collection, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { Loading } from '../components/Loading'

export const Social = () => {
  
  const { userinfo, setUserinfo } = useContext(userContext)

  // const [post, setPost] = useState([])
  const post = []
  
  const getUserinfo = async({id}) => {
    const res = await getDoc(doc(db, 'users', id))
    const data = res.data()
    return data
  }

  const getPosts = async() => {
    const querySnapshot = await getDocs(collection(db, 'publicaciones'));
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      post.push(data)
    })
  }
  
  if(!userinfo) {
    const userID = localStorage.getItem('user')
    const id = userID.replaceAll('"', '')
    getUserinfo({id})
    .then(data => setUserinfo(data))
    .catch(err => console.log(err))
  }

  if(post.length === 0) {
    getPosts().then(console.log('post request'))
  }

  return (
    <>
      {
        (!userinfo) ? (<Loading/>)
        :
        (
          <div className='social-screen-container'>
            <SocialMenu user={userinfo}/>
            <SocialPubGrid post={post}/>
          </div>
        )
      }
    </>
  )
}

