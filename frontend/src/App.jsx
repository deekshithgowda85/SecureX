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
import CyberLearinig from "./components/CyberLearning.jsx"
import CyberLearningDashboard from './components/CyberLearning.jsx';
import LessonsPage from './components/Lesson.jsx';
import QuizzesPage from './components/Quiz.jsx';
function App() {
  return (
    <div>
       <Chatbot/>
        <div className="text-white min-h-screen" style={{ background: 'transparent' }}>
     
     <Routes>
     <Route path="/cyberLearning" element={<CyberLearningDashboard />} />
        <Route path="/learn/:topic/lesson" element={<LessonsPage />} />
        <Route path="/learn/:topic/quiz" element={<QuizzesPage />} />
         <Route path="/" element={<CyberSecurityNewsPage />} />
         <Route path="/quiz" element={<CyberLearinig />} />
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
