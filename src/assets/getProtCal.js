// WARN: gender prop musnt be optional
// it is only beacuse i dont have the info yet

export const getProtCal = ( age, height, weight, activity, gender ) => {

  const w = parseInt( weight, 10 )
  const h = parseInt( height,10 )
  const a = parseInt( age, 10 )

  const prote = Math.round( w * 1.5 )

  const cals = Math.round( activity * ( 10 * w + 6.25 * h - 5 * a + gender ))

  return { prote, cals }
}
