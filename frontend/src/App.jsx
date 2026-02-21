import { Routes, Route } from 'react-router-dom'
import Menu from './screens/Menu.jsx'
import Login from './screens/login.registro/Login.jsx'
import Register from './screens/login.registro/Register.jsx'
import Home from './screens/Home.jsx'
import Search from './screens/Search.jsx'
import './index.css'

function App() {
 
  return (
    <>
   
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      
    </>
  )
}

export default App