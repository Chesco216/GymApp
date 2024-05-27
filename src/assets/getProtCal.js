export const getProtCal = ( age, height, weight, activity) => {

  weight = parseInt( weight, 10 )
  height = parseInt( height,10 )
  age = parseInt( age, 10 )

  const prote = Math.round( weight * 1.5 )

  const cals = Math.round( activity * ( 10 * weight + 6.25 * height - 5 * age ))

  return { prote, cals }
}
