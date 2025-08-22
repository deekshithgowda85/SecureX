import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { useUser } from '@clerk/clerk-react';

const dummyActivity = [
  { id: 1, action: "Logged in", date: "2025-08-21" },
  { id: 2, action: "Saved article: 'Top 10 Cyber Threats'", date: "2025-08-20" },
  { id: 3, action: "Asked chatbot: 'How to secure my email?'", date: "2025-08-19" },
];

const dummyArticles = [
  { id: 1, title: "Top 10 Cyber Threats", link: "#" },
  { id: 2, title: "How to Spot Phishing Emails", link: "#" },
];

const securityTips = [
  "Use strong, unique passwords for every account.",
  "Enable two-factor authentication wherever possible.",
  "Keep your software and devices updated.",
  "Be cautious of suspicious emails and links.",
];

function Profile() {
  const { isLoaded, isSignedIn, user } = useUser();

    const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || "");

  const handleSave = () => {
    setEditMode(false);
    // TODO: Integrate with Clerk API to update profile info
  };


  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to SecureX Home</h1>
        <p className="text-lg text-gray-600 mb-8">This is your dashboard. Explore the latest cybersecurity news, resources, and more.</p>
        {isLoaded && isSignedIn && user && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8 shadow-lg animate-fade-in">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Your Profile</h2>
            <div className="flex items-center space-x-4 mb-4">
              {user.imageUrl && (
                <img src={user.imageUrl} alt="User avatar" className="w-16 h-16 rounded-full border border-blue-200 shadow-md" />
              )}
              <div>
                {editMode ? (
                  <>
                    <div className="mb-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Username:</label>
                      <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="border rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-400 transition"
                        placeholder="Username"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name:</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        className="border rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-400 transition"
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email:</label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="border rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-400 transition"
                        placeholder="Email"
                      />
                    </div>
                    <div className="text-base text-gray-700 mb-2">
                      <span className="font-semibold">User ID:</span> {user.id}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-3 py-1 rounded shadow hover:bg-blue-700 hover:scale-105 transition-transform duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="bg-gray-300 px-3 py-1 rounded shadow hover:bg-gray-400 hover:scale-105 transition-transform duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-base text-gray-700 mb-1">
                      <span className="font-semibold">Username:</span> {username}
                    </div>
                    <div className="text-lg font-medium text-gray-900">{fullName}</div>
                    <div className="text-gray-600">{email}</div>
                    <div className="text-base text-gray-700 mb-2">
                      <span className="font-semibold">User ID:</span> {user.id}
                    </div>
                    <button
                      onClick={() => setEditMode(true)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mt-2 shadow hover:bg-blue-600 hover:scale-105 transition-transform duration-200"
                    >
                      Edit Profile
                    </button>
                  </>
                )}
              </div>
            </div>
            {/* Recent Activity */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Recent Activity</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {dummyActivity.map(act => (
                  <li key={act.id} className="hover:bg-blue-100 rounded px-2 py-1 transition-colors duration-200">
                    {act.action} <span className="text-gray-400 text-sm">({act.date})</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Saved Articles */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Saved Articles</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {dummyArticles.map(article => (
                  <li key={article.id}>
                    <a
                      href={article.link}
                      className="text-blue-600 hover:underline hover:text-blue-800 transition-colors duration-200"
                    >
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Security Tips */}
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Security Tips</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {securityTips.map((tip, idx) => (
                  <li key={idx} className="hover:bg-blue-100 rounded px-2 py-1 transition-colors duration-200">{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      {/* Simple fade-in animation */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.7s ease;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
}

export default Profile