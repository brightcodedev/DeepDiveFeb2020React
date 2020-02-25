import React from "react";
import { Link } from "react-router-dom";
import {Typeahead} from 'react-bootstrap-typeahead';
import {FormGroup} from 'react-bootstrap';

function CreateUpdateQuestions(props) {
  const [choices, setChoices] = React.useState([]);
  const [selectedChoices, setSelectedChoices] = React.useState([]);
  const [selectedAnswers, setSelectedAnswers] = React.useState([]);

  const [header, setHeader] = React.useState("");
  const [subHeader, setSubHeader] = React.useState("");

  const fetchQuestion=()=>{
    fetch('http://localhost:8080/' + props.recordName + "/" + props.match.params.id)
      .then((res)=>{
        return res.json();
      }).then((data)=>{
        setHeader(data.header);
        setSubHeader(data.subHeader);
      })
    }

  const fetchChoices=()=>{
    fetch('http://localhost:8080/choices')
      .then((res)=>{
        return res.json();
      }).then((data)=>{
        setChoices(data);
      })
    }

  const handleSubmit=()=>{
    let selectedIdArr = selectedChoices.map((choice)=>choice.id);
    let setAnswersIdArr = selectedAnswers.map((answer)=>answer.id);
    let data = {
      header,
      subHeader,
      choices:selectedIdArr,
      answers:setAnswersIdArr
    }
    let url = "http://localhost:8080/" + props.recordName;
    let id = props.match.params.id;

    if(id) url += "/" + id;

    let method = id ? "PUT" : "POST";
    const response = fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(()=>{
      props.history.push("/" + props.recordName);
    }).catch((err)=>{
      console.log(err);
    })
  }
  React.useEffect(()=>{
    if(props.match.params.id){
      fetchQuestion();
    }
    fetchChoices();
  }, [])
  return (
    <>
      <input
        placeholder={"Please Enter Header"}
        value={header}
        onChange={(e)=>setHeader(e.target.value)}
      />
      <input
        placeholder={"Please Enter Sub Header"}
        value={subHeader}
        onChange={(e)=>setSubHeader(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <FormGroup>
        <Typeahead
          onChange={selected=>setSelectedChoices(selected)}
          labelKey={(option) => option.text}
          multiple={true}
          options={choices.map((choice)=>{
            return {id:choice.id, text:choice.text};
          })}
          placeholder="Choose selections..."
        />
        <Typeahead
          onChange={selected=>setSelectedAnswers(selected)}
          labelKey={(option) => option.text}
          multiple={true}
          options={selectedChoices}
          placeholder="Choose answers..."
        />
      </FormGroup>

    </>

  );
}
export default CreateUpdateQuestions;
