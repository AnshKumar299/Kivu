import React from 'react';
import NavBar from './NavBar';
import BalanceBar from './BalanceBar';
import PieDistribution from './PieDistribution';
import { useSelector } from 'react-redux';
import BalanceComponent from './BalanceComponent';
import LastTransactions from './LastTransactions';
import Footer from './Footer';

const Home = () => {
  const username = useSelector((state) => state.username.name);
  const gender = useSelector((state) => state.username.gender);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Greeting Section */}
      <div className="py-10 px-6 md:px-12 ">
        <h1 className="font-robotoserif font-extrabold text-3xl md:text-5xl text-gray-800">
          Hello,
          <span className="text-orange-800 ml-2">
            {gender === 'male' ? 'Mr.' : 'Ms.'} {username}
          </span>
        </h1>
        <p className="font-quicksand text-base md:text-lg text-slate-600 mt-2">
          Hope you are having a wonderful day!
        </p>
      </div>

      {/* Side-by-Side Section */}
      <div className="flex flex-col md:flex-row justify-center items-start px-4 md:px-12 gap-8">
        {/* Balance Component */}
        <div className="w-full md:w-1/2 max-w-xl">
          <BalanceComponent />
        </div>

        {/* Pie Chart */}
        <div className="w-full md:w-1/2 max-w-xl">
          <PieDistribution />
        </div>
      </div>

      {/* Balance Bar centered below */}
      <div className="flex justify-center items-center px-4 md:px-12 mt-12">
        <div className="w-full mb-12">
          <BalanceBar />
        </div>
      </div>
      <div className="flex justify-center items-center px-4 px-12 mt-12">
        <div className="w-full mb-12">
          <LastTransactions/>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
