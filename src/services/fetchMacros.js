const url = 'http://localhost:3000/macros'

export const fetchMacros = async() => {
  const res = await fetch( url )
  const data = await res.json()

  return data
}

export const fetchMacrosByCategory = async ( category ) => {
  const urlFilter = ( category == 'todos') ? url : `${ url }/${ category }`
  const res = await fetch( urlFilter )
  const data = await res.json()

  return data
} 
