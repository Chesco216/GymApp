// import { getDocs } from 'firebase/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase'
import { useState } from 'react';

//TODO: make a double query including the is_available field

export const getRoutines = async() => {
  
  let data
  const q = query(collection(db, "rutinas-personalizadas"), where("uid", "==", 'lj1COVhJQaVctj8ZSgklXCHBcdO2'), where("is_available", "==", true))
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data = doc.data()
  });

  const formatedData = [
    data.day_1,
    data.day_2,
    data.day_3,
    data.day_4,
    data.day_5
  ]

  console.log(formatedData)

  return formatedData
}
