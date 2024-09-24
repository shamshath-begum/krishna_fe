import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import MathQuill, { addStyles as addMathquillStyles } from 'react-mathquill';
import 'react-quill/dist/quill.snow.css';
import 'katex/dist/katex.min.css'; // If you plan to use KaTeX for rendering
import katex from 'katex'; // For rendering LaTeX equations

// Call this at the top level to add MathQuill styles
addMathquillStyles();

const QuestionPaperEditor = () => {
  const [editorMode, setEditorMode] = useState('quill'); // Switch between Quill and MathQuill
  const [equation, setEquation] = useState(''); // LaTeX for MathQuill
  const [content, setContent] = useState(''); // Content from Quill
  const [questions, setQuestions] = useState([]); // Array to store each question's content

  // Handle Quill content change
  const handleQuillChange = (value) => {
    setContent(value); // Store Quill content
  };

  // Handle MathQuill content change
  const handleEquationChange = (mathField) => {
    setEquation(mathField.latex()); // Store LaTeX equation
  };

  // Add the current content to the questions array
  const addQuestion = () => {
    setQuestions([...questions, { content, equation }]);
    setContent(''); // Clear Quill content
    setEquation(''); // Clear MathQuill equation
  };

  // Render LaTeX equation using KaTeX
  const renderLatex = (latex) => {
    return { __html: katex.renderToString(latex) };
  };

  return (
    <div>
      {/* Switch between Quill and MathQuill */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setEditorMode('quill')}>Text Editor</button>
        <button onClick={() => setEditorMode('mathquill')}>Math Editor</button>
      </div>

      {/* Quill Editor */}
      {editorMode === 'quill' && (
        <ReactQuill
          value={content}
          onChange={handleQuillChange}
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['image'],
              ['clean'],
            ],
          }}
          placeholder="Write your question here..."
          style={{ height: '200px' }}
        />
      )}

      {/* MathQuill Editor */}
      {editorMode === 'mathquill' && (
        <MathQuill
          latex={equation}
          onChange={handleEquationChange}
          mathquillDidMount={(mathField) => setEquation(mathField.latex())}
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            minHeight: '50px',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        />
      )}

      <button onClick={addQuestion}>Add Question</button>

      {/* Display all questions */}
      <div>
        {questions.map((question, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            {/* Render Quill Content */}
            <div dangerouslySetInnerHTML={{ __html: question.content }} />
            {/* Render MathQuill (LaTeX) */}
            {question.equation && (
              <div
                style={{ padding: '10px', border: '1px solid #ccc' }}
                dangerouslySetInnerHTML={renderLatex(question.equation)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPaperEditor;
