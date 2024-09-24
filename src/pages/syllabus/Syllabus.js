import React, { useState } from "react";
import axios from "axios";
import "./syllabus.css";

function AddSyllabus() {
  const [mediums, setMediums] = useState([{ name: "", subjects: [{ name: "", chapters: [""] }] }]);

  // Handle Medium Change
  const handleMediumChange = (index, event) => {
    const updatedMediums = [...mediums];
    updatedMediums[index].name = event.target.value;
    setMediums(updatedMediums);
  };

  // Handle Subject Change
  const handleSubjectChange = (mediumIndex, subjectIndex, event) => {
    const updatedMediums = [...mediums];
    updatedMediums[mediumIndex].subjects[subjectIndex].name = event.target.value;
    setMediums(updatedMediums);
  };

  // Handle Chapter Change
  const handleChapterChange = (mediumIndex, subjectIndex, chapterIndex, event) => {
    const updatedMediums = [...mediums];
    updatedMediums[mediumIndex].subjects[subjectIndex].chapters[chapterIndex] = event.target.value;
    setMediums(updatedMediums);
  };

  // Add New Medium
  const addMedium = () => {
    setMediums([...mediums, { name: "", subjects: [{ name: "", chapters: [""] }] }]);
  };

  // Add New Subject
  const addSubject = (mediumIndex) => {
    const updatedMediums = [...mediums];
    updatedMediums[mediumIndex].subjects.push({ name: "", chapters: [""] });
    setMediums(updatedMediums);
  };

  // Add New Chapter
  const addChapter = (mediumIndex, subjectIndex) => {
    const updatedMediums = [...mediums];
    updatedMediums[mediumIndex].subjects[subjectIndex].chapters.push("");
    setMediums(updatedMediums);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/syllabus", { mediums });
      if (response.status === 201) {
        alert("Syllabus added successfully!");
        setMediums([{ name: "", subjects: [{ name: "", chapters: [""] }] }]); // Reset form
      }
    } catch (error) {
      console.error("There was an error adding the syllabus!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-syllabus-form">
      <h1>Add Syllabus</h1>
      {mediums.map((medium, mediumIndex) => (
        <div key={mediumIndex} className="medium-group">
          <h2>Medium {mediumIndex + 1}</h2>
          <input
            type="text"
            placeholder="Medium Name"
            value={medium.name}
            onChange={(e) => handleMediumChange(mediumIndex, e)}
            required
          />
          {medium.subjects.map((subject, subjectIndex) => (
            <div key={subjectIndex} className="subject-group">
              <h3>Subject {subjectIndex + 1}</h3>
              <input
                type="text"
                placeholder="Subject Name"
                value={subject.name}
                onChange={(e) => handleSubjectChange(mediumIndex, subjectIndex, e)}
                required
              />
              {subject.chapters.map((chapter, chapterIndex) => (
                <div key={chapterIndex} className="chapter-group">
                  <input
                    type="text"
                    placeholder="Chapter Name"
                    value={chapter}
                    onChange={(e) => handleChapterChange(mediumIndex, subjectIndex, chapterIndex, e)}
                    required
                  />
                </div>
              ))}
              <button type="button" onClick={() => addChapter(mediumIndex, subjectIndex)} className="add-chapter-btn">
                Add Another Chapter
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addSubject(mediumIndex)} className="add-subject-btn">
            Add Another Subject
          </button>
        </div>
      ))}
      <button type="button" onClick={addMedium} className="add-medium-btn">
        Add Another Medium
      </button>
      <button type="submit" className="submit-btn">Add Syllabus</button>
    </form>
  );
}

export default AddSyllabus;
