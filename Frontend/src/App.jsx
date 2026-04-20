import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Otp from './components/Otp.jsx'
import PasswordReset from './pages/PasswordReset.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import VerifyEmail from './pages/VerifyEmail.jsx'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/otp' element={<Otp/>} />
        <Route path='/password-reset' element={<PasswordReset/>} />
        <Route path='/register/verify-email' element={<VerifyEmail/>} />
      </Routes>
    </div>
  )
}

export default App

