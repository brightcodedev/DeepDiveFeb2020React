import React from "react";

function DeleteButton(props) {

  const deleteRecord=()=>{
    fetch('http://localhost:8080/' + props.recordName + '/' + props.recordId, {
      method: "DELETE"
    })
      .then((res)=>{
        return res.json();
      }).then((data)=>{
        if(props.getRecords){
          props.getRecords();
        } else {
            props.history.push("/" + props.recordName)
        }
      })
    }

  return (
    <button onClick={deleteRecord}>Delete</button>
  );
}
export default DeleteButton;
