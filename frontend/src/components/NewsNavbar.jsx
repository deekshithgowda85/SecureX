import React from 'react';
import { Shield, Sun, Moon, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const NewsNavbar = ({
  isDarkMode,
  toggleDarkMode,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  iconColor = '',
  textColor = '',
}) => {
  const location = useLocation();

  return (
    <nav className={`w-full border-b ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} ${textColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/news" className="flex items-center space-x-2 group">
            <Shield className={`w-7 h-7 ${iconColor || (isDarkMode ? 'text-white' : 'text-black')}`} />
            <span className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-black'} group-hover:opacity-80 transition-opacity`}>
              SecureX
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/news"
              className={`font-medium transition-colors ${location.pathname === '/news' ? 'underline' : ''} ${isDarkMode ? 'text-white' : 'text-black'} hover:opacity-80`}
            >
              News
            </Link>
            <Link
              to="/guide"
              className={`font-medium transition-colors ${location.pathname === '/threats-guide' ? 'underline' : ''} ${isDarkMode ? 'text-white' : 'text-black'} hover:opacity-80`}
            >
              Guide
            </Link>
            <SignedOut>
              <SignInButton mode="modal">
                <button className={`font-medium px-3 py-1 rounded hover:bg-blue-100 transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className={`ml-2 font-medium px-3 py-1 rounded hover:bg-blue-100 transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <button
              onClick={toggleDarkMode}
              className={`ml-4 p-2 rounded-full border transition-colors ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white hover:bg-gray-800' : 'bg-gray-100 border-gray-300 text-black hover:bg-gray-200'}`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md focus:outline-none ${isDarkMode ? 'text-white' : 'text-black'}`}
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden px-4 pb-4 pt-2 space-y-2 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
          <Link
            to="/news"
            className={`block font-medium py-2 ${location.pathname === '/news' ? 'underline' : ''} ${isDarkMode ? 'text-white' : 'text-black'} hover:opacity-80`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            News
          </Link>
          <Link
            to="/threats-guide"
            className={`block font-medium py-2 ${location.pathname === '/threats-guide' ? 'underline' : ''} ${isDarkMode ? 'text-white' : 'text-black'} hover:opacity-80`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Threats Guide
          </Link>
          <SignedOut>
            <SignInButton mode="modal">
              <button className={`block w-full text-left font-medium px-3 py-2 rounded hover:bg-blue-100 transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className={`block w-full text-left font-medium px-3 py-2 rounded hover:bg-blue-100 transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <div className="py-2">
              <UserButton />
            </div>
          </SignedIn>
          <button
            onClick={toggleDarkMode}
            className={`mt-2 p-2 rounded-full border transition-colors w-full flex items-center justify-center ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white hover:bg-gray-800' : 'bg-gray-100 border-gray-300 text-black hover:bg-gray-200'}`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="ml-2">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default NewsNavbar;
