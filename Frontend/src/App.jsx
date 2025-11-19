import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Auth from './pages/Auth.jsx'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import RightSidebar from './components/RightSidebar.jsx'
import MyLibrary from './pages/MyLibrary.jsx'
import UserDashboard from './pages/UserDashboard.jsx'
import Message from './pages/Mesasge.jsx'
import Friend from './pages/Friend.jsx'
import Admin from './pages/Admin.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth/>} />
        <Route path='/nav' element={<Navbar/>} />
        <Route path='/right' element={<RightSidebar/>} />
        <Route path='/sidebar' element={<Sidebar/>} />
        <Route path='/user' element={<UserDashboard/>} />
        <Route path='/friend' element={<Friend/>} />
        <Route path='/message' element={<Message/>} />
        <Route path='/library' element={<MyLibrary/>} />
        <Route path='/admin' element={<Admin/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
