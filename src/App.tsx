import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Authorization from './pages/AuthorizationPage/Authorization'
import CardDetails from './pages/CardDetailsPage/CardDetails'
import Cart from './pages/CartPage/Cart'
import OrderInfo from './pages/OrderInfoPage/OrderInfo'
import Orders from './pages/OrdersPage/Orders'
import PersonalDetails from './pages/PersonalDetailsPage/PersonalDetails'
import PizzaCatalog from './pages/PizzaCatalogPage/PizzaCatalog'
import Profile from './pages/ProfilePage/Profile'

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
