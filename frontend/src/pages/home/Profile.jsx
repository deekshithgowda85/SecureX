import React from 'react'
import Navbar from '../../components/Navbar'
import { useUser } from '@clerk/clerk-react';


function Profile() {
    const { isLoaded, isSignedIn, user } = useUser();
  return (
  <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to SecureX Home</h1>
        <p className="text-lg text-gray-600 mb-8">This is your dashboard. Explore the latest cybersecurity news, resources, and more.</p>
        {isLoaded && isSignedIn && user && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Your Profile</h2>
            <div className="flex items-center space-x-4">
              {user.imageUrl && (
                <img src={user.imageUrl} alt="User avatar" className="w-16 h-16 rounded-full border border-blue-200" />
              )}
              <div>
                <div className="text-lg font-medium text-gray-900">{user.fullName || user.username || user.primaryEmailAddress?.emailAddress}</div>
                <div className="text-gray-600">{user.primaryEmailAddress?.emailAddress}</div>
                <div className="text-gray-500 text-sm mt-1">User ID: {user.id}</div>
              </div>
            </div>
          </div>
        )}
        {/* Add more content or components here as needed */}
      </div>
    </div>
  );
}

export default Profile