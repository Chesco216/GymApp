export const fetchMacros = async() => {
  const res = await fetch('https://foodmacros.onrender.com/macros')
  const data = await res.json()

  return data
}
