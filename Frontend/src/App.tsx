import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/singup'
import { Signin } from './pages/singin'
import { Blog } from './pages/blog'
import { Blogs } from './pages/blogs'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element=  {< Signup />}></Route>
      <Route path='/signin' element=  {< Signin />}></Route>
      <Route path='/blog/:id' element=  {< Blog />}></Route>
      <Route path='/blogs' element=  {< Blogs />}></Route>
      
      ha bhi 
    </Routes>
    </BrowserRouter>
  )
}

export default App
