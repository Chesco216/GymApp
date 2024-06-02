import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { expect, test, describe } from 'vitest'
import { auth } from '../services/firebase'

describe('Sign up test', () => {
  test('must return user email', async() => {
    const email = 'test@mail.com'
    const password = '1234567'
    await createUserWithEmailAndPassword(auth, email, password)
    const currentUser = auth.currentUser
    expect( currentUser.email ).toEqual(email)
  })
})

describe('Login falsy test', () => {
  
  const email = 'noexisto@gmail.com'
  const password = 'falsofalso'
  let errorCode
  test('must be false', async() => {
    try { 
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      errorCode = error.code
    }
    // const user = auth.currentUser
    expect(errorCode).toBe('auth/invalid-credential')
  })
})

