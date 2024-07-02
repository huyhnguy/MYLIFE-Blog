import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PostsPage from './PostsPage.jsx'
import PostDetails from './PostDetails.jsx'
import LogInForm from './LogInForm.jsx'

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
    path:"/posts/:postId",
    element: <PostDetails />
  },
  {
    path:"/users/login",
    element: <LogInForm />
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
