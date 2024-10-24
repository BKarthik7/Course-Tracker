// src/components/FilterBar.js
import React from 'react';

const FilterBar = ({ setFilter }) => {
  const platforms = ['Udemy', 'Coursera', 'Youtube', 'All'];

  return (
    <div className="filter-bar flex justify-center my-4">
      {platforms.map(platform => (
        <button
          key={platform}
          onClick={() => setFilter(platform)}
          className="mx-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          {platform}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
