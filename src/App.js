import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Events from './pages/Events'
import Login from './pages/Login'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/events' element={<Events />} />
      </Routes>
    </div>
  )
}

export default App;