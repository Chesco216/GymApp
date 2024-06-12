import { addDoc, collection } from 'firebase/firestore'
import { dietPrompt } from './prompt'
import { db } from './firebase'

export const createDiet = async(userinfo) => {

  const prompt = dietPrompt(userinfo)

  try {

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_GPT_KEY}`,
      },
      body: JSON.stringify({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
      })
    })
    const message = await res.json()
    const data = JSON.parse(message.choices[0].message.content)

    const formatedData = {
      day_1: {
        ...data[0]
      },
      day_2: {
        ...data[1]
      },
      day_3: {
        ...data[2]
      },
      day_4: {
        ...data[3]
      },
      day_5: {
        ...data[4]
      },
      is_available: true,
      uid: userinfo.uid
    }
    console.log('Formated', formatedData)

    const docRef = collection(db, "dietas-personalizadas");
    await addDoc(docRef, {
      ...formatedData,
    });

    console.log('diet uploaded')

  } catch (error) {
    console.log('ERROR: ', error)
  }

}
