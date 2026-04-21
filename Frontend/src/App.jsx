import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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
import Navbar from './components/Navbar.jsx'
import { useAppContext } from './Context/AppContext.jsx'

const App = () => {

  const {userData, navigate} = useAppContext();

  console.log(userData);

  return (
    <div>
      <ToastContainer/>
      {userData && <Navbar/>}
      <Routes>
        <Route path='/' element={userData ? <Home/> : <Navigate to="/login" />} />
        <Route path='/about' element={userData ? <About/> : <Navigate to="/login" />} />
        <Route path='/contact' element={userData ? <Contact/> : <Navigate to="/login" />} />

        <Route path='/login' element={!userData ? <Login/> : <Navigate to="/" />} />
        <Route path='/register' element={!userData ? <Register/> : <Navigate to="/" />} />
        <Route path='/otp' element={!userData ? <Otp/> : <Navigate to="/" />} />
        <Route path='/password-reset' element={!userData ? <PasswordReset/> : <Navigate to="/" />} />
        <Route path='/register/verify-email' element={!userData ? <VerifyEmail/> : <Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App

