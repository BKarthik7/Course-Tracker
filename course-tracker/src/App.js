import React, { useState, useEffect } from 'react';
import CourseList from './components/CourseList';
import AddCourseForm from './components/AddCourseForm';
import FilterBar from './components/FilterBar';
import TagFilterBar from './components/TagFilterBar'; // New component for tag filtering
import './App.css';

function App() {
  const [courses, setCourses] = useState([]);
  const [platformFilter, setPlatformFilter] = useState('All');
  const [tagFilter, setTagFilter] = useState('');
  const [allTags, setAllTags] = useState(new Set()); // Store all unique tags

  useEffect(() => {
    // Update allTags whenever courses change
    const updatedTags = new Set();
    courses.forEach(course => {
      course.tags.forEach(tag => updatedTags.add(tag));
    });
    setAllTags(updatedTags);
  }, [courses]);

  const addCourse = (course) => {
    setCourses([...courses, course]);
  };

  const filteredCourses = courses.filter(course => {
    const matchesPlatform = platformFilter === 'All' || course.platform === platformFilter;
    const matchesTag = tagFilter === '' || course.tags.includes(tagFilter);
    return matchesPlatform && matchesTag;
  });

  return (
    <div className="App container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">Course Tracker</h1>
      <AddCourseForm addCourse={addCourse} allTags={Array.from(allTags)} />
      <div className="flex justify-between">
        <FilterBar setFilter={setPlatformFilter} />
        <TagFilterBar setTagFilter={setTagFilter} allTags={Array.from(allTags)} /> {/* Pass allTags here */}
      </div>
      <CourseList courses={filteredCourses} />
    </div>
  );
}

export default App;
