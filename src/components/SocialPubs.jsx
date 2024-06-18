import React, { useContext, useEffect, useState } from 'react'
import { uid } from 'uid'
import './SocialPubs.css'
import { CommentSVG, LikeSVG, LikedSVG, SendCommentSVG } from './SVGS'
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { userContext } from '../context/UserProvider'

export const SocialPubs = ({post}) => {

  const { userinfo } = useContext(userContext)

  const ppost = post.post
  const id = post.id
  // console.log('fomr pubs: ',post)
  const { user_name, profilePictureUrl, content, comments, createdAt, post_image, title, likes } = ppost
  const date = new Date(createdAt.seconds*1000)
  const userId = localStorage.getItem('user').replaceAll('"','');
  // console.log('id from post', id)

  const [liked, setLiked] = useState(false)
  const [com, setCom] = useState(false)
  const [comArr, setComArr] = useState([])

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
      // console.log('pubid', id)
      likesId.push(userId);
      // console.log(likesId)
      await setDoc(doc(db, 'publicaciones', id), {
        ...ppost,
        likes: ppost.likes + 1,
        likedBy: likesId
      })
      setLiked(true)
      // console.log('liked pipipi')
    } catch (error) {
      console.log(error)
    }
    // console.log('liked', userId)
  }

  const createComment = async(content) => {
    console.log('create comment')
    try {

      await setDoc(doc(db, `publicaciones`,id, 'comentarios', uid()), {
        content: content,
        createdAt: new Date(),
        profilePictureUrl: userinfo.profilePictureUrl,
        userName: userinfo.username
      })
      // await addDoc(doc(comRef, {
      // }))
      await setDoc(doc(db, 'publicaciones'), {
        ...ppost,
        comments: ppost.comments + 1
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  const getComents = async() => {
    console.log('pressed')
    const coms = []
    try {
      const querySnapshot = await getDocs(collection(db, 'publicaciones', id, 'comentarios'))
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        coms.push(data)
        setComArr(coms);
        // console.log(data)
      })
      console.log('comArr', comArr)
      setCom(!com)
    } catch (error) {
      console.log(error)
    }
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
          <span className='like-comnts' onClick={getComents}>
            <CommentSVG/>
            <label className='like-comnts-content'>{comments}</label>
          </span>
        </div>
        {
          (com) && <CommentBox createComment={createComment} comentarios={comArr}/>
        }
      </div>
    </div>
  )
}

const CommentBox = ({createComment, comentarios}) => {

  console.log('comBox', comentarios)
  const [content, setContent] = useState()

  return (
    <div className='comment-box'>
      {
        (comentarios.length > 0) && <div className='comments-container'>
          {
            comentarios.map((item) => {
              return (
                <div className='comment-div'>
                  <span className='comment-span'>
                    <img className='comment-profile-pic' src={item.profilePictureUrl}/>
                    <label className='comment-user-name'>
                      {item.userName}
                    </label>
                  </span>
                  <p className='comment-content'>
                    {item.content}
                  </p>
                </div>
              )
            })
          }
        </div>
      }
      <div className='comment-create-container'>
        <input className='comment-input' placeholder='comenta'
          value={content}
          onChange={(e) => {setContent(e.target.value)}}/>
        <div onClick={() => {createComment(content)}}>
          <SendCommentSVG/>
        </div>
      </div>
    </div>
  )
}
