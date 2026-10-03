import { GoogleGenerativeAI } from "@google/generative-ai";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../common/firebase/client";
import { dietPlanSchema } from "../dtos/diet.dto";
import type { User } from "../../auth/interfaces/user";

const strucureData = ({ age, height, weight, foodRestrictions, physicalLimitations, goal }: {
  age?: unknown;
  height?: unknown;
  weight?: unknown;
  foodRestrictions?: unknown;
  physicalLimitations?: unknown;
  goal?: unknown;
}): string => (`
        La edad del usuario es: ${age},
        su altura es: ${height},
        su peso actual es: ${weight},
        el usuario  cuenta con las siguientes restricciones: ${foodRestrictions},
        ademas cuenta con las siguientes limitaciones: ${physicalLimitations},
        por ultimo el usuario tiene la siguiente meta objetivo: ${goal}
    `);

const dataFormatDiet = (): string => (`

        Como aclaracion inicial el texto entre paréntesis () solo contiene indicaciones y descripciones; no debe incluirse en la respuesta generada

        Necesito que tomes el rol de un nutricionista experto y genera un plan de alimentacion en forma de dieta. Una comida para cada tiempo del dia: desayuno, almuerzo y cena para 5 dias, es decir de lunes a viernes. El plan de alimentacion debe ser generado en base a las limitaciones y restricciones del usuario. La respuesta que debes retornar es el JSON de formato que te proporciono y nada mas, no un resumen, ni sugerencias.
        A continuacion, te paso un ejemplo del formato en que debes de responder:
        [
            {
                day: 'Lunes', (Dia de la semana)
                meals:
                [ (Tiempo o comida del dia)
                    {
                        meal_time: 'Desayuno', (comida del dia)
                        name: 'Huevo con pan', (nombre de la comida)
                        description: 'un huevo frito con pansito y tesito', (descripcion de la comida con todos su ingredientes)
                        ingredients:
                        [   (debes indicar todos los ingredientes en particular de la comida generada con las siguientes caracteristicas presentes)
                            {
                                name: 'huevo',(nombre del ingrediente)
                                quantity: '2 huevos', (cantidad de los ingredientes en la comida)
                            },
                            {
                                name: 'pan',(nombre del ingrediente)
                                quantity: '2 panes',(cantidad de los ingredientes en la comida)
                            }
                        ],
                        macros:
                        { (Informacion de macronutrientes de la comida en general)
                            proteins: '20 gr', (proteinas totales de la comida, ademas añade la unidad, es decir 10 gr por ejemplo)
                            calories: '10 cals', (calorias totales de la comida, ademas añade la unidad, es decir 10 cal por ejemplo)
                            vitamins: ['A', 'B', 'C', 'D'], (Vitaminas que provee la comida)
                            minerals: ['M1', 'M2', 'M3', 'M4'] (Minerales que proporciona la comida)
                        }
                    },
                ]
            }
        ]
        Genera solo el JSON en formato que te proporciono, nos añadas ni agregues cosas extra
    `);

export const dietPrompt = (userinfo: User): string => (`
        A continuacion te enviare informacion de un usuario el cual esta usando nuestra aplicacion de dietas y ejercicios, recuerda muy bien la informacion del usuario, las respuestas deben ser tal cual indican los formatos dados

        informacion del usuario : ${strucureData(userinfo as unknown as Record<string, unknown>)},

        con esta informacion necesito que realices lo siguiente: ${dataFormatDiet}
        Recuerda que la respuesta debe ser en formato JSON
    `);

export const createDiet = async (userinfo: User): Promise<void> => {
  const prompt = dietPrompt(userinfo);

  const gemAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY as string);
  const model = gemAi.getGenerativeModel({
    model: "gemini-3-flash-preview",
    // @ts-expect-error legacy runtime shape preserved verbatim (SDK ignores unknown keys)
    config: {
      responseMimeType: "application/json",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      responseJsonSchema: dietPlanSchema as any,
    },
  });

  try {
    const res = await model.generateContent(prompt);
    const diet = JSON.parse(res.response.text());
    const formatedData = {
      day_1: { ...diet[0] },
      day_2: { ...diet[1] },
      day_3: { ...diet[2] },
      day_4: { ...diet[3] },
      day_5: { ...diet[4] },
      is_available: true,
      uid: userinfo.uid,
    };
    await addDoc(collection(db, "dietas-personalizadas"), { ...formatedData });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};
