import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useUser } from '@clerk/clerk-react';
import { useClerk } from '@clerk/clerk-react';
import { BarChart3, Play, CheckCircle, TrendingUp, Award, Clock, Target, ChevronRight, User, Shield, BookOpen, Activity, Settings, Bell, LogOut, Home } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import {Link} from "react-router-dom"
import Footer from '../../components/Footer';
const userCourses = [
  { 
    id: "phishing", 
    title: "Phishing", 
    desc: "Spot fake emails & links.", 
    icon: "🎣",
    difficulty: "Beginner",
    duration: "15 min",
  },
  { 
    id: "passwords", 
    title: "Passwords", 
    desc: "Use strong & unique passwords.", 
    icon: "🔐",
    difficulty: "Beginner",
    duration: "12 min",
  },
  { 
    id: "malware", 
    title: "Malware", 
    desc: "Viruses, ransomware & trojans.", 
    icon: "🦠",
    difficulty: "Intermediate",
    duration: "20 min",
  },
  { 
    id: "social-engineering", 
    title: "Social Engineering", 
    desc: "Avoid manipulation tactics.", 
    icon: "🎭",
    difficulty: "Advanced",
    duration: "18 min",
  },
];

const Course= () => {
  const [selectedView, setSelectedView] = useState('overview'); // 'overview', 'analytics', 'courses'
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { signOut } = useClerk();
  const { isLoaded, isSignedIn, user } = useUser();
  const quizData = useSelector(state => state.quiz) || { history: [] };

  // Process quiz data
  const chartData = quizData.history ? quizData.history.map(quiz => ({
    topic: quiz.topic.charAt(0).toUpperCase() + quiz.topic.slice(1).replace('-', ' '),
    score: quiz.total > 0 ? Math.round((quiz.score / quiz.total) * 100) : 0,
    total: quiz.total || 0,
    correct: quiz.score || 0,
    incorrect: (quiz.total || 0) - (quiz.score || 0),
    date: new Date(quiz.timestamp).toLocaleDateString(),
    answers: quiz.answers || {}
  })) : [];

  const pieData = chartData.length > 0 ? [
    { name: 'Correct', value: chartData.reduce((acc, cur) => acc + cur.correct, 0), color: '#000000' },
    { name: 'Incorrect', value: chartData.reduce((acc, cur) => acc + cur.incorrect, 0), color: '#666666' }
  ] : [
    { name: 'No Data', value: 1, color: '#E5E7EB' }
  ];

  const overallStats = {
    totalQuizzes: chartData.length,
    averageScore: chartData.length > 0 ? Math.round(chartData.reduce((acc, cur) => acc + cur.score, 0) / chartData.length) : 0,
    totalQuestions: chartData.reduce((acc, cur) => acc + cur.total, 0),
    correctAnswers: chartData.reduce((acc, cur) => acc + cur.correct, 0)
  };

  const coursesWithProgress = userCourses.map(course => {
    const quizResult = chartData.find(quiz => quiz.topic.toLowerCase().replace(' ', '-') === course.id);
    return {
      ...course,
      progress: quizResult ? quizResult.score : 0,
      status: quizResult ? (quizResult.score >= 70 ? 'Completed' : 'Needs Improvement') : 'Not Started',
      lastAccessed: quizResult ? quizResult.date : null,
      score: quizResult ? quizResult.score : null,
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black text-white p-3 rounded-lg shadow-lg">
          <p className="font-semibold">{`Topic: ${label}`}</p>
          <p className="text-gray-300">{`Score: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  const Sidebar = () => (
    <div className="w-64 bg-white border-r border-gray-300 min-h-screen p-6 relative">
      {/* User Profile Section */}
      {isLoaded && isSignedIn && user && (
        <div className="border-b border-gray-300 pb-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            {user.imageUrl ? (
              <img src={user.imageUrl} alt="User avatar" className="w-12 h-12 rounded-full border-2 border-gray-300" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-6 h-6 text-black" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-black text-sm">
                {user.fullName || user.username || 'User'}
              </h3>
              <p className="text-gray-600 text-xs">{user.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="space-y-2">
        <button
          onClick={() => setSelectedView('overview')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
            selectedView === 'overview' 
              ? 'bg-gray-200 text-black border-l-4 border-black' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Activity className="w-5 h-5" />
          <span className="font-medium">Overview</span>
        </button>
        
        <button
          onClick={() => setSelectedView('analytics')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
            selectedView === 'analytics' 
              ? 'bg-gray-200 text-black border-l-4 border-black' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="font-medium">Analytics</span>
        </button>
        
        <button
          onClick={() => setSelectedView('courses')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
            selectedView === 'courses' 
              ? 'bg-gray-200 text-black border-l-4 border-black' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="font-medium">Courses</span>
        </button>

        <button
          onClick={() => setSelectedView('profile')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
            selectedView === 'profile' 
              ? 'bg-gray-200 text-black border-l-4 border-black' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="font-medium">Profile</span>
        </button>
      </nav>

      {/* Bottom Actions */}
      <div className="absolute bottom-6 left-6 right-6 space-y-1">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">Settings</span>
        </button>
        <button 
          onClick={() => signOut(() => window.location.href = '/')}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );

  const OverviewView = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-black to-gray-800 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">
          Welcome back{user?.fullName ? `, ${user.fullName.split(' ')[0]}` : ''}! 👋
        </h2>
        <p className="text-gray-300 text-lg mb-6">Ready to enhance your cybersecurity knowledge?</p>
        <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
         <Link  to="/cyberLearning">
         Continue Learning
         </Link>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-black shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Quizzes</p>
              <p className="text-3xl font-bold text-black">{overallStats.totalQuizzes}</p>
            </div>
            <div className="p-3 bg-gray-200 rounded-full">
              <Target className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-black shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Average Score</p>
              <p className="text-3xl font-bold text-black">{overallStats.averageScore}%</p>
            </div>
            <div className="p-3 bg-gray-200 rounded-full">
              <TrendingUp className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-black shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Correct Answers</p>
              <p className="text-3xl font-bold text-black">{overallStats.correctAnswers}</p>
            </div>
            <div className="p-3 bg-gray-200 rounded-full">
              <CheckCircle className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-black shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Questions</p>
              <p className="text-3xl font-bold text-black">{overallStats.totalQuestions}</p>
            </div>
            <div className="p-3 bg-gray-200 rounded-full">
              <Award className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-8 border-2 border-black shadow-sm">
        <h3 className="text-xl font-bold text-black mb-6">Recent Quiz Results</h3>
        {chartData.length > 0 ? (
          <div className="space-y-4">
            {[...chartData].reverse().slice(0, 5).map((quiz, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold">
                    {quiz.topic.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">{quiz.topic}</h4>
                    <p className="text-gray-600 text-sm">{quiz.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${quiz.score >= 70 ? 'text-black' : quiz.score >= 50 ? 'text-gray-600' : 'text-gray-400'}`}>
                    {quiz.score}%
                  </div>
                  <div className="text-sm text-gray-600">{quiz.correct}/{quiz.total} correct</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h4 className="text-xl font-semibold text-gray-600 mb-2">No Quiz Data Available</h4>
            <p className="text-gray-500">Take your first quiz to see results here!</p>
          </div>
        )}
      </div>
    </div>
  );

  const AnalyticsView = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-black">Learning Analytics</h2>
      
      {chartData.length > 0 ? (
        <>
          <div className="bg-white rounded-2xl p-8 border-2 border-black shadow-sm">
            <h3 className="text-xl font-bold text-black mb-6">Score Trends by Topic</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                  <XAxis dataKey="topic" stroke="#374151" />
                  <YAxis stroke="#374151" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="score" fill="#000000" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-black shadow-sm">
              <h3 className="text-xl font-bold text-black mb-6">Answer Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                  <span className="text-gray-700">Correct ({pieData[0].value})</span>
                </div>
                {pieData.length > 1 && (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                    <span className="text-gray-700">Incorrect ({pieData[1].value})</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-black shadow-sm">
              <h3 className="text-xl font-bold text-black mb-6">Progress Timeline</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                    <XAxis dataKey="topic" stroke="#374151" />
                    <YAxis stroke="#374151" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#000000" 
                      fill="#000000"
                      fillOpacity={0.1}
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl p-12 border-2 border-black shadow-sm text-center">
          <div className="text-6xl mb-6">📊</div>
          <h3 className="text-2xl font-bold text-gray-600 mb-4">No Analytics Data</h3>
          <p className="text-gray-500 text-lg mb-6">Take some quizzes to generate analytics and insights!</p>
          <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold">
            Start Taking Quizzes
          </button>
        </div>
      )}
    </div>
  );

  const CoursesView = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-black">Learning Courses</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {coursesWithProgress.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl shadow-sm p-8 border-2 border-black hover:shadow-md transition-shadow">
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-6">{course.icon}</span>
              <div>
                <h3 className="text-xl font-semibold text-black">{course.title}</h3>
                <p className="text-gray-600">{course.desc}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    course.difficulty === "Beginner" ? "bg-gray-200 text-black" :
                    course.difficulty === "Intermediate" ? "bg-gray-300 text-black" :
                    "bg-gray-400 text-white"
                  }`}>
                    {course.difficulty}
                  </span>
                  <span className="text-gray-500 text-xs flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {course.duration}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-full bg-gray-300 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      course.progress >= 70 ? 'bg-black' : 
                      course.progress >= 50 ? 'bg-gray-600' : 
                      course.progress > 0 ? 'bg-gray-400' : 'bg-gray-300'
                    }`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-700 font-medium min-w-[50px]">{course.progress}%</span>
                {course.status === 'Completed' && (
                  <CheckCircle className="w-5 h-5 text-black" />
                )}
              </div>

              <div className="text-sm text-gray-500">
                Status: <span className={`font-medium ${
                  course.status === 'Completed' ? 'text-black' :
                  course.status === 'Needs Improvement' ? 'text-gray-600' :
                  'text-gray-500'
                }`}>{course.status}</span>
                {course.lastAccessed && (
                  <> • Last accessed: {course.lastAccessed}</>
                )}
                {course.score !== null && (
                  <> • Score: <span className="font-semibold text-black">{course.score}%</span></>
                )}
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  className="flex items-center px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex-1 justify-center"
                  onClick={() => setSelectedCourse(course.id)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {course.progress === 100 ? 'Review' : course.progress === 0 ? 'Start' : 'Continue'}
                </button>
                <button className="flex items-center px-4 py-2 bg-gray-200 text-black rounded-lg font-medium hover:bg-gray-300 transition-colors">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-black">Profile Settings</h2>
      
      {isLoaded && isSignedIn && user && (
        <div className="bg-white rounded-2xl p-8 border-2 border-black shadow-sm">
          <div className="flex items-center space-x-6 mb-8">
            {user.imageUrl ? (
              <img src={user.imageUrl} alt="User avatar" className="w-24 h-24 rounded-full border-4 border-gray-300" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-12 h-12 text-black" />
              </div>
            )}
            <div>
              <h3 className="text-2xl font-semibold text-black">{user.fullName || user.username || 'User'}</h3>
              <p className="text-gray-600">{user.primaryEmailAddress?.emailAddress}</p>
              <p className="text-gray-500 text-sm mt-1">User ID: {user.id}</p>
              <button className="mt-3 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-black mb-4">Account Information</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="text-black">{user.primaryEmailAddress?.emailAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member since:</span>
                  <span className="text-black">{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last updated:</span>
                  <span className="text-black">{new Date(user.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-black mb-4">Learning Progress</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Courses Completed:</span>
                  <span className="text-black">{coursesWithProgress.filter(c => c.status === 'Completed').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Quizzes:</span>
                  <span className="text-black">{overallStats.totalQuizzes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Score:</span>
                  <span className="text-black">{overallStats.averageScore}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Profile Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 border-2 border-black shadow-sm">
          <h4 className="text-lg font-semibold text-black mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </h4>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-black" defaultChecked />
              <span className="ml-2 text-gray-700">Email notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-black" defaultChecked />
              <span className="ml-2 text-gray-700">Course reminders</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-black" />
              <span className="ml-2 text-gray-700">Marketing emails</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-black shadow-sm">
          <h4 className="text-lg font-semibold text-black mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Security
          </h4>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Two-Factor Authentication
            </button>
            <button className="w-full text-left px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Login History
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-black">SecureX Dashboard</h1>
                <p className="text-gray-600 mt-1">Track your cybersecurity learning journey</p>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => window.location.href = '/'}
                  className="p-3 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors flex items-center space-x-2 hover:text-black"
                  title="Go to Home"
                >
                  <Home className="w-5 h-5" />
                  <span className="hidden sm:inline font-medium">Home</span>
                </button>
                <button className="p-3 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors" title="Notifications">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-3 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors" title="Settings">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="transition-all duration-300">
            {selectedView === 'overview' && <OverviewView />}
            {selectedView === 'analytics' && <AnalyticsView />}
            {selectedView === 'courses' && <CoursesView />}
            {selectedView === 'profile' && <ProfileView />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;