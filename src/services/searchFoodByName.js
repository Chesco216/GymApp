import { GoogleGenerativeAI } from '@google/generative-ai'
import { fetchMacros } from "./fetchMacros"

// WARN: maybe this is not the best way but it should work
//
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

const searchEngine = async ( name ) => {
  const data = await fetchMacros()
  const names = [] 
  data.map( item => {
    names.push( item.nombre )
  })

  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
  const prompt = `si te digo ${ name } con cual de los siguientes alimentos los asocias? ${ names.join(', ')}, si no lo asocias con ninguno solo retorname ninguno`

  const result = await model.generateContent(prompt)
  const response = result.response
  const text = response.text()
  
  return text.toLowerCase()
}

export const searchFoodByName = async ( name ) => {
  const nombre = await searchEngine( name )
  const data = await fetchMacros()
  const dataFiltered = await data.filter( item => item.nombre == nombre )
  const retVal = ( dataFiltered.length === 0 ) ? data : dataFiltered
  const found = ( dataFiltered.length === 0 ) ? false : true 

  return { retVal, found }

}
