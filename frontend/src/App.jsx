import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import CyberSecurityNewsPage from './pages/CyberSecurityNewsPage.jsx';
import Home from './pages/home/Home.jsx';
import ThreatsGuide from './pages/ThreatsGuide.jsx';
import Course from './pages/home/Course.jsx';
import Products from './pages/home/Products.jsx';
import Profile from './pages/home/Profile.jsx';
import Chatbot from './components/Chatbot.jsx'
import Navbar from './components/Navbar.jsx';
import CyberSafeLanding from './components/LandingPage.jsx';

function App() {
  return (
    <div>
       <Chatbot/>
        
        <div className="text-white min-h-screen" style={{ background: 'transparent' }}>
     
     <Routes>
        
         <Route path="/" element={<CyberSafeLanding />} />
         <Route path="/news" element={<CyberSecurityNewsPage />} />
         <Route path="/home" element={<Home />} />
         <Route path="/course" element={<Course />} />
         <Route path="/products" element={<Products />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/guide" element={<ThreatsGuide />} />
     </Routes>
   </div>
    </div>
   
    
  );
}

export default App
