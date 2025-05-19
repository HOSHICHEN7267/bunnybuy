// import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />

      {/* Dummy Contents */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to BunnyBuy!</h1>
        <p className="mt-4 text-lg text-gray-600">Your global shopping partner.</p>
        <button className="mt-6 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">
          Get Started
        </button>
      </div>

      <Footer />
    </>
  )
}

export default App
