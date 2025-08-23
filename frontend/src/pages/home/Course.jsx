import React, { useState } from 'react';
import NewsNavbar from '../../components/NewsNavbar';
import { BarChart3, Play, CheckCircle } from 'lucide-react';

// Use the same topics as in CyberLearning.jsx
const userCourses = [
  { 
    id: "phishing", 
    title: "Phishing", 
    desc: "Spot fake emails & links.", 
    icon: "🎣",
    difficulty: "Beginner",
    duration: "15 min",
    progress: 80,
    status: "In Progress",
    lastAccessed: "2025-08-21",
    score: null,
  },
  { 
    id: "passwords", 
    title: "Passwords", 
    desc: "Use strong & unique passwords.", 
    icon: "🔐",
    difficulty: "Beginner",
    duration: "12 min",
    progress: 100,
    status: "Completed",
    lastAccessed: "2025-08-20",
    score: 92,
  },
  { 
    id: "malware", 
    title: "Malware", 
    desc: "Viruses, ransomware & trojans.", 
    icon: "🦠",
    difficulty: "Intermediate",
    duration: "20 min",
    progress: 55,
    status: "In Progress",
    lastAccessed: "2025-08-19",
    score: null,
  },
  { 
    id: "social-engineering", 
    title: "Social Engineering", 
    desc: "Avoid manipulation tactics.", 
    icon: "🎭",
    difficulty: "Advanced",
    duration: "18 min",
    progress: 0,
    status: "Not Started",
    lastAccessed: null,
    score: null,
  },
];

const Course = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <NewsNavbar />
      <div className="w-full px-0 sm:px-0 lg:px-0 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Cyber Learning Progress</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 w-full max-w-7xl mx-auto">
          {userCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow p-8 flex flex-col justify-between h-full w-full">
              <div className="flex items-center mb-4">
                <span className="text-5xl mr-6">{course.icon}</span>
                <div>
                  <h2 className="text-2xl font-semibold text-black">{course.title}</h2>
                  <p className="text-gray-600">{course.desc}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      course.difficulty === "Beginner" ? "bg-green-100 text-green-800" :
                      course.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {course.difficulty}
                    </span>
                    <span className="text-gray-500 text-xs">⏱️ {course.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center space-x-2 w-full">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${course.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-base text-gray-700 font-medium">{course.progress}%</span>
                  {course.status === 'Completed' && (
                    <CheckCircle className="w-6 h-6 text-green-500 ml-2" />
                  )}
                </div>
                <div className="text-sm text-gray-500 w-full text-right">
                  Status: <span className="font-medium text-gray-700">{course.status}</span>
                  {course.lastAccessed && (
                    <> &middot; Last accessed: {course.lastAccessed}</>
                  )}
                  {course.score !== null && (
                    <> &middot; Score: <span className="font-semibold text-blue-600">{course.score}%</span></>
                  )}
                </div>
                <div className="flex space-x-3 mt-2">
                  <button
                    className="flex items-center px-6 py-3 bg-black text-white rounded-md font-medium text-lg hover:bg-gray-900 transition-colors"
                    onClick={() => setSelectedCourse(course.id)}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    {course.progress === 100 ? 'Review' : course.progress === 0 ? 'Start' : 'Continue'}
                  </button>
                  <button className="flex items-center px-6 py-3 bg-gray-100 text-black rounded-md font-medium text-lg hover:bg-gray-200 transition-colors">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Analytics
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Modal for course action */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-10 text-center shadow-lg">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
              <p className="text-gray-900 font-medium text-lg">Loading course...</p>
              <button
                className="mt-8 px-8 py-3 bg-black text-white rounded-md font-semibold text-lg hover:bg-gray-900"
                onClick={() => setSelectedCourse(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Course;
