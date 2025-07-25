import React, { useState, useEffect } from "react";
import applogo from "../assets/Main-Logo.png";
import userlogo from "../assets/user-logo-default.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchUsername } from "../features/userdata/usernameSlice";
import { Menu, X, LogOut, User, MapPin } from "lucide-react";

const NavBar = () => {
  const username = useSelector((state) => state.username.data);
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/api/auth/logout", {}, { withCredentials: true });
      dispatch(fetchUsername());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav 
      className={`bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 w-full transition-all duration-300 shadow-lg ${
        isScrolled ? "shadow-2xl backdrop-blur-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          {/* Top Row */}
          <div className="flex justify-between items-center py-4">
            {/* LEFT: Hamburger + Logo */}
            <div className="flex items-center gap-3 group">
              <button
                className="sm:hidden text-amber-300 hover:text-amber-100 transition-colors duration-200 p-1 rounded-md hover:bg-amber-800"
                onClick={() => setShowMenu((prev) => !prev)}
                aria-label="Toggle menu"
              >
                <div className="relative">
                  {showMenu ? (
                    <X size={28} className="animate-in spin-in-90 duration-200" />
                  ) : (
                    <Menu size={28} className="animate-in fade-in duration-200" />
                  )}
                </div>
              </button>
              
              <div className="flex items-center gap-2 group-hover:scale-105 transition-transform duration-200">
                <img 
                  src={applogo} 
                  alt="logo" 
                  className="h-12 sm:h-16 drop-shadow-lg hover:drop-shadow-xl transition-all duration-200" 
                />
                <div className="hidden lg:block">
                  <h1 className="text-amber-100 font-bold text-xl tracking-wide">
                    MoneyTracker
                  </h1>
                  <p className="text-amber-300 text-xs opacity-80">
                    Financial Management
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: User Info */}
            <div className="user-menu-container relative">
              <div
                className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-amber-800 to-amber-700 p-3 rounded-xl cursor-pointer hover:from-amber-700 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-xl border border-amber-600/30 backdrop-blur-sm"
                onClick={() => setShowUserMenu((prev) => !prev)}
              >
                <div className="relative">
                  <img 
                    src={userlogo} 
                    alt="user" 
                    className="w-10 h-10 rounded-full border-2 border-amber-300/50 shadow-md hover:border-amber-300 transition-all duration-200" 
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-amber-800 animate-pulse"></div>
                </div>
                
                <div className="text-left hidden sm:block">
                  <div className="flex items-center gap-1">
                    <User size={14} className="text-amber-300" />
                    <h1 className="font-bold text-orange-100 text-sm sm:text-base tracking-wide">
                      {username || "Guest"}
                    </h1>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={12} className="text-orange-500" />
                    <h4 className="font-light text-orange-400 text-xs sm:text-sm">
                      India
                    </h4>
                  </div>
                </div>

                <div className={`transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-3 w-48 bg-white/95 backdrop-blur-sm shadow-2xl rounded-xl z-20 border border-gray-200 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                  <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-800">{username || "Guest"}</p>
                    <p className="text-xs text-gray-500">Welcome back!</p>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 font-medium"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div
            className={`flex flex-col sm:flex-row sm:justify-center sm:gap-8 lg:gap-12 transition-all duration-300 ease-in-out border-t border-amber-800/30
              ${showMenu 
                ? "max-h-40 opacity-100 py-4" 
                : "max-h-0 opacity-0 py-0 sm:opacity-100 sm:max-h-full sm:py-4"
              } 
              overflow-hidden sm:overflow-visible`}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `group relative text-amber-300 font-quicksand text-lg sm:text-xl lg:text-2xl font-medium transition-all duration-200 py-2 sm:py-0
                hover:text-amber-100 ${
                  isActive ? "text-amber-100" : ""
                }`
              }
              onClick={() => setShowMenu(false)}
            >
              <span className="relative z-10">Home</span>
              <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-300 to-orange-400 transition-all duration-200 ${
                ({ isActive }) => isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}></div>
            </NavLink>
            
            <NavLink
              to="/Transactions"
              className={({ isActive }) =>
                `group relative text-amber-300 font-quicksand text-lg sm:text-xl lg:text-2xl font-medium transition-all duration-200 py-2 sm:py-0
                hover:text-amber-100 ${
                  isActive ? "text-amber-100" : ""
                }`
              }
              onClick={() => setShowMenu(false)}
            >
              <span className="relative z-10">Transactions</span>
              <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-300 to-orange-400 transition-all duration-200 ${
                ({ isActive }) => isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}></div>
            </NavLink>
          </div>
        </div>
      </div>
      
      {/* Background Overlay for Mobile Menu */}
      {showMenu && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 sm:hidden"
          onClick={() => setShowMenu(false)}
        />
      )}
    </nav>
  );
};

export default NavBar;
