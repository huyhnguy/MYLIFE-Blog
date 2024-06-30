import { useState, useEffect } from 'react'
import Navbar from './navbar'
import './index.css'
import { useNavigate } from 'react-router-dom';

function Post({ info }) {
    const [data, setData] = useState(info);

    let navigate = useNavigate();

    const handleClick = () => {
        let path = './' + info._id;
        navigate(path);
    };

    return(
        <article className="post" onClick={handleClick}>
            <h1>{data.title}</h1>
            <h2>{data.user.first_name} {data.user.last_name}</h2>
            <h2>{data.date}</h2>
            <p>{data.content}</p>
        </article>
    )
}

function PostsPage() {
    const [postsArray, setPostsArray] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3000/api/posts")
          .then((res) => res.json(res))
          .then((data) => setPostsArray(data))
      }, []);


    if (postsArray != null) {
        const posts = postsArray.map(post => <Post info={post} key={post._id}/>)

        return(
            <>
                <Navbar />
                <main className="posts">{posts}</main>
            </>
        )
    } else {
        return(
            <>
                <Navbar />
                <p>No posts</p>
            </>
        )
    }

}

export default PostsPage