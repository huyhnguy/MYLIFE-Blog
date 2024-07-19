import { useState, useEffect } from 'react'
import Navbar from './navbar'
import './index.css'
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';


function Post({ info, keyId }) {
    const data = info;

    let navigate = useNavigate();

    const handleClick = () => {
        const path = './' + info._id;
        navigate(path);
    };

    const handleEdit = (e) => {
        const path = './' + info._id + '/edit';
        console.log(`this is the data => ${data}`);
        navigate(path, {
            state: {data}
        });
        e.stopPropagation();
    }

    const handleError = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            return response.json(response);
        }
    }

    const snippet = data.content.substring(0,300) + '...';

    const dateFormatted = DateTime.fromISO(data.date).toLocaleString(DateTime.DATETIME_MED);

    return(
        <article className="post" key={keyId}>
            <header className="post-header">
                <div className="first-row">
                    <h1 className="post-title"><a href={'posts/' + info._id}>{data.title}</a></h1>
                </div>
                <div className='second-row'>
                    <p><strong>By {data.user.first_name} {data.user.last_name}</strong></p>
                    <p className='date'>{dateFormatted}</p>
                </div>

            </header>
            <p>{snippet}</p>
            <hr />
        </article>
    )
}

function PostsPage({published = true}) {
    const [postsArray, setPostsArray] = useState(null);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://unleashed-pool-ticket.glitch.me/api/posts", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        })
          .then((res) => handleError(res))
          .then((data) => {
            setPostsArray(data);
            setLoading(false);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });
    }, []);

    const handleError = (response) => {
        if (response.status === 403) {
            throw Error("Forbidden. Please log in to proceed.")
        } else if (!response.ok) {
            throw Error(response.statusText);
        } else {
            return response.json(response);
        }
    }

    if (loading) {
        return (
            <>
                <Navbar />
                <p>Loading... This may take a couple of seconds. Thanks for waiting!</p>
            </>
        )
    }

    if (error) {
        return (
            <>
                <Navbar />
                <p>{error.name}: {error.message}</p>
            </>
        )
    }

    if (postsArray) {
        let posts;

        if (published) {
            posts = postsArray.map((post) => {
                if (post.published) {return (
                    <>
                        <Post info={post} keyId={post._id} />
                    </>
                )}
            } )
        }

        return(
            <>
                <Navbar />
                { published ? 
                    <main className="posts">
                        <h1 className="posts-title">Posts</h1>
                        {posts}
                    </main>
                    :
                    <main className="posts unpublished">
                        <h1 className="posts-title">Unpublished Posts</h1>
                        {posts}
                    </main>
                }
            </>
        )
    } 
}

export default PostsPage