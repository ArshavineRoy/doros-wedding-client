import React from 'react'
import RegistrationForm from './ui/Components/RegistrationForm'
import LoginForm from './ui/Components/LoginForm'
import {Routes,Route} from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/register' element={<RegistrationForm />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </div>
  )
}

export default App