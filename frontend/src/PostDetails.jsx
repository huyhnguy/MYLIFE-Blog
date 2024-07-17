import { useState, useEffect } from 'react'
import Navbar from './navbar'
import './index.css'
import { useParams } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser';
import { DateTime } from 'luxon';

function PostDetails() {
    const [data, setData] = useState(null)
    const [commentsArray, setCommentsArray] = useState(null);
    console.log(data);

    let postIdObject = useParams();
    let postId = postIdObject.postId;
    let url = "http://localhost:3000/api/posts/" + postId;

    useEffect(() => {
        fetch(url)
          .then((res) => res.json(res))
          .then((data) => {
            setData(data)
            setCommentsArray(data.comments);
        });
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
                setCommentsArray([...commentsArray, comment])
                commentInput.value = "";
                console.log(commentInput)
            })

    }


    if (data) {
        const commentsElements = [...commentsArray].reverse().map((comment) => {
            const commentDateFormatted = DateTime.fromISO(comment.date).toLocaleString(DateTime.DATETIME_MED);

            return(
                <article key={comment._id} className='comment'>
                    <h3>{comment.fullname}</h3>
                    <p>{commentDateFormatted}</p>
                    <p>{comment.content}</p>
                    <hr />
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