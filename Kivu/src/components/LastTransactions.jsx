import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Transaction from './ui/Transaction';
import { NavLink } from 'react-router-dom';

const LastTransactions = () => {
  const txnlist = useSelector((state) => state.transacs.data);
  const isLoading = useSelector((state) => state.transacs.isLoading);
  const error = useSelector((state) => state.transacs.error);
  const [isVisible, setIsVisible] = useState(false);

  // Animation trigger
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setIsVisible(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const sortedList = [...txnlist].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 rounded-3xl border border-sky-200/50 p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-sky-600 rounded-full"></div>
          <h2 className="text-3xl font-bold font-quicksand bg-gradient-to-r from-blue-700 to-sky-700 bg-clip-text text-transparent">
            Recent Transactions
          </h2>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/60 rounded-2xl p-4 animate-pulse">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-6 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl border border-red-200 p-8 shadow-lg">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-700 mb-2">Error Loading Transactions</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative transition-all duration-1000 transform ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
    }`}>
      {/* Background decorative elements */}
      <div className="absolute top-4 right-4 w-24 h-24 bg-blue-200/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-4 left-4 w-20 h-20 bg-sky-200/20 rounded-full blur-xl"></div>

      <div className="relative bg-gradient-to-br from-sky-50 via-blue-50/50 to-cyan-50 rounded-3xl border border-sky-200/50 shadow-xl backdrop-blur-sm overflow-hidden">
        {/* Header Section */}
        <div className="p-6 pb-4 bg-gradient-to-r from-sky-600/5 via-blue-600/5 to-cyan-600/5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-1 h-10 bg-gradient-to-b from-blue-500 to-sky-600 rounded-full"></div>
              <h2 className="text-3xl font-bold font-quicksand bg-gradient-to-r from-blue-700 via-sky-700 to-blue-800 bg-clip-text text-transparent">
                Recent Transactions
              </h2>
            </div>
            
            {/* Transaction count badge */}
            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
              {sortedList.length} total
            </div>
          </div>
          
          <p className="text-sky-600 font-quicksand ml-4">
            Your latest financial activities
          </p>
        </div>

        {/* Transactions List */}
        <div className="px-6 pb-4">
          {sortedList.length === 0 ? (
            // Empty state
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💳</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No Transactions Yet</h3>
              <p className="text-gray-500 font-quicksand mb-6">
                Start by adding your first transaction to see it here
              </p>
              <NavLink
                to="/Transactions"
                className="inline-block bg-gradient-to-r from-blue-600 to-sky-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-sky-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Add Transaction
              </NavLink>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedList.slice(0, 3).map((txn, index) => (
                <div
                  key={txn.id || index}
                  className={`transition-all duration-500 transform hover:scale-[1.02] ${
                    isVisible ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg border border-gray-200/50 transition-all duration-300 overflow-hidden">
                    <Transaction transactionData={txn} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Section */}
        {sortedList.length > 0 && (
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* View more indicator */}
              {sortedList.length > 3 && (
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span className="text-sm font-quicksand">
                    +{sortedList.length - 3} more transactions
                  </span>
                </div>
              )}

              {/* Call to action button */}
              <div className="group">
                <NavLink
                  to="/Transactions"
                  className="relative inline-flex items-center gap-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold font-quicksand text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-sky-500/30 overflow-hidden"
                >
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <span className="relative z-10 flex items-center gap-3">
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    View All Transactions
                  </span>
                </NavLink>
              </div>
            </div>

            {/* Quick stats */}
            {sortedList.length > 0 && (
              <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50">
                <div className="flex flex-wrap gap-6 justify-center text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600 font-robotoserif">
                      {sortedList.filter(txn => txn.type === 'received').length}
                    </div>
                    <div className="text-xs text-gray-600 font-quicksand">Received</div>
                  </div>
                  <div className="w-px h-8 bg-gray-300"></div>
                  <div>
                    <div className="text-2xl font-bold text-red-600 font-robotoserif">
                      {sortedList.filter(txn => txn.type === 'sent').length}
                    </div>
                    <div className="text-xs text-gray-600 font-quicksand">Sent</div>
                  </div>
                  <div className="w-px h-8 bg-gray-300"></div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600 font-robotoserif">
                      {sortedList.length}
                    </div>
                    <div className="text-xs text-gray-600 font-quicksand">Total</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LastTransactions;
