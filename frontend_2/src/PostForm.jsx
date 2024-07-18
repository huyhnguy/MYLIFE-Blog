import Navbar from "./navbar";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';



function Tinymce({ value }) {
    const editorRef = useRef(null);

    return (
      <>
        <Editor
          id="content"
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue={ value && value }
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            selector: '#content'
          }}
        />
      </>
    );
  }

function PostForm() {
  const [pageError, setPageError] = useState(false);
  const [formErrors, setFormErrors] = useState(null);

    let navigate = useNavigate();
    const location = useLocation();
    let postIdObject = useParams();
    let postId = postIdObject.postId;
    let url = 'https://unleashed-pool-ticket.glitch.me/api/posts/' + postId;

    useEffect(() => {
      fetch("https://unleashed-pool-ticket.glitch.me/api/posts/create", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status === 403) {
              throw new Error('Forbidden. Please log in to create a post.')
          } 
        })
        .catch((e) => {
          console.log(e);
          setPageError(e.message);
        })
    }, [])

    const handleEdit = (event) => {
      event.preventDefault();

      const title = document.getElementById("title").value;
      //const content = document.getElementById("content");
      const content = tinymce.activeEditor.getContent({ format: 'text' });
      const htmlContent = tinymce.activeEditor.getContent();
      const published = document.getElementById("published").checked;

      fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            title: title,
            content: content,
            htmlContent: htmlContent,
            published: published

        })
      })
      .then(response => response.json())
      .then((data) => {
          console.log(data);
          let path = '/posts';
          navigate(path);
      })
    }

    const handleSubmit = (event) => {
      event.preventDefault();

      const title = document.getElementById("title").value;
      //const content = document.getElementById("content");
      const content = tinymce.activeEditor.getContent({ format: 'text' });
      const htmlContent = tinymce.activeEditor.getContent();
      const published = document.getElementById("published").checked;
    
      fetch('https://unleashed-pool-ticket.glitch.me/api/posts/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            title: title,
            content: content,
            htmlContent: htmlContent,
            published: published
        })
      })
        .then(response => response.json())
        .then((data) => {
            let path;
            console.log(data);
            console.log(data.published);

            if (data.errors) {
              setFormErrors(data.errors);
            }

            if (data.published) {
              path = '/posts';
              navigate(path);
            } else if (data.published === false) {
              path = '/posts/unpublished'
              navigate(path);
            }



        })
    }

    if (pageError) {
      return (
        <>
          <Navbar />
          <p>{pageError}</p>
        </>
      )
    }

    return(
        <>
            <Navbar />
            <h1 className="post-form-title">Create a Post</h1>
            {formErrors && 
                <ul>
                    {formErrors.map(error => <li className="post-error">{error.msg}</li>)}
                </ul>
            }
            <form action="" method="POST" className="post-form">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" defaultValue={location.state && location.state.data.title}/>
                <label htmlFor="content">Content</label>
                <Tinymce value={location.state && location.state.data.htmlContent}/>
                <input type="checkbox" id="published" name="published" defaultChecked={location.state && location.state.data.published}/>
                <label htmlFor="published">Publish post to the public?</label>
                <input type="submit" onClick={location.state ? handleEdit : handleSubmit} className="submit-button"/>
            </form>

        </>

    )
}

export default PostForm;