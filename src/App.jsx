import { Landing } from "./Screens/Landing"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Macros } from './Screens/Macros'
import { Calculator } from './Screens/Calculator'
import { Prices } from './Screens/Prices'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/calculator' element={<Calculator/>}/>
        <Route path='/macros' element={<Macros/>}/>
        <Route path='/prices' element={<Prices/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
