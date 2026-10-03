interface RoutineUserInfo {
  age?: unknown;
  height?: unknown;
  weight?: unknown;
  foodRestrictions?: unknown;
  physicalLimitations?: unknown;
  goal?: unknown;
}

const strucureData = ({ age, height, weight, foodRestrictions, physicalLimitations, goal }: RoutineUserInfo): string => (`
        La edad del usuario es: ${age},
        su altura es: ${height},
        su peso actual es: ${weight},
        el usuario  cuenta con las siguientes restricciones: ${foodRestrictions},
        ademas cuenta con las siguientes limitaciones: ${physicalLimitations},
        por ultimo el usuario tiene la siguiente meta objetivo: ${goal}
    `);

const dataFormatRutine = (): string => (`

        Como aclaracion inicial el texto entre paréntesis () solo contiene indicaciones y descripciones; no debe incluirse en la respuesta generada

        Necesito que tomes el rol de un entrenador experto y genera un plan de rutinas de ejercicios para 5 dias, es decir de lunes a viernes. La rutina debes generar un minimo de 4 ejercicios por dia como entrenador experto y en base a las limitaciones y restricciones del usuario. La respuesta que debes retornar es el JSON de formato que te proporciono y nada mas, no un resumen, ni sugerencias.
        A continuacion, te paso un ejemplo del formato en que debes de responder:
        [
            {
                day: 'Lunes', (Dia de la semana)
                group: 'Pecho y triceps', (Grupo muscular a trabajar)
                exercises:
                [ (Ejercicios a realizar)
                    {
                        set: 'Press de banca con mancuernas', (Nombre del ejercicio)
                        description: 'breve descripcion de como hacer el ejercicio', (Debes añadir una breve descripcion de como se realiza el ejercicio)
                        series: '3 series' , (Series a realizar por ejercicio, ademas añade la unidad, es decir 3 series como ejemplo)
                        reps: '10 repeticiones', (Repeticiones a realizar por cada serie, ademas añade la unidad, es decir 10 repeticiones)
                    },
                    {
                        set: 'Press de banca inclinado con barra', (Nombre del ejercicio)
                        description: 'breve descripcion de como hacer el ejercicio', (Debes añadir una breve descripcion de como se realiza el ejercicio)
                        series: '3 series' , (Series a realizar por ejercicio, ademas añade la unidad, es decir 3 series como ejemplo)
                        reps: '10 repeticiones', (Repeticiones a realizar por cada serie, ademas añade la unidad, es decir 10 repeticiones)
                    },
                ],
                cals: '10 cals', (Numero aproximado de calorias quemadas, ademas añade la unidad, es decir 15 cal por ejemplo)
                duration: '120 minutos' (Duracion aproximada de la rutina en general contando con cada ejercicio en minutos, es decir si sobrepasa una 1 hora que sea 60 minutos, 2 horas 120 minutos.)
            },
        ]
        Genera solo el JSON en formato que te proporciono, nos añadas ni agruegues cosas extra
    `);

export const routinePrompt = (userinfo: RoutineUserInfo): string => (`
        A continuacion te enviare informacion de un usuario el cual esta usando nuestra aplicacion de dietas y ejercicios, recuerda muy bien la informacion del usuario, las respuestas deben ser tal cual indican los formatos dados

        informacion del usuario : ${strucureData(userinfo)},

        con esta informacion necesito que realices lo siguiente: ${dataFormatRutine}.
        Recuerda que la respuesta debe ser en formato JSON
    `);
