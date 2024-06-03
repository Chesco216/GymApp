userData = {
    edad,
    altura,
    peso,
    restricciones,
    limitaciones,
    genero,
    meta,
}

let ban;

const strucureData = ({ edad, altura, peso, restricciones, limitaciones, meta }) => {
    return (
        `
        La edad del usuario es ${edad},
        su altura es ${altura},
        su peso actual es ${peso},
        el usuario  cuenta con las siguientes restricciones ${restricciones},
        ademas cuenta con las siguientes limitaciones ${limitaciones},
        por ultimo el usuario tiene la siguiente meta objetivo ${meta}
    `)
}

const dataFormatDiet = () => {
    return (`
        genera un plan de alimentacion en forma de dieta bajo el siguiente formato una comida para desayuno, almuerzo y cena para 5 dias, es decir de lunes a viernes. El plan de alimentacion debe ser generado en base a las limitaciones y restricciones del usuario. La respuesta no debe ser muy extensa
        [
            {
                titulo o nombre de la comida,
                descripcion de la comida (especificando ingredientes),
                macronutrientes de la comida en total: 
                    proteinas,
                    vitaminas,
                    calorias,
            }
        ]
    `)
}

const dataFormatRutine = () => {
    return(`
        genera un plan de rutinas de ejercicios siguiendo las limitaciones y restricciones del usuario para 5 dias de la semana, es decir de lunes a viernes. La respuesta no debe ser muy extensa
        [
            {
                titulo o nombre del ejercicio,
                descripcion del ejercicio (especificando los pasos a realizar),
                tiempo,
                series,
                repeticiones,
                calorias quemadas por ejercicio,
            }
        ]
    `)
}

export const promtCall = () => {
    return (`
        A continuacion te enviare informacion de un usuario el cual esta usando nuestra aplicacion de dietas y ejercicios, recuerda muy bien la informacion del usuario, las respuestas no deben ser muy extensas.

        informacion del usuario = ${strucureData()},
        
        con esta informacion necesito que realices lo siguiente ${dataFormatDiet()} 
        y ademas de generar lo siguiente ${dataFormatRutine()}
        Cumple estrictamente los formatos y las restricciones/limitaciones del usuario.
    `)
}

export default promtCall;
