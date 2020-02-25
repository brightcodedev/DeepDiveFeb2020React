import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "../shared/DeleteButton";

function GetChoices() {
  const [choices, setChoices] = React.useState([]);

  const fetchChoices=()=>{
    fetch('http://localhost:8080/choices')
      .then((res)=>{
        return res.json();
      }).then((data)=>{
        setChoices(data);
      })
    }

  React.useEffect(()=>{
    fetchChoices();
  },[])

  let renderedChoices = choices.map((choice, index)=>{
    return (
      <div key={index}>
        <div>Id: {choice.id}</div>
        <h2>{choice.text}</h2>
        <h4>{choice.imageUrl}</h4>
        <h4>{choice.type}</h4>
        <DeleteButton recordId={choice.id} recordName={"choices"} getRecords={fetchChoices} />
        <Link to={"/choices/" + choice.id}>React Link</Link>
      </div>
    )
  })

  return (
    <div>
      { renderedChoices }
    </div>
  );
}
export default GetChoices;
