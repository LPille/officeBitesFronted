import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Toaster } from 'react-hot-toast'
import 'animate.css';


function App() {

  return (
    
    <BrowserRouter>
      <Toaster position="bottom-center" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
