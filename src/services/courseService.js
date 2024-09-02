// src/services/courseService.js
import { supabase } from "../utils/supabase";

// Fetch all courses
export const fetchCourses = async () => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
  return data;
};

// Add a new course
export const addCourse = async (course) => {
  console.log('Course data before adding:', course);
  if (!course || !course.title || !course.platform || !Array.isArray(course.tags)) {
    console.error('Invalid course data:', course);
    return null;
  }

  // Insert course into the courses table
  const { data: courseData, error: courseError } = await supabase
    .from('courses')
    .insert([{
      title: course.title,
      platform: course.platform,
      tags: course.tags,
      created_at: new Date().toISOString() // Ensure you set the creation timestamp
    }])
    .select();

  if (courseError) {
    console.error('Error adding course:', courseError.message);
    return null;
  }

  if (!courseData || courseData.length === 0) {
    console.error('No data returned after inserting course.');
    return null;
  }

  const courseId = courseData[0].id;

  // Handle tags
  const tagInsertions = course.tags.map(async (tag) => {
    // Check if the tag already exists
    const { data: tagData, error: tagError } = await supabase
      .from('tags')
      .select('id')
      .eq('name', tag);

    if (tagError) {
      console.error('Error fetching tag:', tagError.message);
      return null;
    }

    let tagId;
    if (tagData.length > 0) {
      // Tag exists, get the ID
      tagId = tagData[0].id;
    } else {
      // Tag does not exist, insert new tag
      const { data: newTagData, error: newTagError } = await supabase
        .from('tags')
        .insert([{ name: tag }])
        .select();

      if (newTagError) {
        console.error('Error adding tag:', newTagError.message);
        return null;
      }

      tagId = newTagData[0].id;
    }

    // Insert course-tag relation
    const { error: courseTagError } = await supabase
      .from('course_tags')
      .insert([{ course_id: courseId, tag_id: tagId }]);

    if (courseTagError) {
      console.error('Error adding course-tag relation:', courseTagError.message);
    }
  });

  await Promise.all(tagInsertions);

  return courseData[0];
};


// Fetch all tags
export const fetchTags = async () => {
  const { data, error } = await supabase
    .from('tags')
    .select('*');

  if (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
  return data;
};
