// src/components/CourseList.js
import React from 'react';
import CourseItem from './CourseItem';

const CourseList = ({ courses }) => {
  return (
    <div className="course-list flex flex-wrap justify-center">
      {courses.map((course, index) => (
        <CourseItem key={index} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
