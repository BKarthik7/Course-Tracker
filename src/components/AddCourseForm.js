// src/components/AddCourseForm.js
import React, { useState } from 'react';
import { capitalizeWords } from '../utils'; // Import the utility function

const AddCourseForm = ({ addCourse, allTags }) => {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      title: capitalizeWords(title),
      platform: capitalizeWords(platform),
      tags: tags.map(tag => capitalizeWords(tag)),
    };
    console.log('Submitting course data:', courseData); // Add this line
    addCourse(courseData).then(() => {
      setTitle('');
      setPlatform('');
      setTags([]);
      setTagInput('');
    });
  };
  

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, capitalizeWords(tagInput)]);
      setTagInput('');
    }
  };  

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <form onSubmit={handleSubmit} className="add-course-form p-6 m-4 border rounded-lg shadow-md bg-gray-50 max-w-lg w-full">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Course Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Platform</label>
        <input
          type="text"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Tags</label>
        <div className="flex">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Add Tag
          </button>
        </div>
        <div className="mt-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Course
      </button>
    </form>
  );
};

export default AddCourseForm;
