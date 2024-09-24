import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill Snow theme CSS
import katex from "katex";
import "katex/dist/katex.min.css"; // Import KaTeX CSS for mathematical formulas
import "./questionpaper.css";

const QuestionPaperUpload = () => {
  const [mediums, setMediums] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("");

  const [questionPaper, setQuestionPaper] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Fetch mediums on component mount
    axios
      .get("http://localhost:8000/mediums")
      .then((response) => setMediums(response.data))
      .catch((error) => console.error("Failed to fetch mediums", error));
  }, []);

  useEffect(() => {
    if (selectedMedium) {
      // Fetch subjects when medium is selected
      axios
        .get(`http://localhost:8000/subjects/${selectedMedium}`)
        .then((response) => setSubjects(response.data))
        .catch((error) => console.error("Failed to fetch subjects", error));
    }
  }, [selectedMedium]);

  useEffect(() => {
    if (selectedMedium && selectedSubject) {
      // Fetch chapters when subject is selected
      axios
        .get(
          `http://localhost:8000/chapters/${selectedMedium}/${selectedSubject}`
        )
        .then((response) => setChapters(response.data))
        .catch((error) => console.error("Failed to fetch chapters", error));
    }
  }, [selectedSubject]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handlePreview = () => {
    setPreview({
      questionPaper,
      options,
      answer,
      explanation,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      medium: selectedMedium,
      subject: selectedSubject,
      chapter: selectedChapter,
      questionPaper,
      options,
      answer,
      explanation,
    };
    console.log(data);
    try {
      let res = await axios.post("http://localhost:8000/question-paper", data);
      console.log(res.data);
    } catch (error) {
      console.error("Failed to upload question paper", error);
    }
  };

  

  const modules = {
    toolbar: 
    [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      ["bold", "italic", "underline", "strike", "blockquote",'code-block'],
      [{ script: 'sub' }, { script: 'super' }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }], 
      ["link", "image", "video"],
      ["clean"],
      // [{ formula: [] }], 
      // For mathematical formulas
    ],
    formula: {
      katex: katex, // Configure Katex
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    // "formula",
  ];

  return (
    <div className="question-paper-upload">
      <form onSubmit={handleSubmit}>
        <h2>Upload Question Paper</h2>

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
        <div>
          <label>Question Paper:</label>
          <ReactQuill
            value={questionPaper}
            onChange={setQuestionPaper}
            modules={modules}
            // formats={formats}
            theme="snow" // Theme of the editor
          />
        </div>
        <div>
          <label>Options:</label>
          <div className="options-grid">
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div>
          <label>Answer:</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <div>
          <label>Explanation:</label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </div>
        <button type="button" onClick={handlePreview}>
          Preview
        </button>
        <button type="submit">Submit</button>
      </form>

      {/* Preview Section */}
      {preview && (
        <div className="preview">
          <h3>Preview</h3>
          <p>
            <strong>Question:</strong> {preview.questionPaper}
          </p>
          <div>
            <strong>Options:</strong>
            <ul>
              {preview.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
          <p>
            <strong>Answer:</strong> {preview.answer}
          </p>
          <p>
            <strong>Explanation:</strong> {preview.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionPaperUpload;
