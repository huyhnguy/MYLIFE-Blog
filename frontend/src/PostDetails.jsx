import { useState, useEffect } from 'react'
import Navbar from './navbar'
import './index.css'
import { useParams } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser';
import { DateTime } from 'luxon';

function PostDetails() {
    const [errorMessage, setErrorMessage] = useState(null)
    const [data, setData] = useState(null)
    const [comments, setComments] = useState(null);
    const [loading, setLoading] = useState(true);

    let postIdObject = useParams();
    let postId = postIdObject.postId;
    let url = "https://unleashed-pool-ticket.glitch.me/api/posts/" + postId;

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        })
          .then((res) => {
            if (res.status === 403) {
                throw new Error('Forbidden. Please log in to see the post.')
            } else {
                return res.json();
            }
          })
          .then((data) => {
            setData(data);
            setComments(data.comments);
            setLoading(false)
          })
          .catch((e) => {
            console.log(e);
            setErrorMessage(e.message);
            setLoading(false);
          })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const commentInput = document.getElementById("comment")

        let commentUrl = url + "/comments/create"
        
        fetch(commentUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                comment: commentInput.value,
            })
        })
            .then(res => res.json())
            .then((comment) => {
                setComments([...comments, comment])
                commentInput.value = "";
            })

    }

    if (loading) {
        return(
            <>
                <Navbar />
                <p>Loading...</p>
            </>
        )
    }

    if (errorMessage) {
        return(
            <>
                <Navbar />
                <p>{errorMessage}</p>
            </>
        )
    }


    if (data) {
        const commentsElements = [...comments].reverse().map((comment) => {
            const commentDateFormatted = DateTime.fromISO(comment.date).toLocaleString(DateTime.DATETIME_MED);

            return(
                <article key={comment._id} className='comment'>
                    <h3>{comment.fullname}</h3>
                    <p>{commentDateFormatted}</p>
                    <p>{comment.content}</p>
                </article>
            )

    })

    const dateFormatted = DateTime.fromISO(data.date).toLocaleString(DateTime.DATETIME_MED);

        return(
            <>
                <Navbar />
                <main>
                    <h1>{data.title}</h1>
                    <div className="second-row">
                        <p><strong>By {data.user.first_name} {data.user.last_name}</strong></p>
                        <p className="date">{dateFormatted}</p>
                    </div>
                    {ReactHtmlParser(data.htmlContent)}
                </main>
                <section>
                    <hr />
                    <h2>Comments</h2>
                    <form action="" method="POST" className="comment-form">
                        <input type="text" placeholder="Add a comment..." id="comment" name="comment" className='comment-input'/>
                        <input type="submit" value="Comment" onClick={handleSubmit} />
                    </form>
                    <div className='comments'>
                        {commentsElements}
                    </div>
                </section>
            </>
        )
    } else  {
        return(
            <p>No data</p>
        )
    }

}

export default PostDetails;