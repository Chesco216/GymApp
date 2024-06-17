// import { getDocs } from 'firebase/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase'
import { useState } from 'react';

//TODO: make a double query including the is_available field

export const getRoutines = async() => {

  const id = localStorage.getItem('user').replaceAll('"','' );
  

  let data
  const q = query(collection(db, "rutinas-personalizadas"), where("uid", "==", id), where("is_available", "==", true))
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
