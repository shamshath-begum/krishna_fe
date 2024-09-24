import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './course.css';
import { useNavigate } from 'react-router-dom';

function CourseDetails() {
  const [courses, setCourses] = useState([]);

let navigate=useNavigate()

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/courses');
      setCourses(response.data);
    } catch (error) {
      console.error("There was an error fetching the courses!", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    try {
      let res=await axios.delete(`http://localhost:8000/courses/${id}`);
      if(res.status===200){
        fetchCourses();
        alert("Course deleted successfully!");
      }
    //   setCourses(courses.filter((course) => course._id !== id));
     
    } catch (error) {
      console.error("Error deleting course!", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-course/${id}`);
  };

  return (
    <div className="course-table-container">
      <h1>Course Details</h1>
      <table className="course-table">
        <thead>
          <tr>
            <th>Medium</th>
            <th>Main Course</th>
            <th>Sub Courses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{course.medium}</td>
              <td>{course.mainCourse}</td>
              <td>
                <ul>
                  {course.subCourses.map((subCourse, idx) => (
                    <li key={idx}>{subCourse}</li>
                  ))}
                </ul>
              </td>
              <td>
                <button onClick={() => handleEdit(course._id)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(course._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseDetails;
