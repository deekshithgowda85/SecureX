import { Link, useLocation } from 'react-router-dom'
import { Shield } from 'lucide-react';
import React, { useState } from 'react'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from '@clerk/clerk-react'

const navItems = [
  { label: 'Dashboard', href: '/home' },
  { label: 'Products', href: '/products' },
  { label: 'Courses', href: '/course' },
  { label: 'Profile', href: '/profile' }
]

function Navbar() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const activeIndex = navItems.findIndex(item => item.href === location.pathname)

  return (
    <header className="w-full shadow-md bg-white">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
  <Link to="/news" className="flex items-center space-x-3 group focus:outline-none">
    <Shield className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform" />
    <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent group-hover:underline">
      SecureX
    </span>
  </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item, idx) => (
            <Link
              key={item.href}
              to={item.href}
              className={`px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200 ${
                activeIndex === idx
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-black hover:bg-blue-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: { userButtonAvatarBox: 'ring-2 ring-blue-500' }
              }}
            />
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="modal"
              afterSignInUrl="/home"
              afterSignUpUrl="/home"
            />
            <SignUpButton
              mode="modal"
              afterSignUpUrl="/home"
              afterSignInUrl="/home"
            />
          </SignedOut>
        </div>

        {/* Mobile Dropdown */}
        <div className="flex md:hidden items-center relative">
          <button
            className="p-2 rounded-lg bg-blue-100 border border-blue-200 focus:outline-none flex items-center justify-center"
            onClick={() => setMobileMenuOpen(v => !v)}
            aria-label="Open navigation menu"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1d4ed8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="block"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>

          <div
            className={`absolute right-0 top-12 mt-2 w-48 bg-white border border-blue-200 rounded-lg shadow-lg flex flex-col z-50 transition-all duration-300 ease-out transform-gpu ${
              mobileMenuOpen
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}
          >
            {navItems.map((item, idx) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-base font-semibold text-left whitespace-nowrap transition-all duration-200 transform ${
                  activeIndex === idx
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-black hover:bg-blue-50'
                } ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                style={{
                  transitionDelay: mobileMenuOpen ? `${idx * 50}ms` : '0ms'
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex flex-col space-y-2 px-4 py-2 border-t border-blue-100 mt-2">
              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: { userButtonAvatarBox: 'ring-2 ring-blue-500' }
                  }}
                />
              </SignedIn>
              <SignedOut>
                <SignInButton
                  mode="modal"
                  afterSignInUrl="/home"
                  afterSignUpUrl="/home"
                />
                <SignUpButton
                  mode="modal"
                  afterSignUpUrl="/home"
                  afterSignInUrl="/home"
                />
              </SignedOut>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
