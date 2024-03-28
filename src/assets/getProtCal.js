// WARN: gender prop musnt be optional
// it is only beacuse i dont have the info yet

export const getProtCal = ({ age, height, weight, activity, gender }) => {

  const prote = Math.round( weight * 1.5 )

  const cals = Math.round( activity * ( 10 * weight + 6.25 * height - 5 * age ))

  return { prote, cals }
}
