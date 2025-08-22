import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import CyberSecurityNewsPage from './pages/CyberSecurityNewsPage.jsx';
import Home from './pages/Home.jsx';


function App() {
  return (
    <div className="text-white min-h-screen" style={{ background: 'transparent' }}>
      <Routes>
        <Route path="/" element={<CyberSecurityNewsPage />} />
        <Route path="/home" element={<Home />} />
      
      </Routes>
      <div>
        hi therer 
      </div>
    </div>
  );
}

export default App
