// src/pages/LessonsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Beautiful Cyber Loader Component
const CyberLoader = () => {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="relative">
        {/* Cyber grid background */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 gap-2 w-64 h-64">
            {Array.from({length: 64}).map((_, i) => (
              <div 
                key={i} 
                className="w-6 h-6 border border-white animate-pulse"
                style={{animationDelay: `${i * 0.1}s`}}
              />
            ))}
          </div>
        </div>
        
        {/* Main loader */}
        <div className="relative z-10 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto relative">
              <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-4 border-gray-400 border-b-transparent rounded-full animate-spin" style={{animationDirection: 'reverse'}}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2 font-mono">LOADING LESSON</h2>
            <p className="text-lg text-gray-300 mb-4">Preparing Learning Content{dots}</p>
            
            <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto">
              <div className="h-full bg-gradient-to-r from-white to-gray-400 rounded-full animate-pulse" style={{width: '75%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LessonsPage = () => {
  const { topic } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await fetch(`http://localhost:5000/ai/gemini/${topic}`);
        const json = await res.json();
        
        console.log("📩 API response:", json); // debug log
        
        if (json.error) throw new Error(json.error);
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [topic]);

  const toggleView = () => {
    setShowTips(!showTips);
  };

  if (loading) return <CyberLoader />;
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white border-2 border-red-500 rounded-2xl p-8 text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-black mb-4">Lesson Load Failed</h2>
          <p className="text-red-600 font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
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

          {/* Toggle Button */}
          <button 
            onClick={toggleView}
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 font-semibold border-2 transform hover:scale-105 ${
              showTips 
                ? "bg-white text-black border-black hover:bg-gray-100" 
                : "bg-black text-white border-black hover:bg-gray-800"
            }`}
          >
            <span className="mr-2">{showTips ? "📚" : "💡"}</span>
            {showTips ? "Show Lesson" : "Show Tips"}
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-black mb-4 font-mono capitalize">
            📚 {data.topic} LESSON
          </h1>
          <div className="w-32 h-1 bg-black mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg">
            Learn cybersecurity fundamentals and protect yourself online
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white border-2 border-black rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-black">Current Section:</span>
            <span className="font-bold text-black">
              {showTips ? "Safety Tips" : "Main Lesson"}
            </span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3">
            <div 
              className="bg-black h-3 rounded-full transition-all duration-500"
              style={{ width: showTips ? "100%" : "60%" }}
            ></div>
          </div>
        </div>

        {/* Content Area */}
        {!showTips ? (
          /* Main Lesson */
          <div className="bg-white shadow-2xl rounded-3xl p-8 border-2 border-black mb-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-black border-b-4 border-black pb-4 inline-block">
                🛡️ Understanding {data.topic}
              </h2>
            </div>
            
            <div className="bg-gray-100 p-8 rounded-2xl border-2 border-gray-300 mb-8">
              <div className="text-black leading-relaxed text-lg space-y-4">
                {data.lesson.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="text-justify">
                      {paragraph.trim()}
                    </p>
                  )
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={toggleView}
                className="px-12 py-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-bold text-lg border-2 border-black transform hover:scale-105"
              >
                View Safety Tips 💡
              </button>
            </div>
          </div>
        ) : (
          /* Safety Tips */
          <div className="bg-white shadow-2xl rounded-3xl p-8 border-2 border-black mb-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-black border-b-4 border-black pb-4 inline-block">
                💡 Safety Tips
              </h2>
              <p className="text-gray-600 mt-4">Essential practices to stay secure</p>
            </div>

            <div className="space-y-6">
              {data.tips.map((tip, index) => (
                <div key={index} className="bg-black text-white p-6 rounded-2xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-start">
                    <span className="inline-block w-8 h-8 bg-white text-black rounded-full text-lg font-bold flex items-center justify-center mr-4 flex-shrink-0">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-white font-medium text-lg leading-relaxed">
                        {tip}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={toggleView}
                className="px-12 py-4 bg-white text-black rounded-xl hover:bg-gray-100 transition-colors font-bold text-lg border-2 border-black transform hover:scale-105"
              >
                Back to Lesson 📚
              </button>
            </div>
          </div>
        )}

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-black p-6 text-center transform hover:scale-105 transition-all">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-black mb-2">Test Your Knowledge</h3>
            <p className="text-gray-600 mb-4">Ready to take the quiz?</p>
            <button 
              onClick={() => window.location.href = `/learn/${topic}/quiz`}
              className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-bold border-2 border-black"
            >
              Take Quiz
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-black p-6 text-center transform hover:scale-105 transition-all">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-xl font-bold text-black mb-2">More Topics</h3>
            <p className="text-gray-600 mb-4">Explore other security topics</p>
            <button 
              onClick={() => window.history.back()}
              className="w-full py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors font-bold border-2 border-black"
            >
              Browse Topics
            </button>
          </div>
        </div>

        {/* Progress Footer */}
        <div className="mt-12 text-center p-6 bg-black text-white rounded-2xl">
          <h3 className="text-xl font-bold mb-2">🎓 Lesson Complete!</h3>
          <p className="text-gray-300">
            You've learned about {data.topic}. Ready to test your knowledge with a quiz?
          </p>
        </div>
      </div>
    </div>
  );
};

export default LessonsPage;