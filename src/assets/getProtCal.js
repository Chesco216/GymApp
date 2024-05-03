export const getProtCal = ( age, height, weight, activity, gender ) => {

  weight = parseInt( weight, 10 )
  height = parseInt( height,10 )
  age = parseInt( age, 10 )

  const prote = Math.round( weight * 1.8 )

  const cals = Math.round( activity * ( 10 * weight + 6.25 * height - 5 * age + gender ))
  
  console.log({ prote, cals })
  return { prote, cals }
}
