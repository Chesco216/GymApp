import { doc, getDoc } from 'firebase/firestore'
import React, { createContext, useEffect, useState } from 'react'
import { db } from '../services/firebase'

export const userContext = createContext()

export const UserProvider = ({ children }) => {

  const [userinfo, setUserinfo] = useState()
  const id = localStorage.getItem('user')
  console.log('renddering on context')

  useEffect(() => {
    if (id) {
      getDoc(doc(db, 'users', id.replaceAll('"', '')))
        .then(res => res.data())
        .then(data => setUserinfo(data))
    }
  }, [id])


  return (
    <userContext.Provider value={{ userinfo, setUserinfo }}>
      {children}
    </userContext.Provider>
  )
}
