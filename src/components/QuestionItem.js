import React, { useState } from "react";

function QuestionItem({ question, onDelete, }) {
  const { id, prompt, answers, correctIndex } = question;
  const [newCorrectIndex, setNewCorrectIndex] = useState(correctIndex);

  const handleDelete = () => {
    onDelete(id);
  };

  const handleCorrectAnswerChange = async (event) => {
    const newCorrectIndex = parseInt(event.target.value, 10);
    setNewCorrectIndex(newCorrectIndex);

    
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex: newCorrectIndex }),
      });

     
  };

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={newCorrectIndex} onChange={handleCorrectAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
