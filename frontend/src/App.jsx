import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import Forgotpassword from './components/Forgotpassword'
import ProtectedRoute from './components/ProtectedRoute' 


function App() {

  return (
    <Routes>
      <Route path='/' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/forgot-password' element={<Forgotpassword/>} />
      <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>} />
    </Routes>
  )
}

export default App
