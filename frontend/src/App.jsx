import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home'
import './index.css';
import LandingPage from './components/LandingPage';
import LocationPage from './components/LocationPage';
import EmergencyContacts from './components/EmergencyContacts';
import Header from './components/Header';
const App = () => {
  return (

    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/emergency-contacts" element={<><Header /><EmergencyContacts /></>} />
      <Route path='/home' element={<><Header /><Home /></>} />
      <Route path="/location" element={<><Header /><LocationPage /></>} />
    </Routes>

  )
}

export default App
