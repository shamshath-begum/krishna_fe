import React, { useState, useEffect } from "react";
import axios from "axios";

function CourseSelectionForm() {
  const [mediums, setMediums] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubCourse, setSelectedSubCourse] = useState("");

  useEffect(() => {
    async function fetchMediums() {
      try {
        const response = await axios.get("http://localhost:8000/mediums");
        console.log("response", response);
        setMediums(response.data);
      } catch (error) {
        console.error("Error fetching mediums", error);
      }
    }

    fetchMediums();
  }, []);

  return (
    <form>
      <div>
        <label>Medium:</label>
        <select
          value={selectedMedium}
          onChange={(e) => setSelectedMedium(e.target.value)}
        >
          <option value="">Select Medium</option>
          {mediums.map((medium) => (
            <option key={medium._id} value={medium._id}>
              {medium.name}
            </option>
          ))}
        </select>
      </div>

      {selectedMedium && (
        <div>
          <label>Course:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            {mediums
              .find((m) => m._id === selectedMedium)
              ?.courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
          </select>
        </div>
      )}

      {selectedCourse && (
        <div>
          <label>SubCourse:</label>
          <select
            value={selectedSubCourse}
            onChange={(e) => setSelectedSubCourse(e.target.value)}
          >
            <option value="">Select SubCourse</option>
            {mediums
              .find((m) => m._id === selectedMedium)
              ?.courses.find((c) => c._id === selectedCourse)
              ?.subCourses.map((subCourse) => (
                <option key={subCourse._id} value={subCourse._id}>
                  {subCourse.name}
                </option>
              ))}
          </select>
        </div>
      )}
    </form>
  );
}

export default CourseSelectionForm;
