// src/pages/CyberLearningDashboard.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookOpen } from "lucide-react"; // Add this icon import
import Footer from "./Footer";

const topics = [
  { 
    id: "phishing", 
    title: "Phishing", 
    desc: "Spot fake emails & links.", 
    icon: "🎣",
    difficulty: "Beginner",
    duration: "15 min"
  },
  { 
    id: "passwords", 
    title: "Passwords", 
    desc: "Use strong & unique passwords.", 
    icon: "🔐",
    difficulty: "Beginner",
    duration: "12 min"
  },
  { 
    id: "malware", 
    title: "Malware", 
    desc: "Viruses, ransomware & trojans.", 
    icon: "🦠",
    difficulty: "Intermediate",
    duration: "20 min"
  },
  { 
    id: "social-engineering", 
    title: "Social Engineering", 
    desc: "Avoid manipulation tactics.", 
    icon: "🎭",
    difficulty: "Advanced",
    duration: "18 min"
  },
];

const CyberLearningDashboard = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  const toggleView = () => {
    setViewMode(prev => prev === "grid" ? "list" : "grid");
  };

  const GridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className="bg-white shadow-2xl rounded-3xl p-8 border-2 border-black hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
        >
          {/* Topic Icon & Header */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{topic.icon}</div>
            <h2 className="text-3xl font-bold text-black mb-2">{topic.title}</h2>
            <p className="text-gray-600 text-lg">{topic.desc}</p>
          </div>

          {/* Topic Info */}
          <div className="flex justify-between items-center mb-6 text-sm">
            <span className={`px-3 py-1 rounded-full font-semibold ${
              topic.difficulty === "Beginner" ? "bg-green-100 text-green-800" :
              topic.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
              "bg-red-100 text-red-800"
            }`}>
              {topic.difficulty}
            </span>
            <span className="text-gray-500 font-medium">⏱️ {topic.duration}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate(`/learn/${topic.id}/lesson`)}
              className="flex-1 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-bold border-2 border-black transform hover:scale-105"
            >
              📚 Lesson
            </button>
            <button
              onClick={() => navigate(`/learn/${topic.id}/quiz`)}
              className="flex-1 py-3 bg-white text-black rounded-xl hover:bg-gray-100 transition-colors font-bold border-2 border-black transform hover:scale-105"
            >
              🎯 Quiz
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-6">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className="bg-white shadow-xl rounded-2xl p-6 border-2 border-black hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center space-x-6">
              <div className="text-4xl">{topic.icon}</div>
              <div>
                <h3 className="text-2xl font-bold text-black">{topic.title}</h3>
                <p className="text-gray-600 text-lg">{topic.desc}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    topic.difficulty === "Beginner" ? "bg-green-100 text-green-800" :
                    topic.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {topic.difficulty}
                  </span>
                  <span className="text-gray-500 text-sm">⏱️ {topic.duration}</span>
                </div>
              </div>
            </div>

            {/* Right Section - Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/learn/${topic.id}/lesson`)}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-bold border-2 border-black"
              >
                📚 Lesson
              </button>
              <button
                onClick={() => navigate(`/learn/${topic.id}/quiz`)}
                className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors font-bold border-2 border-black"
              >
                🎯 Quiz
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-8">
          {/* Back Button */}
          <button 
            onClick={() => window.history.back()}
            className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-semibold border-2 border-black transform hover:scale-105"
          >
            <span className="mr-2">←</span>
            Back
          </button>

          {/* View Toggle and Course Link */}
          <div className="flex items-center gap-4">
            <Link
              to="/course"
              className="flex items-center px-6 py-3 bg-white text-black rounded-lg hover:bg-cyan-100 transition-all duration-300 font-semibold border-2 border-black transform hover:scale-105"
              title="Go to Course Progress"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Course Progress
            </Link>
            <button 
              onClick={toggleView}
              className="flex items-center px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold border-2 border-black transform hover:scale-105"
            >
              <span className="mr-2">{viewMode === "grid" ? "📋" : "⊞"}</span>
              {viewMode === "grid" ? "List View" : "Grid View"}
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-black mb-4 font-mono">
            CYBER SAFETY LEARNING
          </h1>
          <p className="text-2xl text-gray-700 mb-4">Master Cybersecurity Fundamentals</p>
          <div className="w-32 h-1 bg-black mx-auto rounded-full"></div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border-2 border-black text-center transform hover:scale-105 transition-all">
            <div className="text-3xl font-bold text-black">{topics.length}</div>
            <div className="text-gray-600">Topics Available</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border-2 border-black text-center transform hover:scale-105 transition-all">
            <div className="text-3xl font-bold text-black">∞</div>
            <div className="text-gray-600">Practice Quizzes</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border-2 border-black text-center transform hover:scale-105 transition-all">
            <div className="text-3xl font-bold text-black">24/7</div>
            <div className="text-gray-600">Learning Access</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border-2 border-black text-center transform hover:scale-105 transition-all">
            <div className="text-3xl font-bold text-black">🔒</div>
            <div className="text-gray-600">Secure Learning</div>
          </div>
        </div>

        {/* Content Area */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-black">
              {viewMode === "grid" ? "🎯 Choose Your Topic" : "📋 All Topics"}
            </h2>
            <div className="text-gray-600 font-medium">
              {viewMode === "grid" ? "Grid View" : "List View"} • {topics.length} topics
            </div>
          </div>
          
          {viewMode === "grid" ? <GridView /> : <ListView />}
        </div>

        {/* Footer */}
      <Footer/>
      </div>
    </div>
  );
};

export default CyberLearningDashboard;