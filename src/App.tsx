import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import PizzaCatalog from './pages/PizzaCatalog'

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<PizzaCatalog />} />
        </Routes>
      </Router>
  )
}

export default App
