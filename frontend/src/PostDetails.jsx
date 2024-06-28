import { useState, useEffect } from 'react'
import Navbar from './navbar'
import './index.css'
import { useParams } from 'react-router-dom'

function PostDetails() {
    const [data, setData] = useState(null)
    let postIdObject = useParams();
    let postId = postIdObject.postId;
    let url = "http://localhost:3000/api/posts/" + postId;

    useEffect(() => {
        fetch(url)
          .then((res) => res.json(res))
          .then((data) => setData(data));
      })

    
    if (data) {
        return(
            <>
                <Navbar />
                <h1>{data.title}</h1>
                <h2>{data.user.first_name} {data.user.last_name}</h2>
                <h2>{data.date}</h2>
                <p>{data.content}</p>
            </>
        )
    } else  {
        return(
            <p>No data</p>
        )
    }

}

export default PostDetails;