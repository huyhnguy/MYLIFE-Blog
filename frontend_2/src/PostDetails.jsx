import { useState, useEffect } from 'react'
import Navbar from './navbar'
import './index.css'
import { useParams, useLocation } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser';
import { DateTime } from 'luxon';
import TrashIcon from './assets/trash-can.svg';


function PostDetails({ published }) {
    const [data, setData] = useState(null);
    const [comments, setComments] = useState(null);

    let postIdObject = useParams();
    let postId = postIdObject.postId;
    let url = "http://localhost:3000/api/posts/" + postId;


    useEffect(() => {
        fetch(url)
          .then((res) => res.json(res))
          .then((data) => {
            setData(data);
            setComments(data.comments);
        });
    }, []);

    const handleDelete = (commentId) => {
        if (confirm("Press 'OK' to permanently delete this comment.")) {

            const url = 'http://localhost:3000/api/posts/' + postId + '/comments/' + commentId;

            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            })

            const newCommentArray = data.comments.filter((comment) => comment._id != commentId);
            setComments(newCommentArray);
        } 

    }

    if (data) {
        const commentsElements = [...comments].reverse().map((comment) => {
            const commentDateFormatted = DateTime.fromISO(comment.date).toLocaleString(DateTime.DATETIME_MED);
            return(
                <article key={comment._id} className='comment'>
                    <div className="first-row">
                        <h3>{comment.fullname}</h3>
                        <button className="trash-button" onClick={() => {handleDelete(comment._id)}}>
                            <img src={TrashIcon} alt="trash-button" className="trash-icon"/>
                        </button>
                    </div>
                    <p>{commentDateFormatted}</p>
                    <p>{comment.content}</p>
                    <hr />
                </article>
            )

        })

        const postDateFormatted = DateTime.fromISO(data.date).toLocaleString(DateTime.DATETIME_MED);

        return(
            <>
                <Navbar />
                <main>
                    {published === false && <p className="unpublished-text"><strong>Unpublished</strong></p>}
                    <h1>{data.title}</h1>
                    <div className="second-row">
                        <p><strong>By {data.user.first_name} {data.user.last_name}</strong></p>
                        <p className="date">{postDateFormatted}</p>
                    </div>

                    {ReactHtmlParser(data.htmlContent)}
                </main>
                <section>
                    <hr />
                    <h2>Comments</h2>
                    <div className='comments'>
                        {commentsElements}
                    </div>
                </section>
            </>
        )
    } else  {
        return(
            <p>Loading...</p>
        )
    }

}

export default PostDetails;