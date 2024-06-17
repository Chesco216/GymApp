import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "./firebase"

export const getDiets = async() => {
  console.log('get Diets')
  const id = localStorage.getItem('user').replaceAll('"','' );
  

  let data
  const q = query(collection(db, "dietas-personalizadas"), where("uid", "==", id), where("is_available", "==", true))
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

  return formatedData
}
