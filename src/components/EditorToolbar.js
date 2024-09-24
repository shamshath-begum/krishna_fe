import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const EditorToolbar = () => {
  const [questions, setQuestions] = useState([{ id: 1, questionText: '', mathExpression: '' }]);

  const handleQuestionChange = (id, field, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, [field]: value } : question
      )
    );
  };

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { id: prevQuestions.length + 1, questionText: '', mathExpression: '' },
    ]);
  };

  const handleRemoveQuestion = (id) => {
    setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
  };

  return (
    <div>
      <h1>Question Paper Upload</h1>

      {questions.map((question) => (
        <div key={question.id} className="question-container">
          <input
            type="text"
            placeholder="Enter Question"
            value={question.questionText}
            onChange={(e) => handleQuestionChange(question.id, 'questionText', e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Math Expression (LaTeX)"
            value={question.mathExpression}
            onChange={(e) => handleQuestionChange(question.id, 'mathExpression', e.target.value)}
          />

          <div className="math-render">
            <BlockMath>{question.mathExpression}</BlockMath>
          </div>

          <button onClick={() => handleRemoveQuestion(question.id)}>Remove Question</button>
        </div>
      ))}

      <button onClick={handleAddQuestion}>Add Question</button>
    </div>
  );
};

export default EditorToolbar;
