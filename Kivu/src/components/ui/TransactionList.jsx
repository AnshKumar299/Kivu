import React, { useState, useEffect } from 'react';
import Transaction from './Transaction';

const TransactionList = ({ list }) => {
  const [sortedList, setSortedList] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // Sort descending by timestamp whenever `list` changes
  useEffect(() => {
    const sorted = [...list].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    setSortedList(sorted);
  }, [list]);

  // Animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Empty state with softer design
  if (!sortedList.length) {
    return (
      <div className="flex justify-center m-3">
        <div className="relative w-full max-w-3xl mx-auto p-16 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 rounded-3xl shadow-lg border border-slate-200">
          {/* Subtle background elements */}
          <div className="absolute top-8 left-8 w-16 h-16 bg-blue-200/20 rounded-full"></div>
          <div className="absolute bottom-8 right-8 w-12 h-12 bg-indigo-200/20 rounded-full"></div>
          
          <div className="text-center relative z-10">
            <div className="text-6xl mb-6">💳</div>
            <h3 className="text-2xl font-bold text-slate-700 mb-4 font-robotoserif">
              No Transactions Yet
            </h3>
            <p className="text-slate-600 text-lg font-quicksand mb-6 max-w-md mx-auto">
              Start your financial journey by adding your first transaction.
            </p>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200">
              <p className="text-slate-700 font-medium">
                Ready to track your money? Add a transaction to get started!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center m-3">
      {/* Subtle floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-blue-100/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-indigo-100/30 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-32 w-16 h-16 bg-slate-100/40 rounded-full blur-lg"></div>
      </div>

      <div className={`relative w-full max-w-3xl mx-auto transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      }`}>
        {/* Main container with calmer gradient */}
        <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8 m-12 rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          {/* Minimal decorative elements */}
          <div className="absolute top-4 right-4 w-16 h-16 bg-blue-100/30 rounded-full blur-lg"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-indigo-100/30 rounded-full blur-md"></div>

          {/* Header with calmer styling */}
          <div className="relative z-10 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-1 h-10 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
              <h1 className="font-robotoserif text-3xl font-bold text-slate-800">
                Transaction History
              </h1>
            </div>
            
            {/* Stats bar with softer colors */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium font-quicksand">
                    {sortedList.length} Total Transactions
                  </span>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full border border-green-200">
                    {sortedList.filter(t => t.type === 'received').length} Received
                  </span>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full border border-red-200">
                    {sortedList.filter(t => t.type === 'sent').length} Sent
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction list with subtle animations */}
          <div className="relative z-10 space-y-4">
            {sortedList.map((txn, idx) => (
              <div
                key={txn._id || idx}
                className={`transition-all duration-500 transform hover:scale-[1.02] ${
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Subtle wrapper for each transaction */}
                <div className="relative group">
                  {/* Gentle hover effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  
                  {/* Transaction component wrapper */}
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
                    <Transaction transactionData={txn} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Simple footer without distracting elements */}
          <div className="relative z-10 mt-8 pt-6 border-t border-slate-200">
            <div className="text-center">
              <div className="text-slate-600 font-medium font-quicksand">
                Keep tracking your financial journey
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
