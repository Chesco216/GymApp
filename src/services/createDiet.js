import { addDoc, collection } from 'firebase/firestore'
import { dietPrompt } from './prompt'
import { db } from './firebase'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { dietPlanSchema } from './dietSchema'

export const createDiet = async (userinfo) => {

  console.log('from create diet')
  const prompt = dietPrompt(userinfo)

  const gemAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
  const model = gemAi.getGenerativeModel({
    model: "gemini-3-flash-preview",
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: dietPlanSchema,
    },
  });

  try {

    const res = await model.generateContent(prompt)

    const message = res.response
    const diet = JSON.parse(message.text())
    console.log(diet)
    console.log({ m: "creatediet", message })
    const formatedData = {
      day_1: {
        ...diet[0]
      },
      day_2: {
        ...diet[1]
      },
      day_3: {
        ...diet[2]
      },
      day_4: {
        ...diet[3]
      },
      day_5: {
        ...diet[4]
      },
      is_available: true,
      uid: userinfo.uid
    }
    //
    const docRef = collection(db, "dietas-personalizadas");
    await addDoc(docRef, {
      ...formatedData,
    });


  } catch (error) {
    console.log('ERROR: ', error)
  }

}
