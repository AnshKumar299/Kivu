import React, { use } from "react";
import applogo from "../assets/Main-Logo.png";
import userlogo from "../assets/user-logo-default.png";
import { NavLink } from "react-router-dom";
import{ useSelector,useDispatch } from 'react-redux';

const NavBar = () => {
  const username=useSelector((state)=>state.username.name);
  return (
    <div className="bg-amber-950 h-19 flex justify-evenly items-center">
      <div className="h-full flex justify-center items-center">
        <img src={applogo} alt="logo" className="h-4/6" />
      </div>
      <div className="w-3/8 min-w-96 max-w-3/5 h-full flex justify-between">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-amber-300 font-quicksand font-light text-2xl flex items-center hover:border-b-amber-300 h-full ${
              isActive ? "border-b-4 border-amber-300" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/Reports"
          className={({ isActive }) =>
            `text-amber-300 font-quicksand font-light text-2xl flex items-center hover:border-b-amber-300 h-full${
              isActive ? "border-b-4 border-amber-300" : ""
            }`
          }
        >
          Reports
        </NavLink>
        <NavLink
          to="/Transactions"
          className={({ isActive }) =>
            `text-amber-300 font-quicksand font-light text-2xl flex items-center hover:border-b-amber-300 h-full ${
              isActive ? "border-b-4 border-amber-300" : ""
            }`
          }
        >
          Transactions
        </NavLink>
      </div>
      <div className="border-white border-2 flex justify-evenly items-center h-8/11 min-w-28 p-2">
        <img src={userlogo} alt={userlogo} className="size-10 mr-2" />
        <div className="ml-1 my-1">
          <h1 className="font-bold text-orange-100 font-quicksand font-stretch-105% text-sm">
            {username}
          </h1>
          <h4 className="font-light text-orange-500 font-quicksand text-sm ">
            India
          </h4>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
