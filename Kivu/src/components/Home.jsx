import React, { useEffect } from "react";
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

  const { data: username,isError, isLoading,checked } = useSelector((state) => state.username);

  // Check user session when page loads
  useEffect(() => {
    dispatch(fetchUsername());
  },[dispatch]);

  // Wait for the API call to finish before deciding
useEffect(() => {
  if (!isLoading && checked && (!username || isError)) {
    navigate("/login");
  }
}, [isLoading, checked, username, navigate,isError]);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold font-quicksand text-gray-700">Loading...</h1>
      </div>
    );
  }

  if (!username) return null; // Prevent flicker before redirect

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Greeting Section */}
      <div className="py-10 px-6 md:px-12 ">
        <h1 className="font-robotoserif font-extrabold text-3xl md:text-5xl text-gray-800">
          Hello, <span className="text-orange-800 ml-2">{username}</span>
        </h1>
        <p className="font-quicksand text-base md:text-lg text-slate-600 mt-2">
          Hope you are having a wonderful day!
        </p>
      </div>

      {/* Balance + Pie Chart */}
      <div className="flex flex-col md:flex-row justify-center items-start px-4 md:px-12 gap-8">
        <div className="w-full md:w-1/2 max-w-xl">
          <BalanceComponent />
        </div>
        <div className="w-full md:w-1/2 max-w-xl">
          <PieDistribution />
        </div>
      </div>

      {/* Balance Bar */}
      <div className="flex justify-center items-center px-4 md:px-12 mt-12">
        <div className="w-full mb-12">
          <BalanceBar />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="flex justify-center items-center px-4 px-12 mt-12">
        <div className="w-full mb-12">
          <LastTransactions />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
