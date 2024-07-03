import { useState, useEffect } from 'react'
import Navbar from './navbar'
import './index.css'
import { useParams } from 'react-router-dom'

function PostDetails() {
    const [data, setData] = useState(null)
    const [commentsArray, setCommentsArray] = useState(null);

    let postIdObject = useParams();
    let postId = postIdObject.postId;
    let url = "http://localhost:3000/api/posts/" + postId;

    useEffect(() => {
        fetch(url)
          .then((res) => res.json(res))
          .then((data) => {
            setData(data)
            setCommentsArray(data.comments);
            console.log(data);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const comment = document.getElementById("comment").value;
        console.log(comment);

        let commentUrl = url + "/comments/create"

        const userId = localStorage.getItem("id");
        
        fetch(commentUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment: comment,
                userId: userId,
            })
        })
            .then(res => res.json())
            .then(comment => setCommentsArray([...commentsArray, comment]))

    }


    if (data) {
        const commentsElements = commentsArray.map(comment => <article key={comment._id}>{comment.content}</article>)

        return(
            <>
                <Navbar />
                <main>
                    <h1>{data.title}</h1>
                    <h2>{data.user.first_name} {data.user.last_name}</h2>
                    <h2>{data.date}</h2>
                    <p>{data.content}</p>
                </main>
                <section>
                    <h2>Comments</h2>
                    <form action="" method="POST" className="comment-form">
                        <input type="text" placeholder="Add a comment..." id="comment" name="comment" className='comment-input'/>
                        <input type="submit" value="Comment" onClick={handleSubmit} />
                    </form>
                    {commentsElements}
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