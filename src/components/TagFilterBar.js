// src/components/TagFilterBar.js
import React from 'react';

const TagFilterBar = ({ setTagFilter, allTags }) => {
  return (
    <div className="tag-filter-bar flex my-4">
      <label className="block text-gray-700 text-sm font-bold mr-2">Filter by Tag:</label>
      <select
        onChange={(e) => setTagFilter(e.target.value)}
        className="bg-gray-200 text-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Tags</option>
        {allTags.map(tag => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </select>
    </div>
  );
};

export default TagFilterBar;
