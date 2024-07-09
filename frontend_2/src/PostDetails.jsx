import { useState, useEffect } from 'react'
import Navbar from './navbar'
import './index.css'
import { useParams } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser';
import { DateTime } from 'luxon';


function PostDetails() {
    const [data, setData] = useState(null)

    let postIdObject = useParams();
    let postId = postIdObject.postId;
    let url = "http://localhost:3000/api/posts/" + postId;

    useEffect(() => {
        fetch(url)
          .then((res) => res.json(res))
          .then((data) => {
            setData(data)
        });
    }, []);

    if (data) {
        const commentsElements = [...data.comments].reverse().map((comment) => {
            const commentDateFormatted = DateTime.fromISO(comment.date).toLocaleString(DateTime.DATETIME_MED);
            return(
                <article key={comment._id} className='comment'>
                    <h3>{comment.fullname}</h3>
                    <p>{commentDateFormatted}</p>
                    <p>{comment.content}</p>
                </article>
            )

        })

        const postDateFormatted = DateTime.fromISO(data.date).toLocaleString(DateTime.DATETIME_MED);


        return(
            <>
                <Navbar />
                <main>
                    <h1>{data.title}</h1>
                    <h2>{data.user.first_name} {data.user.last_name}</h2>
                    <h2>{postDateFormatted}</h2>
                    {ReactHtmlParser(data.htmlContent)}
                </main>
                <section>
                    <h2>Comments</h2>
                    <section className='comments'>
                        {commentsElements}
                    </section>
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