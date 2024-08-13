import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/singup'
import { Signin } from './pages/singin'
import { Blog } from './pages/blog'
import { Blogs } from './pages/blogs'
import { Publish } from './pages/Publish'
function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Navigate to= '/signup' />} />
      <Route path='/signup' element=  {< Signup />}></Route>
      <Route path='/signin' element=  {< Signin />}></Route>
      <Route path='/blog/:id' element=  {< Blog />}></Route>
      <Route path='/blogs' element=  {< Blogs />}></Route>
      <Route path='/publish' element=  {<Publish/>}></Route>

      ha bhi 
    </Routes>
    </BrowserRouter>
  )
}

export default App
