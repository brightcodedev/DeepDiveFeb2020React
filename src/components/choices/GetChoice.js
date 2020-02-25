import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "../shared/DeleteButton";

function GetChoice(props) {
  const [choice, setChoice] = React.useState({});

  const fetchChoice=()=>{
    fetch('http://localhost:8080/choices/' + props.match.params.id)
      .then((res)=>{
        return res.json();
      }).then((data)=>{
        if(data) setChoice(data);
      })
    }

  React.useEffect(()=>{
    fetchChoice();
  },[])

  return (
    <div>
      <h2>Get Choice Page</h2>
      <ul>
        <li>{choice.text}</li>
        <li>{choice.imageUrl}</li>
        <li>{choice.type}</li>

        <DeleteButton recordId={choice.id} recordName={"choices"} history={props.history} />
        <Link to={"/choices/" + choice.id + "/update"}>Update</Link>
      </ul>
    </div>
  );
}
export default GetChoice;
