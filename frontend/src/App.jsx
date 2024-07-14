import { useState, useEffect } from 'react'
import Navbar from './navbar';


function App() {
  const [data, setData] = useState("NO MESSAGE");

  useEffect(() => {
    fetch("https://localhost:3000/api")
      .then((res) => res.json(res))
      .then((data) => setData(data.message))
  })

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
      
      <div>{data}</div>
    </>
    
  )
}

export default App
