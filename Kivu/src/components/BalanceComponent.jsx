import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectBalanceByCategory } from '../features/selectors/balanceSelectors';
import { fetchTransacs } from '../features/moneydata/transactionSlice';

function getTop3Spends(balance) {
  return Object.entries(balance)
    .filter(([key]) => !['net', 'savings', 'remaining'].includes(key))
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);
}

function toProperCase(str) {
  return str
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}

const colorMap = {
  rent: { 
    text: 'text-blue-800', 
    bg: 'bg-gradient-to-r from-blue-400 to-blue-500', 
    icon: '🏠',
    accent: 'border-blue-300'
  },
  food: { 
    text: 'text-amber-800', 
    bg: 'bg-gradient-to-r from-amber-400 to-orange-400', 
    icon: '🍽️',
    accent: 'border-amber-300'
  },
  clothing: { 
    text: 'text-red-800', 
    bg: 'bg-gradient-to-r from-red-400 to-pink-400', 
    icon: '👕',
    accent: 'border-red-300'
  },
  taxes: { 
    text: 'text-sky-800', 
    bg: 'bg-gradient-to-r from-sky-400 to-cyan-400', 
    icon: '📊',
    accent: 'border-sky-300'
  },
  bills: { 
    text: 'text-green-800', 
    bg: 'bg-gradient-to-r from-green-400 to-emerald-400', 
    icon: '💡',
    accent: 'border-green-300'
  },
  miscellaneous: { 
    text: 'text-purple-800', 
    bg: 'bg-gradient-to-r from-purple-400 to-pink-400', 
    icon: '📦',
    accent: 'border-purple-300'
  },
  default: { 
    text: 'text-gray-800', 
    bg: 'bg-gradient-to-r from-gray-400 to-slate-400', 
    icon: '💰',
    accent: 'border-gray-300'
  },
};

export default function BalanceComponent() {
  const dispatch = useDispatch();
  const balance = useSelector(selectBalanceByCategory);
  const isLoading = useSelector((state) => state.transacs.isLoading);
  const error = useSelector((state) => state.transacs.error);
  const [isVisible, setIsVisible] = useState(false);
  const [countUp, setCountUp] = useState(0);

  useEffect(() => {
    dispatch(fetchTransacs());
  }, [dispatch]);

  // Animation trigger
  useEffect(() => {
    if (!isLoading && balance.remaining !== undefined) {
      setIsVisible(true);
      
      // Count up animation for balance
      const target = balance.remaining;
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCountUp(target);
          clearInterval(timer);
        } else {
          setCountUp(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isLoading, balance.remaining]);

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg border border-gray-200/50 h-full w-full flex flex-col justify-center items-center p-8">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin absolute top-2 left-2"></div>
        </div>
        <p className="text-xl text-gray-600 mt-4 font-quicksand animate-pulse">
          Loading balance...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl shadow-lg border border-red-200 h-full w-full flex flex-col justify-center items-center p-8">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <p className="text-xl text-red-600 text-center font-quicksand">
          Error loading balance data
        </p>
        <p className="text-sm text-red-500 mt-2 text-center">
          {error}
        </p>
      </div>
    );
  }

  const top3 = getTop3Spends(balance);

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-amber-50/30 rounded-3xl shadow-xl border border-gray-200/50 h-full w-full overflow-hidden hover:shadow-2xl transition-all duration-500">
      {/* Header with Balance */}
      <div className={`p-8 bg-gradient-to-r from-amber-600 to-orange-600 text-white relative overflow-hidden transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
      }`}>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-amber-100 text-sm font-medium">Available Balance</span>
          </div>
          
          <div className="flex items-baseline gap-2">
            <h1 className="font-robotoserif font-extrabold text-2xl">₹</h1>
            <span className="font-robotoserif font-extrabold text-5xl md:text-6xl tracking-tight">
              {countUp.toLocaleString()}
            </span>
            <span className="font-robotoserif font-bold text-2xl">.00</span>
          </div>
          
          <p className="font-quicksand text-amber-100 text-lg mt-2">
            remaining balance
          </p>

          {/* Balance status indicator */}
          <div className="mt-4 flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              balance.remaining > 10000 
                ? 'bg-green-500/20 text-green-100 border border-green-400/30' 
                : balance.remaining > 5000 
                ? 'bg-yellow-500/20 text-yellow-100 border border-yellow-400/30'
                : 'bg-red-500/20 text-red-100 border border-red-400/30'
            }`}>
              {balance.remaining > 25000 ? '💚 Healthy' : balance.remaining > 10000 ? '⚠️ Moderate' : '🚨 Low'}
            </div>
          </div>
        </div>
      </div>

      {/* Top Spends Section */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
          <h2 className="font-quicksand text-2xl font-bold bg-gradient-to-r from-red-700 to-orange-700 bg-clip-text text-transparent">
            Top 3 Spending Categories
          </h2>
        </div>

        {top3.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📊</div>
            <p className="font-quicksand">No spending data available</p>
          </div>
        ) : (
          <div className="space-y-3">
            {top3.map(([category, amount], index) => {
              const categoryData = colorMap[category] || colorMap.default;
              const { text, bg, icon, accent } = categoryData;
              
              return (
                <div
                  key={category}
                  className={`group transition-all duration-500 transform hover:scale-105 ${
                    isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className={`${bg} rounded-2xl shadow-lg border ${accent} overflow-hidden hover:shadow-xl transition-all duration-300`}>
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl bg-white/20 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm">
                          {icon}
                        </div>
                        <div>
                          <p className={`${text} font-bold text-lg font-quicksand`}>
                            {toProperCase(category)}
                          </p>
                          <p className="text-white/80 text-sm">
                            #{index + 1} highest spend
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`${text} font-bold text-xl font-robotoserif`}>
                          ₹{amount.toLocaleString()}
                        </p>
                        <div className="w-16 h-2 bg-white/30 rounded-full mt-1">
                          <div 
                            className="h-full bg-white/60 rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${Math.min((amount / Math.max(...top3.map(([, amt]) => amt))) * 100, 100)}%`,
                              transitionDelay: `${(index + 1) * 300}ms`
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Summary footer */}
        {top3.length > 0 && (
          <div className={`mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-200 transition-all duration-700 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium font-quicksand">
                Total spent in top 3:
              </span>
              <span className="font-bold text-gray-800 font-robotoserif text-lg">
                ₹{top3.reduce((sum, [, amount]) => sum + amount, 0).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
