// import OpenAI from 'openai'
import { routinePrompt } from './prompt'
import { db } from './firebase'
import { collection, addDoc } from 'firebase/firestore'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { trainingRoutineSchema } from './routineSchema'

export const createRoutine = async (userinfo) => {

  const prompt = routinePrompt(userinfo)

  try {

    const gemAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
    const model = gemAi.getGenerativeModel({
      model: "gemini-3-flash-preview",
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: trainingRoutineSchema,
      },
    });


    const res = await model.generateContent(prompt)

    const message = res.response
    const data = JSON.parse(message.text())
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
    console.log('format: ', formatedData)
  } catch (error) {
    console.log('error: ', error)
  }

  //
  // console.log("Document successfully written to diets in Firebase!",docRef.id);
  // } catch (error) {
  //   console.error("Error writing document: ", error);
  // }

}
