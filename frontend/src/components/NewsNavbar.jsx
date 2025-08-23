import React from 'react';
import { Shield, Sun, Moon, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const NewsNavbar = ({
  isDarkMode,
  toggleDarkMode,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  return (
    <nav className={`sticky top-0 z-50 border-b backdrop-blur-sm ${
      isDarkMode 
        ? 'bg-gray-900/95 border-gray-700' 
        : 'bg-white/95 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/news" className="flex items-center space-x-3 group">
            <Shield className={`w-8 h-8 transition-transform ${isDarkMode ? 'text-white' : 'text-black'} group-hover:scale-110`} />
            <span className={`text-xl font-bold transition-colors group-hover:underline ${isDarkMode ? 'text-white' : 'text-black'}`}>
              SecureX
            </span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/guide" className={`hover:text-gray-900 transition-colors ${
              isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'
            }`}>
              Guide
            </Link>
            <Link to="/news" className={`hover:text-gray-900 transition-colors ${
              isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'
            }`}>
              News
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Clerk Auth Buttons */}
            <div className="flex items-center space-x-3">
              <SignedOut>
                <SignInButton mode="modal" afterSignInUrl="/home" afterSignUpUrl="/home" />
                <SignUpButton mode="modal" afterSignUpUrl="/home" afterSignInUrl="/home" />
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden border-t ${
          isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
        }`}>
          <div className="px-4 py-3 space-y-3">
            <Link to="/guide" className={`block py-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Guide</Link>
            <Link to="/news" className={`block py-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>News</Link>
            <div className="flex items-center justify-between py-2">
              <span className={isDarkMode ? 'text-white' : 'text-black'}>Dark Mode</span>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
            {/* Clerk Auth Buttons for Mobile */}
            <div className="space-y-2 pt-2">
              <SignedOut>
                <SignInButton mode="modal" afterSignInUrl="/home" afterSignUpUrl="/home" />
                <SignUpButton mode="modal" afterSignUpUrl="/home" afterSignInUrl="/home" />
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/home" />
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NewsNavbar;