import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Root.jsx'
import Home from './Home.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'

const routercreate = createBrowserRouter([{

  path: "/",
  element: <Root></Root>,
  children: [
    {
    path: "/",
    element: <Home></Home>
  },
    {
    path: "/login",
    element: <Login></Login>
  },
    {
    path: "/register",
    element: <Register></Register>
  }

]}

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routercreate }></RouterProvider>
  </React.StrictMode>,
)
