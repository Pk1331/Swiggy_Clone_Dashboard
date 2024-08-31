import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../src/vendorDashboard/pages/LandingPage'
import './app.css'
import NotFound from './vendorDashboard/components/NotFound'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' Component={LandingPage}/>
        <Route path='/*' Component={NotFound}/>
      </Routes>
    </>
  )
}

export default App