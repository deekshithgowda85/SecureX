import React, { useState, useEffect } from "react";
import { Shield, Sun, Moon, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../features/UserSlice";

const navItems = [
  { label: "Home", href: "/home" },
  { label: "Products", href: "/products" },
  { label: "Dashboard", href: "/course" },
  { label: "News", href: "/news" },
  { label: "Guide", href: "/guide" },
  { label: "Quiz", href: "/cyberLearning" },
];

const NewsNavbar = ({
  isDarkMode,
  toggleDarkMode,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const location = useLocation();
  const activeIndex = navItems.findIndex(
    (item) => item.href === location.pathname
  );

  // Clerk
  const { isSignedIn, user } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSignedIn && user) {
      dispatch(
        setUser({
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
          imageUrl: user.imageUrl,
        })
      );
    } else {
      dispatch(clearUser());
    }
  }, [isSignedIn, user, dispatch]);

  return (
    <nav
      className={`sticky top-0 z-50 border-b backdrop-blur-sm ${
        isDarkMode
          ? "bg-gray-900/95 border-gray-700"
          : "bg-white/95 border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-3 group">
            <Shield className="w-8 h-8 transition-transform text-black group-hover:scale-110" />
            <span className="text-xl font-bold transition-colors group-hover:underline text-black">
              SecureX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isSignedIn &&
              navItems.map((item, idx) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200 ${
                    activeIndex === idx
                      ? isDarkMode
                        ? "bg-gray-800 text-white"
                        : "bg-blue-100 text-blue-700"
                      : isDarkMode
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-black hover:bg-blue-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Clerk Auth Buttons */}
            <div className="flex items-center space-x-3">
              {!isSignedIn && (
                <>
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
                </>
              )}
              {isSignedIn && <UserButton afterSignOutUrl="/" />}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden border-t ${
            isDarkMode
              ? "border-gray-700 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="px-4 py-3 space-y-3">
            {isSignedIn &&
              navItems.map((item, idx) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block py-2 rounded-lg text-base font-semibold ${
                    activeIndex === idx
                      ? isDarkMode
                        ? "bg-gray-800 text-white"
                        : "bg-blue-100 text-blue-700"
                      : isDarkMode
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-black hover:bg-blue-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

            <div className="flex items-center justify-between py-2">
              <span className={isDarkMode ? "text-white" : "text-black"}>
                Dark Mode
              </span>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Clerk Auth Buttons for Mobile */}
            <div className="space-y-2 pt-2">
              {!isSignedIn && (
                <>
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
                </>
              )}
              {isSignedIn && <UserButton afterSignOutUrl="/home" />}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NewsNavbar;
