import { useState, useEffect } from 'react'
import Navbar from './navbar';


function App() {
  const [data, setData] = useState("NO MESSAGE");

  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((res) => res.json(res))
      .then((data) => setData(data.message))
  })

  return (
    <>
      <Navbar />
      <div>{data}</div>
    </>
    
  )
}

export default App
