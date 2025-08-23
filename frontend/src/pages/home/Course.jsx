import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { Shield, Users, BookOpen, TrendingUp, AlertTriangle, Play, BarChart3, Globe, Home as HomeIcon, Briefcase, GraduationCap, Heart, User } from 'lucide-react';

const Course = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const navigate = useNavigate();

  const demographics = [
    {
      id: 'students',
      name: 'Students',
      icon: GraduationCap,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      lightColor: 'bg-blue-50',
      count: '2.3M',
      completion: 78,
      rating: 4.2,
      threats: ['Fake job scams', 'Social media fraud', 'Online gaming scams', 'Educational loan fraud'],
      activeModule: 'Social Media Safety'
    },
    {
      id: 'professionals',
      name: 'Professionals',
      icon: Briefcase,
      color: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-600',
      lightColor: 'bg-indigo-50',
      count: '1.8M',
      completion: 85,
      rating: 4.5,
      threats: ['Phishing emails', 'Business email compromise', 'Fake investment schemes', 'Identity theft'],
      activeModule: 'Phishing Detection'
    },
    {
      id: 'homemakers',
      name: 'Homemakers',
      icon: HomeIcon,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      lightColor: 'bg-purple-50',
      count: '3.1M',
      completion: 72,
      rating: 4.3,
      threats: ['Online shopping fraud', 'Fake OTP calls', 'WhatsApp scams', 'Prize scams'],
      activeModule: 'Safe Online Shopping'
    },
    {
      id: 'rural',
      name: 'Rural Users',
      icon: Globe,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      lightColor: 'bg-green-50',
      count: '4.2M',
      completion: 68,
      rating: 4.1,
      threats: ['Digital payment fraud', 'Fake government schemes', 'Agricultural scams', 'Mobile banking fraud'],
      activeModule: 'Digital Payment Safety'
    },
    {
      id: 'seniors',
      name: 'Senior Citizens',
      icon: Heart,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      lightColor: 'bg-orange-50',
      count: '1.5M',
      completion: 65,
      rating: 4.4,
      threats: ['Health insurance fraud', 'Pension scams', 'Tech support scams', 'Medicine fraud'],
      activeModule: 'Health Scam Awareness'
    }
  ];

  const overallStats = {
    totalLearners: '12.9M',
    averageCompletion: '74%',
    threatsBlocked: '45.2K',
    activeCourses: '127'
  };

  const launchModule = (demographic) => {
    setSelectedModule(demographic);
    setTimeout(() => {
      setSelectedModule(null);
      navigate(`/quiz/${demographic}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Banner */}
        <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Security Alert
              </h3>
              <p className="text-sm text-red-700 mt-1">
                15% increase in UPI fraud cases this month. Deploy targeted awareness modules immediately.
              </p>
            </div>
          </div>
        </div>
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Learners</p>
                <p className="text-2xl font-semibold text-gray-900">{overallStats.totalLearners}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Completion</p>
                <p className="text-2xl font-semibold text-gray-900">{overallStats.averageCompletion}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Threats Blocked</p>
                <p className="text-2xl font-semibold text-gray-900">{overallStats.threatsBlocked}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Courses</p>
                <p className="text-2xl font-semibold text-gray-900">{overallStats.activeCourses}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Demographics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {demographics.map((demo) => {
            const IconComponent = demo.icon;
            return (
              <div key={demo.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${demo.color}`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="ml-3 text-lg font-semibold text-gray-900">{demo.name}</h3>
                    </div>
                  </div>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{demo.count}</p>
                      <p className="text-xs text-gray-500">Learners</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{demo.completion}%</p>
                      <p className="text-xs text-gray-500">Completion</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{demo.rating}</p>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                  </div>
                  {/* Threats */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Common Threats:</h4>
                    <div className="space-y-1">
                      {demo.threats.slice(0, 3).map((threat, idx) => (
                        <div key={idx} className={`text-xs px-2 py-1 rounded ${demo.lightColor} text-gray-700`}>
                          ⚠️ {threat}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Active Module */}
                  <div className="mb-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-800">🎯 Active Module</p>
                        <p className="text-xs text-green-600">{demo.activeModule}</p>
                      </div>
                    </div>
                    <div className="mt-2 bg-green-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                        style={{width: `${demo.completion}%`}}
                      ></div>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => launchModule(demo.id)}
                      disabled={selectedModule === demo.id}
                      className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md text-white transition-colors ${demo.color} ${demo.hoverColor} disabled:opacity-50`}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      {selectedModule === demo.id ? 'Launching...' : 'Launch Module'}
                    </button>
                    <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                      <BarChart3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Create Alert Campaign</p>
                  <p className="text-sm text-gray-500">Broadcast urgent security warnings</p>
                </div>
              </div>
            </button>
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Deploy New Course</p>
                  <p className="text-sm text-gray-500">Launch targeted learning modules</p>
                </div>
              </div>
            </button>
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div className="flex items-center">
                <BarChart3 className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">View Full Analytics</p>
                  <p className="text-sm text-gray-500">Detailed performance insights</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* Loading Modal */}
      {selectedModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-900 font-medium">Launching teaching module...</p>
            <p className="text-gray-500 text-sm">Preparing interactive content</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
