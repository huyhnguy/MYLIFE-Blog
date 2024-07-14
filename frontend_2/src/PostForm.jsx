import Navbar from "./navbar";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';



function Tinymce({ value }) {
    const editorRef = useRef(null);

    /*
    const log = (e) => {
        e.preventDefault();
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };
    */
    return (
      <>
        <Editor
          id="content"
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue={ value ? value : "<p>This is the initial content of the editor.</p>" }
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
    let navigate = useNavigate();
    const location = useLocation();
    let postIdObject = useParams();
    let postId = postIdObject.postId;
    let url = 'http://localhost:3000/api/posts/' + postId;
    console.log(location.state);

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
            htmlContent: htmlContent,
            id: localStorage.getItem("id"),
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

    return(
        <>
            <Navbar />
            <form action="" method="POST">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" defaultValue={location.state && location.state.data.title}/>
                <label htmlFor="content">Content</label>
                <Tinymce value={location.state && location.state.data.htmlContent}/>
                <input type="checkbox" id="published" name="published" defaultChecked={location.state && location.state.data.published}/>
                <label htmlFor="published">Publish post to the public?</label>
                <input type="submit" onClick={location.state ? handleEdit : handleSubmit}/>
            </form>
        </>

    )
}

export default PostForm;