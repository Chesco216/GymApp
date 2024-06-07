userData = {
    edad,
    altura,
    peso,
    restricciones,
    limitaciones,
    genero,
    meta,
}

const strucureData = ({ edad, altura, peso, restricciones, limitaciones, meta }) => {
    return (
        `
        La edad del usuario es: ${edad},
        su altura es: ${altura},
        su peso actual es: ${peso},
        el usuario  cuenta con las siguientes restricciones: ${restricciones},
        ademas cuenta con las siguientes limitaciones: ${limitaciones},
        por ultimo el usuario tiene la siguiente meta objetivo: ${meta}
    `)
}

const dataFormatDiet = () => {
    return (`
        
        Como aclaracion inicial el texto entre paréntesis () solo contiene indicaciones y descripciones; no debe incluirse en la respuesta generada

        Necesito que tomes el rol de un nutricionista experto y genera un plan de alimentacion en forma de dieta. Una comida para cada tiempo del dia: desayuno, almuerzo y cena para 5 dias, es decir de lunes a viernes. El plan de alimentacion debe ser generado en base a las limitaciones y restricciones del usuario. La respuesta que debes retornar es el JSON de formato que te proporciono y nada mas, no un resumen, ni sugerencias.
        A continuacion, te paso un ejemplo del formato en que debes de responder:
        [
            {
                day: 'Lunes', (Dia de la semana)
                time: [ (Tiempo o comida del dia)
                {
                    meal: 'Desayuno', (comida del dia)
                    nombre: 'Huevo con pan', (nombre de la comida)
                    descripcion: 'un huevo frito con pansito y tesito', (descripcion de la comida con todos su ingredientes)
                    alimentos: [ (debes indicar todos los ingredientes en particular de la comida generada con las siguientes caracteristicas presentes)
                    {
                        nombre: 'huevo',(nombre del ingrediente)
                        cantidad: '2 huevos', (cantidad de los ingredientes en la comida)
                    },
                    {
                        nombre: 'pan',(nombre del ingrediente)
                        cantidad: '2 panes',(cantidad de los ingredientes en la comida)
                    }
                    ],
                    macros: { (Informacion de macronutrientes de la comida en general)
                    prote: 10, (proteinas totales de la comida, ademas añade la unidad, es decir 10 gr por ejemplo)
                    cals: 10, (calorias totales de la comida, ademas añade la unidad, es decir 10 cal por ejemplo)
                    vitaminas: ['A', 'B', 'C', 'D'], (Vitaminas que provee la comida)
                    minerales: ['M1', 'M2', 'M3', 'M4'] (Minerales que proporciona la comida)
                    }
                },
            }
        ]
        Genera solo el JSON en formato que te proporciono, nos añadas ni agregues cosas extra
    `)
}

const dataFormatRutine = () => {
    return (`

        Como aclaracion inicial el texto entre paréntesis () solo contiene indicaciones y descripciones; no debe incluirse en la respuesta generada

        Necesito que tomes el rol de un entrenador experto y genera un plan de rutinas de ejercicios para 5 dias, es decir de lunes a viernes. La rutina debes generarla con la cantidad de ejercicios que veas viable como entrenador experto y en base a las limitaciones y restricciones del usuario. La respuesta que debes retornar es el JSON de formato que te proporciono y nada mas, no un resumen, ni sugerencias.
        A continuacion, te paso un ejemplo del formato en que debes de responder:
        [
            {
                day: 'Lunes', (Dia de la semana)
                group: 'Pecho y triceps', (Grupo muscular a trabajar)
                exercises: [ (Ejercicios a realizar)
                {
                    set: 'Press de banca con mancuernas', (Nombre del ejercicio)
                    description: 'breve descripcion de como hacer el ejercicio', (Debes añadir una breve descripcion de como se realiza el ejercicio)
                    series: 3 , (Series a realizar por ejercicio, ademas añade la unidad, es decir 3 series como ejemplo)
                    reps: 10, (Repeticiones a realizar por cada serie, ademas añade la unidad, es decir 10 repeticiones)
                },
                {
                    set: 'Press de banca inclinado con barra', (Nombre del ejercicio)
                    description: 'breve descripcion de como hacer el ejercicio', (Debes añadir una breve descripcion de como se realiza el ejercicio)
                    series: 3 , (Series a realizar por ejercicio, ademas añade la unidad, es decir 3 series como ejemplo)
                    reps: 10, (Repeticiones a realizar por cada serie, ademas añade la unidad, es decir 10 repeticiones)
                },
                {

                ],
                cals: 'aca ira un aproximado de las calorias quemadas', (Numero aproximado de calorias quemadas, ademas añade la unidad, es decir 15 cal por ejemplo)
                duration: 'aca debera ir la duracion aproximada de la rutina' (Duracion aproximada de la rutina en general contando con cada ejercicio en minutos, es decir si sobrepasa una 1 hora que sea 60 minutos, 2 horas 120 minutos.)
            },
        ]
        Genera solo el JSON en formato que te proporciono, nos añadas ni agruegues cosas extra
    `)
}

export const promtCall = () => {
    return (`
        A continuacion te enviare informacion de un usuario el cual esta usando nuestra aplicacion de dietas y ejercicios, recuerda muy bien la informacion del usuario, las respuestas deben ser tal cual indican los formatos dados

        informacion del usuario : ${strucureData()},
        
        con esta informacion necesito que realices lo siguiente: ${dataFormatDiet()} 
        y ademas de generar lo siguiente: ${dataFormatRutine()}
    `)
}

export default promtCall;
