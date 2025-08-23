import React, { useState, useRef, useEffect } from 'react';
import { Shield, Sun, Moon, Menu, X, MoreVertical } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const navItems = [
  { label: 'Dashboard', href: '/home' },
  { label: 'Products', href: '/products' },
  { label: 'Courses', href: '/course' }
];

const dropdownItems = [
  { label: 'News', href: '/news' },
  { label: 'Guide', href: '/guide' },
  { label: 'Profile', href: '/profile' }
];

const NewsNavbar = ({
  isDarkMode,
  toggleDarkMode,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const location = useLocation();
  const activeIndex = navItems.findIndex(item => item.href === location.pathname);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

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
            <Shield className="w-8 h-8 transition-transform text-black group-hover:scale-110" />
            <span className="text-xl font-bold transition-colors group-hover:underline text-black">
              SecureX
            </span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, idx) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200 ${
                  activeIndex === idx
                    ? (isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-100 text-blue-700')
                    : (isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-black hover:bg-blue-50')
                }`}
              >
                {item.label}
              </Link>
            ))}
            {/* Dropdown for News, Guide, Profile */}
            <div className="relative" ref={dropdownRef}>
              <button
                className={`p-2 rounded-full hover:bg-gray-200 transition-colors ${dropdownOpen ? 'bg-gray-200' : ''}`}
                onClick={() => setDropdownOpen((v) => !v)}
                aria-label="More"
              >
                <MoreVertical className="w-6 h-6 text-black" />
              </button>
              {dropdownOpen && (
                <div className={`absolute right-0 mt-2 w-44 rounded-lg shadow-lg border bg-white z-30`}>
                  <div className="py-2">
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
            {navItems.map((item, idx) => (
              <Link
                key={item.href}
                to={item.href}
                className={`block py-2 rounded-lg text-base font-semibold ${
                  activeIndex === idx
                    ? (isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-100 text-blue-700')
                    : (isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-black hover:bg-blue-50')
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {/* Dropdown in mobile menu */}
            <div className="border-t pt-2">
              {dropdownItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block py-2 rounded-lg text-base font-semibold text-black hover:bg-blue-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
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