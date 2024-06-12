import OpenAI from 'openai'
import { routinePrompt } from './prompt'
import { db } from './firebase'
import { collection, doc, setDoc, addDoc } from 'firebase/firestore'
import { getRoutines } from './getRoutines'


// const API_KEY = import.meta.env.VITE_GPT_KEY

export const createRoutine = async(userinfo) => {

  const prompt = routinePrompt(userinfo)
  // const url = 'https://api.openai.com/v1/chat/completions'

  // const openai = new OpenAI({
  //   apiKey: API_KEY,
  //   dangerouslyAllowBrowser: true,
  // });
  //
  // try {
  //   const completion = await openai.chat.completions.create({
  //     messages: [{ role: "system", content: prompt }],
  //     model: "gpt-3.5-turbo",
  //     response_format: { type: "json_object" },
  //   });
  //
  //   //FIX: format data
  //   const data = completion.choices[0].message.content;
  //   console.log(data)
  //
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
          cals: data[0].cals,
          day: data[0].day,
          duration: data[0].duration,
          exercises:
            data[0].exercises.map((item) => {
              return {
                description: item.description,
                reps: item.reps,
                series: item.set
              }
            }),
          group: data[0].group
        },
        day_2: {
          cals: data[1].cals,
          day: data[1].day,
          duration: data[1].duration,
          exercises:
            data[1].exercises.map((item) => {
              return {
                description: item.description,
                reps: item.reps,
                series: item.set
              }
            }),
          group: data[1].group
        },
        day_3: {
          cals: data[2].cals,
          day: data[2].day,
          duration: data[2].duration,
          exercises:
            data[2].exercises.map((item) => {
              return {
                description: item.description,
                reps: item.reps,
                series: item.set
              }
            }),
          group: data[2].group
        },
        day_4: {
          cals: data[3].cals,
          day: data[3].day,
          duration: data[3].duration,
          exercises:
            data[3].exercises.map((item) => {
              return {
                description: item.description,
                reps: item.reps,
                series: item.set
              }
            }),
          group: data[3].group
        },
        day_5: {
          cals: data[4].cals,
          day: data[4].day,
          duration: data[4].duration,
          exercises: 
            data[4].exercises.map((item) => {
              return {
                description: item.description,
                reps: item.reps,
                series: item.set
              }
            }),
          group: data[4].group
        },
      }

        //TODO: set previous routine false
      // const prevRoutine = await getRoutines({userinfo})
      // await setDoc(doc(db, 'rutinas-personalizadas', prevRoutine.documentID), {
      //   ...prevRoutine,
      //   is_available: false
      // })

      const docRef = collection(db, "rutinas-personalizadas");
      await addDoc(docRef, {
        ...formatedData,
        uid: userinfo.uid,
        is_available: true,
      });

      console.log(data)
      console.log('format: ',formatedData)
    } catch (error) {
      console.log('error: ', error)
    }

    //
    // console.log("Document successfully written to diets in Firebase!",docRef.id);
  // } catch (error) {
  //   console.error("Error writing document: ", error);
  // }

}
