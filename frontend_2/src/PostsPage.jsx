import { useState, useEffect } from 'react'
import Navbar from './navbar'
import './index.css'
import { useNavigate } from 'react-router-dom';
import EditIcon from './assets/pencil.svg'
import { DateTime } from 'luxon';


function Post({ info, published = true }) {
    const data = info;

    let navigate = useNavigate();

    const handleClick = () => {
        let path = './' + info._id;
        navigate(path);
    };

    const snippet = data.content.substring(0,300) + '...';

    const dateFormatted = DateTime.fromISO(data.date).toLocaleString(DateTime.DATETIME_MED);

    return(
        <article className="post" onClick={handleClick}>
            {published === false && <p className="unpublished-text"><strong>unpublished</strong></p>}
            <header className="post-header">
                <div className="first-row">
                    <h1>{data.title}</h1>
                    <img src={EditIcon} alt="edit-button" className="edit-button"/>
                </div>
                <div className='second-row'>
                    <h2>{data.user.first_name} {data.user.last_name}</h2>
                    <h2>{dateFormatted}</h2>
                </div>

            </header>
            <p>{snippet}</p>
        </article>
    )
}

function PostsPage({published = true}) {
    const [postsArray, setPostsArray] = useState(null);
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3000/api/posts", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        })
          .then((res) => handleError(res))
          .then((data) => setPostsArray(data))
          .catch((error) => {setError(error)});
    }, []);

    const handleError = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            return response.json(response);
        }
    }

    if (postsArray) {
        let posts;

        if (published) {
            posts = postsArray.map((post) => {
                if (post.published) {return (<Post info={post} key={post._id}/>)}
            } )
        } else {
            posts = postsArray.map((post) => {
                if (!post.published) {return (<Post info={post} key={post._id} published={false}/>)}
            } )
        }


        return(
            <>
                <Navbar />
                <main className="posts">
                    {posts}
                </main>
            </>
        )
    } else {
        return(
            <>
                <Navbar />
                {error ? <p>{error.name}: {error.message}</p> : <p>Loading...</p>}
            </>
        )

    }

}

export default PostsPage