import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./course.css"

function AddCourse() {
  const [medium, setMedium] = useState("");
  const [mainCourse, setMainCourse] = useState("");
  const [subCourses, setSubCourses] = useState([""]);

  let navigate=useNavigate()

  const handleSubCourseChange = (index, event) => {
    const values = [...subCourses];
    values[index] = event.target.value;
    setSubCourses(values);
  };

  const addSubCourse = () => {
    setSubCourses([...subCourses, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCourse = { medium, mainCourse, subCourses };
    console.log(newCourse);

    try {
      let res = await axios.post("http://localhost:8000/courses", newCourse);
      console.log("res", res);
      if (res.status === 201) {
        alert("Course added successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("There was an error adding the course!", error);
    }
  };

  return <>
    
    <form onSubmit={handleSubmit}className="add-course-form">
    <h1 >Add Course</h1>
      <div className="form-group">
        <label>Medium:</label>
        <input
          type="text"
          value={medium}
          onChange={(e) => setMedium(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Main Course:</label>
        <input
          type="text"
          value={mainCourse}
          onChange={(e) => setMainCourse(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Sub Courses:</label>
        {subCourses.map((subCourse, index) => (
          <div key={index} className="sub-course-group">
            <input
              type="text"
              value={subCourse}
              onChange={(e) => handleSubCourseChange(index, e)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addSubCourse} className="add-subcourse-btn">
          Add Another Sub Course
        </button>
      </div>
      <button type="submit" className="submit-btn">Add Course</button>
    </form>
    </>
}

export default AddCourse;
