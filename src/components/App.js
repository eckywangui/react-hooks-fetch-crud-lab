import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]); 
  
  const deleteQuestion = (questionId) => {
    
    setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== questionId));
  };

  
  useEffect(() => {
    if (page === "List") {
      fetch("http://localhost:4000/questions") 
        .then((response) => response.json())
        .then((data) => setQuestions(data))
    }
  }, [page]);

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm /> : <QuestionList questions={questions} onDeleteQuestion={deleteQuestion}/>}
    </main>
  );
}

export default App;
