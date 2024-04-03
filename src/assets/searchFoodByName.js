import { fetchMacros } from "./fetchMacros"

export const searchFoodByName = async ( name ) => {
  const data = await fetchMacros()
  const dataFiltered = await data.filter( item => item.nombre == name )
  const retVal = ( dataFiltered.length === 0 ) ? data : dataFiltered
  const found = ( dataFiltered.length === 0 ) ? false : true 

  return { retVal, found }
}
