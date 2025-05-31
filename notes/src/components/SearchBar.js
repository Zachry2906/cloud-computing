import React from 'react';

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="p-6 bg-white border-b">
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search notes..." 
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
      </div>
    </div>
  );
}

export default SearchBar;