import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

function PostForm() {
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;
        console.log(`title ${title} content ${content}`);

        fetch('http://localhost:3000/api/posts/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                title: title,
                content: content,
                id: localStorage.getItem("id"),
            })
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                let path = '/posts';
                navigate(path);
            })
    }

    return(
        <>
            <Navbar />
            <form action="" method="POST">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" />
                <label htmlFor="content">Content</label>
                <textarea name="content" id="content" cols="30" rows="10"></textarea>
                <input type="submit" onClick={handleSubmit}/>
            </form>
        </>

    )
}

export default PostForm;