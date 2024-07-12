import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Authorization from './pages/Authorization'
import CardDetails from './pages/CardDetails'
import Cart from './pages/Cart'
import OrderInfo from './pages/OrderInfo'
import Orders from './pages/Orders'
import PersonalDetails from './pages/PersonalDetails'
import PizzaCatalog from './pages/PizzaCatalog'
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<PizzaCatalog />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/details' element={<PersonalDetails />} />
          <Route path='/payment' element={<CardDetails />} />
          <Route path='/authorization' element={<Authorization />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/orders' element={<Orders />} />
          <Route path="/orders/:id" element={<OrderInfo />} />
        </Routes>
      </Router>
  )
}

export default App
