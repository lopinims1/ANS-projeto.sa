import { Routes, Route } from 'react-router-dom'
import Menu from './screens/Menu.jsx'
import './index.css'

function App() {
 
  return (
    <>
   
      <Routes>
        <Route path="/" element={<Menu />} />
      </Routes>

    </>
  )
}

export default App