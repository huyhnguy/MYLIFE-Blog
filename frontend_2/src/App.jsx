import { useState, useEffect } from 'react'
import Navbar from './navbar';


function App() {

  const handleLogout = () => {
    localStorage.clear();
  }

  return (
    <>
      <Navbar />
    </>
    
  )
}

export default App
