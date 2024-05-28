import React, { createContext, useState } from 'react'

export const userContext = createContext()

export const UserProvider = ({ children }) => {

  const [userinfo, setUserinfo] = useState()

  return (
    <userContext.Provider value={{ userinfo, setUserinfo }}>
      { children }
    </userContext.Provider>
  )
}
