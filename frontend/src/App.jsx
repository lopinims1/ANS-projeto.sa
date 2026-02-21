import { Routes, Route } from 'react-router-dom'
import Menu from './screens/Menu.jsx'
import Login from './screens/login.registro/Login.jsx'
import Register from './screens/login.registro/Register.jsx'
import Home from './screens/Home.jsx'
import Search from './screens/Search.jsx'
import Trending from './screens/Trending.jsx'
import Config from './screens/Config.jsx'
import Conta from './screens/Conta.jsx'
import './index.css'

function App() {
 
  return (
    <>
   
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/config" element={<Config />} />
        <Route path="/conta" element={<Conta />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      
    </>
  )
}

export default App