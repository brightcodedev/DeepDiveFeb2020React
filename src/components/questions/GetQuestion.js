import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "../shared/DeleteButton";

function GetQuestion(props) {
  const [question, setQuestion] = React.useState({});

  const fetchQuestion=()=>{
    fetch('http://localhost:8080/questions/' + props.match.params.id)
      .then((res)=>{
        return res.json();
      }).then((data)=>{
        if(data) setQuestion(data);
      })
    }

  React.useEffect(()=>{
    fetchQuestion();
  },[])

  return (
    <div>
      <h2>Get Question Page</h2>
      <ul>
        <li>{question.header}</li>
        <li>{question.subHeader}</li>
        <DeleteButton recordId={question.id} recordName={"questions"} history={props.history} />
        <Link to={"/questions/" + question.id + "/update"}>Update</Link>
      </ul>
    </div>
  );
}
export default GetQuestion;
