//src/App.js
import React, { useState, useEffect } from 'react';
import CourseList from './components/CourseList';
import AddCourseForm from './components/AddCourseForm';
import FilterBar from './components/FilterBar';
import TagFilterBar from './components/TagFilterBar';
import { fetchCourses, addCourse, fetchTags } from './services/courseService';
import './App.css';

function App() {
  const [courses, setCourses] = useState([]);
  const [platformFilter, setPlatformFilter] = useState('All');
  const [tagFilter, setTagFilter] = useState('');
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    // Fetch courses and tags from Supabase
    const loadData = async () => {
      const fetchedCourses = await fetchCourses();
      setCourses(fetchedCourses);

      const fetchedTags = await fetchTags();
      setAllTags(fetchedTags.map(tag => tag.name)); // Assuming tag has a name property
    };

    loadData();
  }, []);

  // Refresh data on course addition
  const handleAddCourse = async (course) => {
    const newCourse = await addCourse(course);
    if (newCourse) {
      // Fetch updated data
      const fetchedCourses = await fetchCourses();
      setCourses(fetchedCourses);

      // Fetch updated tags
      const fetchedTags = await fetchTags();
      console.log('Fetched tags:', fetchedTags);
      setAllTags(fetchedTags.map(tag => tag.name)); // Update tags list
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesPlatform = platformFilter === 'All' || course.platform === platformFilter;
    const matchesTag = tagFilter === '' || course.tags.includes(tagFilter);
    return matchesPlatform && matchesTag;
  });

  return (
    <div className="App container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">Course Tracker</h1>
      <AddCourseForm addCourse={handleAddCourse} allTags={allTags} />
      <div className="flex justify-between w-full max-w-lg">
        <FilterBar setFilter={setPlatformFilter} />
        <TagFilterBar setTagFilter={setTagFilter} allTags={allTags} />
      </div>
      <CourseList courses={filteredCourses} />
    </div>
  );
}

export default App;
