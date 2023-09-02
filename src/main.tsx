import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Register } from './pages/Register.tsx'
import { SignIn } from './pages/SignIn.tsx'
import './index.css'
import { Note } from './pages/notes/[id].tsx'
import { PageNotFound } from './pages/PageNotFound.tsx'
const router  = createBrowserRouter([
  {
    path: '/home',
    element: <App />
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/signin',
    element: <SignIn/>
  },
  {
    path: '/note/:id',
    element: <Note/>
  },
  {
    path: '*',
    element: <PageNotFound/>
  }
])

  ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
