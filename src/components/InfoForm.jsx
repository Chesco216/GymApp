import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './InfoForm.css'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { userContext } from '../context/UserProvider'

export const InfoForm = () => {

  const navigate = useNavigate()
  const context = useContext(userContext)
  // console.log(context)
  const [age, setAge] = useState()
  const [weight, setWeight] = useState()
  const [height, setHeight] = useState()
  const [food, setFood] = useState()
  const [body, setBody] = useState()
  const [gender, setGender] = useState()
  const [goal, setGoal] = useState()

    // await setDoc(doc(db, 'users', uid), {
    //   age: 15,
    //   //TODO: get the actual date
    //   createdAt: '',
    //   email: email,
    //   height: 10,
    //   memberType: 'estandar',
    //   profilePictureURL: photoURL,
    //   publicProfile: true,
    //   uid: uid,
    //   updateAt: '',
    //   username: displayName,
    //   weight: 10
    // })

  const handleSubmit = async(e) => {
    e.preventDefault()
    const currDate = new Date()
    const userObj = {
      age: age,
      createdAt: currDate,
      email: context.userinfo.email,
      height: height,
      memberType: 'estandar',
      profilePictureUrl: context.userinfo.photoURL,
      publicProfile: true,
      uid: context.userinfo.uid,
      updateAt: currDate,
      username: context.userinfo.displayName,
      weight: weight,
      gender:gender,
      restrictFood: food,
      bodyLimits: body,
      goal: goal
    }

    try {
      console.log('context: ', context)
      console.log('userinfo:', context.userinfo)
      console.log('userObj: ', userObj)
      await setDoc(doc(db, 'users', userObj.uid),{ ...userObj })
      navigate('/profile')
    } catch (error) {
      console.log(error)
      alert('error al cargar los datos')
      // navigate('/login')
    }
  }

  return (
    <div className='info-form-container'>
      <div className='more-info-form'>
        <h1>About you</h1>
        <form className='info-form' onSubmit={handleSubmit}>
          <span className='info-span'>
            <label>
              Que edad tienes?
            </label>
            <input
              className='info-input'
              type='number'
              name={age}
              value={age}
              onChange={e => setAge(e.target.value)}
            />
          </span>
          <span className='info-span'>
            <label>
              Cual es tu peso?
            </label>
            <input
              className='info-input'
              type='number'
              name={weight}
              value={weight}
              onChange={e => setWeight(e.target.value)}
            />
          </span>
          <span className='info-span'>
            <label>
              Cual es tu altura?
            </label>
            <input
              className='info-input'
              type='number'
              name={height}
              value={height}
              onChange={e => setHeight(e.target.value)}
            />
          </span>
          <span className='info-span'>
            <label>
              Con que genero te identificas?
            </label>
            <input
              className='info-input'
              type='text'
              name={gender}
              value={gender}
              onChange={e => setGender(e.target.value)}
            />
          </span>
          <span className='info-span'>
            <label>
              Restricciones alimentarias   
            </label>
            <input
              className='info-input'
              type='text'
              name={food}
              value={food}
              onChange={e => setFood(e.target.value)}
            />
          </span>
          <span className='info-span'>
            <label>
              Limitaciones Fisicas
            </label>
            <input
              className='info-input'
              type='text'
              name={body}
              value={body}
              onChange={e => setBody(e.target.value)}
            />
          </span>
          <span className='info-span'>
            <label>
              Cual la meta a la que quieres llegar con tu fisico?
            </label>
            <input
              className='info-input'
              type='text'
              name={goal}
              value={goal}
              onChange={e => setGoal(e.target.value)}
            />
          </span>
          <button className='info-submit' type='submit'>Enviar</button>
        </form>
      </div>
    </div>
  )
}

