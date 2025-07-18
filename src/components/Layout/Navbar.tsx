import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, User, Upload, Search, LogOut, Menu } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) return null;

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white/70 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link
              to="/explore"
              className={`flex items-center space-x-2 transition-all duration-300 ${
                isActive("/explore")
                  ? "opacity-100"
                  : "opacity-90 hover:opacity-100"
              }`}
            >
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">
                StudyShare
              </span>
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/explore"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive("/explore")
                  ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200/50"
                  : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
              }`}
            >
              <Search className="h-4 w-4" />
              <span>Explore</span>
            </Link>

            <Link
              to="/upload"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive("/upload")
                  ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200/50"
                  : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
              }`}
            >
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Link>

            <Link
              to="/profile"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive("/profile")
                  ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200/50"
                  : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
              }`}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>

            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Hamburger for mobile */}
          <button
            className="md:hidden p-2 rounded-md border border-gray-300 bg-white shadow ml-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-7 w-7 text-gray-700" />
          </button>
        </div>
      </div>
      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="bg-white shadow-xl flex flex-col p-6"
            style={{
              width: "100vw",
              height: "20rem",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <button
              className="self-end mb-6 text-3xl text-gray-500 hover:text-red-500"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              &times;
            </button>
            <nav className="flex flex-col gap-4 mb-8">
              <Link
                to="/explore"
                className={`flex items-center space-x-2 text-lg text-gray-800 text-left ${
                  isActive("/explore") ? "font-bold" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Search className="h-4 w-4" />
                <span>Explore</span>
              </Link>
              <Link
                to="/upload"
                className={`flex items-center space-x-2 text-lg text-gray-800 text-left ${
                  isActive("/upload") ? "font-bold" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </Link>
              <Link
                to="/profile"
                className={`flex items-center space-x-2 text-lg text-gray-800 text-left ${
                  isActive("/profile") ? "font-bold" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="flex items-center space-x-2 text-lg text-gray-800 text-left"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
