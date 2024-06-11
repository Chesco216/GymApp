import OpenAI from 'openai'
import { routinePrompt } from './prompt'
import { db } from './firebase'
import { collection, doc, setDoc, addDoc } from 'firebase/firestore'
import { getRoutines } from './getRoutines'

const API_KEY = import.meta.env.VITE_GPT_KEY

export const createRoutine = async(userinfo) => {

  
  const prompt = routinePrompt(userinfo)


  const openai = new OpenAI({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true,
  });

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    });

    //FIX: format data
    const data = completion.choices[0].message.content;
    console.log(data)

    const docRef = collection(db, "rutinas-personalizadas");

    //FIX: set is_available false
    // const prevRoutine = await getRoutines({userinfo})
    // await setDoc(doc(db, 'rutinas-personalizadas', prevRoutine.documentID), {
    //   ...prevRoutine,
    //   is_available: false
    // })

    // await addDoc(docRef, {
    //   data: data,
    //   uid: userinfo.uid,
    //   is_available: true,
    // });
    //
    // console.log("Document successfully written to diets in Firebase!",docRef.id);
  } catch (error) {
    console.error("Error writing document: ", error);
  }

}
