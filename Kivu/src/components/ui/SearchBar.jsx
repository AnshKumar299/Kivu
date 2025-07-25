import React, { useState } from "react";

const SearchBar = ({ query, setQuery }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Search container with gradient border effect */}
      <div className={`relative bg-gradient-to-r p-0.5 rounded-2xl transition-all duration-300 ${
        isFocused 
          ? 'from-blue-500 via-purple-500 to-indigo-500 shadow-lg' 
          : 'from-gray-300 to-gray-400'
      }`}>
        <div className="relative bg-white rounded-2xl">
          {/* Search icon */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg 
              className={`w-5 h-5 transition-colors duration-300 ${
                isFocused ? 'text-blue-500' : 'text-gray-400'
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search by name, category, or amount..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full pl-12 pr-12 py-4 bg-transparent border-none rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none font-medium"
          />

          {/* Clear button */}
          {query && (
            <button
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-4 flex items-center group"
            >
              <div className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110">
                <svg 
                  className="w-3 h-3 text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Search suggestions/info - Only show when focused AND no query */}
      {isFocused && !query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-sm text-gray-600 space-y-2">
            <div className="font-medium text-gray-800 mb-3">Search Tips:</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>Search by transaction name or description</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Filter by category (food, bills, etc.)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span>Find by amount (e.g., "500" or "1000")</span>
            </div>
          </div>
        </div>
      )}

      {/* Current search indicator - Show when there's a query */}
      {query && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-3 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-sm">
            <span className="text-gray-500">Searching for: </span>
            <span className="font-medium text-gray-700 bg-blue-50 px-2 py-1 rounded">"{query}"</span>
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-200/30 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-purple-200/30 rounded-full animate-pulse delay-300"></div>
    </div>
  );
};

export default SearchBar;
