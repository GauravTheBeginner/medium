
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import Publish from './pages/Publish'
import Landing from './pages/Landing'
import Update from './pages/Update'


function App() {
  return (
   <>
   <BrowserRouter>
        <Routes>
        <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/update" element={<Update/>} />
        </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
