import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BarChart3, Play, CheckCircle, TrendingUp, Award, Clock, Target, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import {Link} from "react-router-dom"
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

const QuizDashboard = () => {
  const [selectedView, setSelectedView] = useState('overview'); // 'overview', 'analytics', 'courses'
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Access Redux store data
  const quizData = useSelector(state => state.quiz) || { history: [] };
  const counterData = useSelector(state => state.counter) || { value: 0 };

  // Process quiz data for charts
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
    { 
      name: 'Correct', 
      value: chartData.reduce((acc, cur) => acc + cur.correct, 0), 
      color: '#000000' 
    },
    { 
      name: 'Incorrect', 
      value: chartData.reduce((acc, cur) => acc + cur.incorrect, 0), 
      color: '#6B7280' 
    }
  ] : [
    { name: 'No Data', value: 1, color: '#E5E7EB' }
  ];

  const overallStats = {
    totalQuizzes: chartData.length,
    averageScore: chartData.length > 0 ? Math.round(chartData.reduce((acc, cur) => acc + cur.score, 0) / chartData.length) : 0,
    totalQuestions: chartData.reduce((acc, cur) => acc + cur.total, 0),
    correctAnswers: chartData.reduce((acc, cur) => acc + cur.correct, 0)
  };

  // Merge course data with quiz results
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
        <div className="bg-black text-white p-3 rounded-lg border-2 border-gray-300 shadow-lg">
          <p className="font-semibold">{`Topic: ${label}`}</p>
          <p className="text-gray-300">{`Score: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  const OverviewView = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-black shadow-xl transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Quizzes</p>
              <p className="text-3xl font-bold text-black">{overallStats.totalQuizzes}</p>
            </div>
            <Target className="w-8 h-8 text-black" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-black shadow-xl transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Average Score</p>
              <p className="text-3xl font-bold text-black">{overallStats.averageScore}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-black" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-black shadow-xl transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Correct Answers</p>
              <p className="text-3xl font-bold text-black">{overallStats.correctAnswers}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-black" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-black shadow-xl transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Questions</p>
              <p className="text-3xl font-bold text-black">{overallStats.totalQuestions}</p>
            </div>
            <Award className="w-8 h-8 text-black" />
          </div>
        </div>
      </div>

      {/* Recent Quiz Results */}
      <div className="bg-white rounded-2xl p-8 border-2 border-black shadow-xl">
        <h3 className="text-2xl font-bold text-black mb-6 border-b-2 border-gray-300 pb-2">
          📊 Recent Quiz Results
        </h3>
        {chartData.length > 0 ? (
          <div className="space-y-4">
            {[...chartData].reverse().map((quiz, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-300 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold">
                    {quiz.topic.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-black">{quiz.topic}</h4>
                    <p className="text-gray-600 text-sm">{quiz.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${quiz.score >= 70 ? 'text-green-600' : quiz.score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
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
            <h4 className="text-xl font-bold text-gray-600 mb-2">No Quiz Data Available</h4>
            <p className="text-gray-500">Take your first quiz to see results here!</p>
          </div>
        )}
      </div>
    </div>
  );

  const AnalyticsView = () => (
    <div className="space-y-8">
      {chartData.length > 0 ? (
        <>
          {/* Score Trends */}
          <div className="bg-white rounded-2xl p-8 border-2 border-black shadow-xl">
            <h3 className="text-2xl font-bold text-black mb-6 border-b-2 border-gray-300 pb-2">
              📈 Score Trends by Topic
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="topic" stroke="#374151" />
                  <YAxis stroke="#374151" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="score" fill="#000000" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance Distribution */}
            <div className="bg-white rounded-2xl p-8 border-2 border-black shadow-xl">
              <h3 className="text-2xl font-bold text-black mb-6 border-b-2 border-gray-300 pb-2">
                🎯 Answer Distribution
              </h3>
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
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#000',
                        color: '#fff',
                        border: '2px solid #6B7280',
                        borderRadius: '8px'
                      }}
                    />
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
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-700">Incorrect ({pieData[1].value})</span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Over Time */}
            <div className="bg-white rounded-2xl p-8 border-2 border-black shadow-xl">
              <h3 className="text-2xl font-bold text-black mb-6 border-b-2 border-gray-300 pb-2">
                📊 Progress Timeline
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
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
        <div className="bg-white rounded-2xl p-12 border-2 border-black shadow-xl text-center">
          <div className="text-6xl mb-6">📊</div>
          <h3 className="text-2xl font-bold text-gray-600 mb-4">No Analytics Data</h3>
          <p className="text-gray-500 text-lg mb-6">Take some quizzes to generate analytics and insights!</p>
          <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold">
            <Link to="/cyberLearning"> Start Taking Quizzes </Link>
          </button>
        </div>
      )}
    </div>
  );

  const CoursesView = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {coursesWithProgress.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl shadow-xl p-8 border-2 border-black transform hover:scale-105 transition-all">
            <div className="flex items-center mb-6">
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
            
            <div className="space-y-4">
              {/* Progress Bar */}
              <div className="flex items-center space-x-2">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all duration-500 ${
                      course.progress >= 70 ? 'bg-green-500' : 
                      course.progress >= 50 ? 'bg-yellow-500' : 
                      course.progress > 0 ? 'bg-red-500' : 'bg-gray-400'
                    }`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <span className="text-base text-gray-700 font-medium min-w-[50px]">{course.progress}%</span>
                {course.status === 'Completed' && (
                  <CheckCircle className="w-6 h-6 text-green-500 ml-2" />
                )}
              </div>

              {/* Status Info */}
              <div className="text-sm text-gray-500">
                Status: <span className={`font-medium ${
                  course.status === 'Completed' ? 'text-green-600' :
                  course.status === 'Needs Improvement' ? 'text-yellow-600' :
                  'text-gray-600'
                }`}>{course.status}</span>
                {course.lastAccessed && (
                  <> &middot; Last accessed: {course.lastAccessed}</>
                )}
                {course.score !== null && (
                  <> &middot; Score: <span className="font-semibold text-blue-600">{course.score}%</span></>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-2">
                <button
                  className="flex items-center px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex-1"
                  onClick={() => setSelectedCourse(course.id)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {course.progress === 100 ? 'Review' : course.progress === 0 ? 'Start' : 'Continue'}
                </button>
                <button className="flex items-center px-6 py-3 bg-gray-100 text-black rounded-lg font-medium hover:bg-gray-200 transition-colors">
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-semibold border-2 border-black transform hover:scale-105"
          >
            <span className="mr-2">←</span>
            Back
          </button>

          <div className="flex space-x-2 bg-white border-2 border-black rounded-lg p-1">
            <button
              onClick={() => setSelectedView('overview')}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                selectedView === 'overview' 
                  ? 'bg-black text-white' 
                  : 'text-black hover:bg-gray-100'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedView('analytics')}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                selectedView === 'analytics' 
                  ? 'bg-black text-white' 
                  : 'text-black hover:bg-gray-100'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setSelectedView('courses')}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                selectedView === 'courses' 
                  ? 'bg-black text-white' 
                  : 'text-black hover:bg-gray-100'
              }`}
            >
              Courses
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-black mb-4 font-mono">
            QUIZ DASHBOARD
          </h1>
          <p className="text-2xl text-gray-700 mb-4">Track Your Learning Progress</p>
          <div className="w-32 h-1 bg-black mx-auto rounded-full"></div>
        </div>

        {/* Content based on selected view */}
        {selectedView === 'overview' && <OverviewView />}
        {selectedView === 'analytics' && <AnalyticsView />}
        {selectedView === 'courses' && <CoursesView />}

        {/* Modal for course action */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-10 text-center shadow-2xl border-2 border-black max-w-md mx-4">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-transparent mx-auto mb-6"></div>
              <p className="text-black font-medium text-lg mb-2">Loading course...</p>
              <p className="text-gray-600 mb-6">Preparing {selectedCourse} content</p>
              <button
                className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
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

export default QuizDashboard;