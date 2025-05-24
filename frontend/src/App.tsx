// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import HeaderSlider from './components/HeaderSlider'

import HomePage from './pages/HomePage';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <HeaderSlider />

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
