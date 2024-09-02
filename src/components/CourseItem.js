// src/components/CourseItem.js
import React from 'react';

const CourseItem = ({ course }) => {
  return (
    <div className="course-item p-6 m-4 border rounded-lg shadow-lg bg-white max-w-sm">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{course.title}</h2>
      <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-200 text-blue-800">
        {course.platform}
      </span>
      <div className="mt-2">
        {course.tags?.map(tag => ( 
          <span
            key={tag}
            className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CourseItem;
