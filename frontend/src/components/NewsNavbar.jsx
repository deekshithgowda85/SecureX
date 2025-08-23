import React from 'react';
import { Shield, Sun, Moon, Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const NewsNavbar = ({ isDarkMode, toggleDarkMode, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <nav className={`sticky top-0 z-50 border-b backdrop-blur-sm transition-all duration-300 ${
      isDarkMode 
        ? 'bg-black/95 border-white/20' 
        : 'bg-white/95 border-black/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/news" className="flex items-center space-x-3 group">
            <Shield className={`w-8 h-8 transition-all duration-300 ${
              isDarkMode ? 'text-white' : 'text-black'
            } group-hover:scale-110`} />
            <span className={`text-xl font-bold transition-all duration-300 ${
              isDarkMode ? 'text-white' : 'text-black'
            } group-hover:tracking-wider`}>
              SecureX
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/guide" className={`transition-colors duration-300 ${
              isDarkMode 
                ? 'text-white/80 hover:text-white' 
                : 'text-black/80 hover:text-black'
            }`}>
              Guide
            </a>
            <a href="/news" className={`transition-colors duration-300 ${
              isDarkMode 
                ? 'text-white/80 hover:text-white' 
                : 'text-black/80 hover:text-black'
            }`}>
              News
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white/10 text-white hover:bg-white/20' 
                  : 'bg-black/10 text-black hover:bg-black/20'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Clerk Auth Buttons */}
            <div className="flex items-center space-x-3">
              <SignedOut>
                <SignInButton mode="modal" afterSignInUrl="/home" afterSignUpUrl="/home">
                  <button className={`px-4 py-2 rounded-md font-medium transition-all duration-300 border ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-white/90 border-white' 
                      : 'bg-black text-white hover:bg-black/90 border-black'
                  }`}>
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal" afterSignUpUrl="/home" afterSignInUrl="/home">
                  <button className={`px-4 py-2 rounded-md font-medium transition-all duration-300 border ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-white/90 border-white' 
                      : 'bg-black text-white hover:bg-black/90 border-black'
                  }`}>
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
              isDarkMode 
                ? 'bg-white/10 text-white hover:bg-white/20' 
                : 'bg-black/10 text-black hover:bg-black/20'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden border-t backdrop-blur-sm ${
          isDarkMode 
            ? 'border-white/20 bg-black/95' 
            : 'border-black/20 bg-white/95'
        }`}>
          <div className="px-4 py-3 space-y-3">
            <a href="/guide" className={`block py-2 transition-colors duration-300 ${
              isDarkMode ? 'text-white/80 hover:text-white' : 'text-black/80 hover:text-black'
            }`}>Guide</a>
            <a href="/news" className={`block py-2 transition-colors duration-300 ${
              isDarkMode ? 'text-white/80 hover:text-white' : 'text-black/80 hover:text-black'
            }`}>News</a>

            <div className="flex items-center justify-between py-2">
              <span className={isDarkMode ? 'text-white' : 'text-black'}>Dark Mode</span>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-white/10 text-white hover:bg-white/20' 
                    : 'bg-black/10 text-black hover:bg-black/20'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Clerk Auth Buttons for Mobile */}
            <div className="space-y-2 pt-2">
              <SignedOut>
                <SignInButton mode="modal" afterSignInUrl="/home" afterSignUpUrl="/home">
                  <button className={`w-full px-4 py-2 rounded-md font-medium transition-all duration-300 border ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-white/90 border-white' 
                      : 'bg-black text-white hover:bg-black/90 border-black'
                  }`}>
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal" afterSignUpUrl="/home" afterSignInUrl="/home">
                  <button className={`w-full px-4 py-2 rounded-md font-medium transition-all duration-300 border ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-white/90 border-white' 
                      : 'bg-black text-white hover:bg-black/90 border-black'
                  }`}>
                    Sign Up
                  </button>
                </SignUpButton>
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