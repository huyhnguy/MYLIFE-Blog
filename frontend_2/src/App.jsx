import { useState, useEffect } from 'react'
import Navbar from './navbar';


function App() {

  const handleLogout = () => {
    localStorage.clear();
  }

  return (
    <>
      <Navbar />
      { localStorage.getItem("token") ? 
        <>
          <h1>Welcome back, {localStorage.getItem("full_name")}</h1>
          <a href="/" onClick={handleLogout}>Logout</a>
        </>  : 
        <>
          <a href="/login">Log In</a>
          <a href="/signup">Sign up</a>
        </>
      }
    </>
    
  )
}

export default App
