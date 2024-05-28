import { Landing } from "./Screens/Landing"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Macros } from './Screens/Macros'
import { Calculator } from './Screens/Calculator'
import { Prices } from './Screens/Prices'
import { LogIn } from "./Screens/Login"
import { SignIn } from "./Screens/Signin"
import { UserProvider } from "./context/UserProvider"
import { Profile } from "./Screens/Profile"

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/calculator' element={<Calculator/>}/>
          <Route path='/macros' element={<Macros/>}/>
          <Route path='/prices' element={<Prices/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
