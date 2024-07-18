import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PostsPage from './PostsPage.jsx'
import PostDetails from './PostDetails.jsx'
import LogInForm from './LogInForm.jsx'
import SignUpForm from './SignUpForm.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <PostsPage />
  },
  {
    path: "/posts",
    element: <PostsPage />
  },
  {
    path:"/posts/:postId",
    element: <PostDetails />
  },
  {
    path:"/login",
    element: <LogInForm />
  },
  {
    path:"/signup",
    element: <SignUpForm />
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
