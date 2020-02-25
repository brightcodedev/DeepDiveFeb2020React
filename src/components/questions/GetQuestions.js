import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "../shared/DeleteButton";

function GetQuestions() {
  const [questions, setQuestions] = React.useState([]);

  const fetchQuestions=()=>{
    fetch('http://localhost:8080/questions')
      .then((res)=>{
        return res.json();
      }).then((data)=>{
        setQuestions(data);
      })
    }

  React.useEffect(()=>{
    fetchQuestions();
  },[])

  let renderedQuestions = questions.map((question, index)=>{
    return (
      <div key={index}>
        <div>Id: {question.id}</div>
        <h2>{question.header}</h2>
        <h4>{question.subHeader}</h4>
        <DeleteButton recordId={question.id} recordName={"questions"} getRecords={fetchQuestions} />
        <Link to={"/questions/" + question.id}>React Link</Link>
      </div>
    )
  })

  return (
    <div>
      <Link to="choices/create">Create Choice</Link>
      <Link to="choices">See Choices</Link>
      { renderedQuestions }
    </div>
  );
}
export default GetQuestions;
