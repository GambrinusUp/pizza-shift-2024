import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PizzaCatalog from './pages/PizzaCatalog'
import Navbar from './components/Navbar'

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
