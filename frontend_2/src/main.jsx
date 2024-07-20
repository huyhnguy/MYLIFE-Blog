import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PostsPage from './PostsPage.jsx'
import PostDetails from './PostDetails.jsx'
import LogInForm from './LogInForm.jsx'
import SignUpForm from './SignUpForm.jsx'
import PostForm from './PostForm.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/posts",
    element: <PostsPage />
  },
  {
    path: "/posts/unpublished",
    element: <PostsPage published={false} />
  },
  {
    path: "/posts/unpublished/:postId",
    element: <PostDetails published={false} />
  },
  {
    path:"/posts/:postId",
    element: <PostDetails />
  },
  {
    path:"/posts/:postId/edit",
    element: <PostForm />
  },
  {
    path:"/posts/unpublished/:postId/edit",
    element: <PostForm />
  },
  {
    path:"/login",
    element: <LogInForm />
  },
  {
    path:"/signup",
    element: <SignUpForm />
  },
  {
    path:"/posts/create",
    element: <PostForm />
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
