// src/components/CourseItem.js
import React from 'react';

const CourseItem = ({ course }) => {
  return (
    <div className="course-item p-6 m-4 border rounded-lg shadow-lg bg-white max-w-md hover:shadow-xl transition-all min-h-[172px]">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800 truncate">{course.title}</h2>
      <span className="inline-block mt-2 px-4 py-1 rounded-full text-xs font-semibold bg-blue-200 text-blue-800">
        {course.platform}
      </span>
      <div className="mt-4 overflow-hidden">
        <div className="tags-wrapper">
          {course.tags?.map(tag => (
            <span
              key={tag}
              className="inline-block bg-gray-200 text-gray-700 text-xs font-medium mr-2 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
