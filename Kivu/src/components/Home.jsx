import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsername } from "../features/userdata/usernameSlice";

import NavBar from "./NavBar";
import BalanceBar from "./BalanceBar";
import PieDistribution from "./PieDistribution";
import BalanceComponent from "./BalanceComponent";
import LastTransactions from "./LastTransactions";
import Footer from "./Footer";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const { data: username, isError, isLoading, checked } = useSelector((state) => state.username);

  // Check user session when page loads
  useEffect(() => {
    dispatch(fetchUsername());
  }, [dispatch]);

  // Wait for the API call to finish before deciding
  useEffect(() => {
    if (!isLoading && checked && (!username || isError)) {
      navigate("/login");
    }
  }, [isLoading, checked, username, navigate, isError]);

  // Animation trigger
  useEffect(() => {
    if (username && !isLoading) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [username, isLoading]);

  // Get current time greeting
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Enhanced loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex justify-center items-center">
        <div className="text-center space-y-4">
          {/* Animated spinner */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto"></div>
            <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin absolute top-2 left-1/2 transform -translate-x-1/2"></div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold font-quicksand text-gray-800">
              Loading your dashboard...
            </h1>
            <p className="text-gray-600 font-quicksand">
              Preparing your financial overview
            </p>
          </div>
          
          {/* Loading dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce [animation-delay:0.1s]"></div>
            <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!username) return null; // Prevent flicker before redirect

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50/30 to-orange-50/20">
      <NavBar />

      {/* Greeting Section */}
      <div className={`py-12 px-6 md:px-12 transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="max-w-7xl mx-auto">
          {/* Time-based greeting */}
          <div className="mb-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 text-sm font-medium border border-amber-200 shadow-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {getTimeGreeting()}
            </span>
          </div>

          {/* Main greeting */}
          <div className="space-y-4">
            <h1 className="font-robotoserif font-extrabold text-4xl md:text-6xl lg:text-7xl text-gray-800 leading-tight">
              Hello,{" "}
              <span className="bg-gradient-to-r from-orange-800 via-amber-700 to-orange-900 bg-clip-text text-transparent">
                {username}
              </span>
              <span className="animate-bounce inline-block ml-2">👋</span>
            </h1>
            
            <p className="font-quicksand text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
              Hope you're having a wonderful day! Here's your financial overview to help you stay on track.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Balance + Pie Chart Section */}
        <div className={`transition-all duration-1000 delay-300 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-robotoserif mb-2">
              Financial Overview
            </h2>
            <p className="text-gray-600 font-quicksand">
              Your current balance and spending distribution
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <BalanceComponent />
              </div>
            </div>
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <PieDistribution />
              </div>
            </div>
          </div>
        </div>

        {/* Balance Bar Section */}
        <div className={`transition-all duration-1000 delay-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-robotoserif mb-2">
              Balance Trends
            </h2>
            <p className="text-gray-600 font-quicksand">
              Track your financial progress over time
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300">
            <BalanceBar />
          </div>
        </div>

        {/* Recent Transactions Section */}
        <div className={`transition-all duration-1000 delay-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-robotoserif mb-2">
              Recent Activity
            </h2>
            <p className="text-gray-600 font-quicksand">
              Your latest transactions and financial activities
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300">
            <LastTransactions />
          </div>
        </div>

        
      </div>

      {/* Bottom Spacing */}
      <div className="h-16"></div>

      <Footer />
    </div>
  );
};

export default Home;
