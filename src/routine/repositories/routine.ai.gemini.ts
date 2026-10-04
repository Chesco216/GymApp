import { GoogleGenerativeAI } from "@google/generative-ai";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../common/firebase/client";
import { getGeminiKey } from "../../common/firebase/env";
import { trainingRoutineSchema } from "../dtos/routine.dto";
import { routinePrompt } from "./routine.prompt";
import type { User } from "../../auth/interfaces/user";
import type { StoredWorkoutDay } from "../interfaces/routine";

interface GeneratedExercise {
  description: string;
  reps: string;
  set: string;
}

interface GeneratedDay {
  cals: string;
  day: string;
  duration: string;
  exercises: GeneratedExercise[];
  group: string;
}

const toStoredDay = (day: GeneratedDay): StoredWorkoutDay => ({
  cals: day.cals,
  day: day.day,
  duration: day.duration,
  exercises: day.exercises.map((item) => ({
    description: item.description,
    reps: item.reps,
    series: item.set,
  })),
  group: day.group,
});

export const createRoutine = async (userinfo: User): Promise<void> => {
  const prompt = routinePrompt(userinfo);

  try {
    const gemAi = new GoogleGenerativeAI(getGeminiKey() as string);
    const model = gemAi.getGenerativeModel({
      model: "gemini-3-flash-preview",
      // @ts-expect-error legacy runtime shape preserved verbatim (SDK ignores unknown keys)
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: trainingRoutineSchema,
      },
    });

    const res = await model.generateContent(prompt);
    const data = JSON.parse(res.response.text()) as GeneratedDay[];
    const formatedData = {
      day_1: toStoredDay(data[0]),
      day_2: toStoredDay(data[1]),
      day_3: toStoredDay(data[2]),
      day_4: toStoredDay(data[3]),
      day_5: toStoredDay(data[4]),
    };

    await addDoc(collection(db, "rutinas-personalizadas"), {
      ...formatedData,
      uid: userinfo.uid,
      is_available: true,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.log("error: ", error);
  }
};
