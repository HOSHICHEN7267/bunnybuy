// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import HeaderSlider from './components/HeaderSlider'

import HomePage from './pages/HomePage';
import OrderPoolPage from './pages/OrderPoolPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import AllProducts from './pages/AllProducts';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order-pool" element={<OrderPoolPage />} />
        <Route path="/order-details/:requestId" element={<OrderDetailsPage />} />
        <Route path="/all-products" element={<AllProducts />} />
      </Routes>
    </>
  )
}

export default App
