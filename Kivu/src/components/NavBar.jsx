import React from "react";
import applogo from "../assets/Main-Logo.png";
import userlogo from "../assets/user-logo-default.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const username = useSelector((state) => state.username.name);

  return (
    <div className="bg-amber-950 w-full flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 gap-4 sm:gap-0">
      
      {/* Logo */}
      <div className="flex justify-center sm:justify-start items-center">
        <img src={applogo} alt="logo" className="h-12 sm:h-16" />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-3 sm:gap-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-amber-300 font-quicksand text-lg sm:text-2xl hover:border-b-amber-300 ${
              isActive ? "border-b-2 border-amber-300" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/Reports"
          className={({ isActive }) =>
            `text-amber-300 font-quicksand text-lg sm:text-2xl hover:border-b-amber-300 ${
              isActive ? "border-b-2 border-amber-300" : ""
            }`
          }
        >
          Reports
        </NavLink>
        <NavLink
          to="/Transactions"
          className={({ isActive }) =>
            `text-amber-300 font-quicksand text-lg sm:text-2xl hover:border-b-amber-300 ${
              isActive ? "border-b-2 border-amber-300" : ""
            }`
          }
        >
          Transactions
        </NavLink>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-2 sm:gap-3 bg-amber-800 p-2 rounded-lg self-center sm:self-auto">
        <img src={userlogo} alt="user" className="w-10 h-10" />
        <div className="text-left">
          <h1 className="font-bold text-orange-100 text-sm sm:text-base">
            {username}
          </h1>
          <h4 className="font-light text-orange-500 text-xs sm:text-sm">
            India
          </h4>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
