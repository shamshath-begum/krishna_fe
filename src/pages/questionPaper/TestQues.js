import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MathfieldElement } from "mathlive";
import "./questionpaper.css";

// Initialize custom elements for Mathfield
if (!window.customElements.get("math-field")) {
  window.customElements.define("math-field", MathfieldElement);
}

const QuestionPaperUpload = () => {
  const [mediums, setMediums] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [questions, setQuestions] = useState([
    { latex: "", options: ["", "", "", ""], answer: "", explanation: "", image: null },
  ]); // State for multiple questions

  useEffect(() => {
    axios
      .get("http://localhost:8000/mediums")
      .then((response) => setMediums(response.data))
      .catch((error) => console.error("Failed to fetch mediums", error));
  }, []);

  useEffect(() => {
    if (selectedMedium) {
      axios
        .get(`http://localhost:8000/subjects/${selectedMedium}`)
        .then((response) => setSubjects(response.data))
        .catch((error) => console.error("Failed to fetch subjects", error));
    }
  }, [selectedMedium]);

  useEffect(() => {
    if (selectedMedium && selectedSubject) {
      axios
        .get(`http://localhost:8000/chapters/${selectedMedium}/${selectedSubject}`)
        .then((response) => setChapters(response.data))
        .catch((error) => console.error("Failed to fetch chapters", error));
    }
  }, [selectedSubject]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { latex: "", options: ["", "", "", ""], answer: "", explanation: "", image: null },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedQuestions = [...questions];
      updatedQuestions[index].image = file;
      setQuestions(updatedQuestions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a form data for multiple questions
    const formData = new FormData();
    formData.append("medium", selectedMedium);
    formData.append("subject", selectedSubject);
    formData.append("chapter", selectedChapter);

    questions.forEach((question, index) => {
      formData.append(`questions[${index}][latex]`, question.latex);
      formData.append(`questions[${index}][options]`, JSON.stringify(question.options));
      formData.append(`questions[${index}][answer]`, question.answer);
      formData.append(`questions[${index}][explanation]`, question.explanation);
      if (question.image) {
        formData.append(`questions[${index}][image]`, question.image);
      }
    });

    try {
      const res = await axios.post("http://localhost:8000/question-paper", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
    } catch (error) {
      console.error("Failed to upload question paper", error);
    }
  };

  return (
    <div className="question-paper-upload">
      <form onSubmit={handleSubmit}>
        <h2>Upload Question Paper</h2>

        {/* Medium Selection */}
        <div>
          <label>Medium:</label>
          <select onChange={(e) => setSelectedMedium(e.target.value)}>
            <option value="">Select Medium</option>
            {mediums.map((medium) => (
              <option key={medium._id} value={medium.name}>
                {medium.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Selection */}
        <div>
          <label>Subject:</label>
          <select
            onChange={(e) => setSelectedSubject(e.target.value)}
            disabled={!selectedMedium}
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {/* Chapter Selection */}
        <div>
          <label>Chapter:</label>
          <select
            onChange={(e) => setSelectedChapter(e.target.value)}
            disabled={!selectedSubject}
          >
            <option value="">Select Chapter</option>
            {chapters.map((chapter) => (
              <option key={chapter._id} value={chapter.name}>
                {chapter.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Question Input */}
        {questions.map((question, index) => (
          <div key={index} className="question-block">
            <h3>Question {index + 1}</h3>
            {/* Math Editor for Question */}
            <div>
              <label>Question (Math Editor):</label>
              <math-field
                value={question.latex}
                onInput={(e) =>
                  handleQuestionChange(index, "latex", e.target.value)
                }
                style={{ width: "100%", border: "1px solid #ccc" }}
              />
            </div>

            {/* Image Upload for Question */}
            <div>
              <label>Upload Image (Optional):</label>
              <input type="file" accept="image/*" onChange={(e) => handleImageChange(index, e)} />
              {question.image && (
                <div>
                  <p>Image Preview:</p>
                  <img src={URL.createObjectURL(question.image)} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />
                </div>
              )}
            </div>

            {/* Options Input */}
            <div>
              <label>Options:</label>
              <div className="options-grid">
                {question.options.map((option, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
                    placeholder={`Option ${oIndex + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Answer Input */}
            <div>
              <label>Answer:</label>
              <input
                type="text"
                value={question.answer}
                onChange={(e) => handleQuestionChange(index, "answer", e.target.value)}
              />
            </div>

            {/* Explanation Input */}
            <div>
              <label>Explanation:</label>
              <textarea
                value={question.explanation}
                onChange={(e) => handleQuestionChange(index, "explanation", e.target.value)}
              />
            </div>
          </div>
        ))}

        {/* Add New Question Button */}
        <button type="button" onClick={addQuestion}>
          Add Another Question
        </button>

        {/* Submit Button */}
        <button type="submit">Upload Question Paper</button>
      </form>
    </div>
  );
};

export default QuestionPaperUpload;






// we are khbdkjd jhfdlh !@#  weytqwy euryuew !@#   
// 1234456  hahdd khdfld
// 327467632 