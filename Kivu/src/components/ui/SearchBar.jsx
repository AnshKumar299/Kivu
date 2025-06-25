import React from "react";

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="my-4 w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search by name or category..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default SearchBar;
