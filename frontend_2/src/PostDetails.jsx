import { useState, useEffect } from 'react'
import Navbar from './navbar'
import './index.css'
import { useParams } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser';


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
        const commentsElements = [...data.comments].reverse().map(comment => 
            <article key={comment._id} className='comment'>
                <h3>{comment.fullname}</h3>
                <p>{comment.date}</p>
                <p>{comment.content}</p>
            </article>)

        return(
            <>
                <Navbar />
                <main>
                    <h1>{data.title}</h1>
                    <h2>{data.user.first_name} {data.user.last_name}</h2>
                    <h2>{data.date}</h2>
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