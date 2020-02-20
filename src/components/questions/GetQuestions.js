import React from "react";

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
        <h2>{question.header}</h2>
        <h4>{question.subHeader}</h4>
      </div>
    )
  })


  return (
    <div>
      { renderedQuestions }
    </div>
  );
}
export default GetQuestions;
