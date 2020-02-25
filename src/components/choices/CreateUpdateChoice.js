import React from "react";
import { Link } from "react-router-dom";

function CreateUpdateChoices(props) {
  const [text, setText] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [type, setType] = React.useState("");

  const fetchRecord=()=>{
    fetch('http://localhost:8080/' + props.recordName + "/" + props.match.params.id)
      .then((res)=>{
        return res.json();
      }).then((data)=>{
        setText(data.text);
        setImageUrl(data.imageUrl);
        setType(data.type);
      })
    }

  const handleSubmit=()=>{
    let data = {
      text,
      imageUrl,
      type
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
        placeholder={"Please Enter Text"}
        value={text}
        onChange={(e)=>setText(e.target.value)}
      />
      <input
        placeholder={"Please Enter Image URL"}
        value={imageUrl}
        onChange={(e)=>setImageUrl(e.target.value)}
      />
      <input
        placeholder={"Please Enter Type"}
        value={type}
        onChange={(e)=>setType(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
export default CreateUpdateChoices;
