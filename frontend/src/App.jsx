import { useState, useEffect } from 'react'


function App() {
  const [data, setData] = useState("NO MESSAGE");

  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((res) => res.json(res))
      .then((data) => setData(data.message))
  })

  return (
    <div>{data}</div>
  )
}

export default App
