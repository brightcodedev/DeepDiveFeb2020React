import React from "react";
import { Link } from "react-router-dom";

function CreateUpdateQuestions(props) {
  const [header, setHeader] = React.useState("");
  const [subHeader, setSubHeader] = React.useState("");

  const fetchRecord=()=>{
    fetch('http://localhost:8080/' + props.recordName + "/" + props.match.params.id)
      .then((res)=>{
        return res.json();
      }).then((data)=>{
        setHeader(data.header);
        setSubHeader(data.subHeader);
      })
    }

  const handleSubmit=()=>{
    let data = {
      header,
      subHeader
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
      fetchRecord();
    }
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
    </>
  );
}
export default CreateUpdateQuestions;
