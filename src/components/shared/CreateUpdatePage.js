import React from "react";
import { Link } from "react-router-dom";

function CreateUpdateRecord(props) {
  const [record, setRecord] = React.useState({});

  // const [header, setHeader] = React.useState("");
  // const [subHeader, setSubHeader] = React.useState("");

  const fetchRecord=()=>{
    fetch('http://localhost:8080/' + props.recordName + "/" + props.match.params.id)
      .then((res)=>{
        return res.json();
      }).then((data)=>{

        const filtered = Object.keys(data)
          .filter(key => props.fields.includes(key))
          .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
          }, {});
        setRecord(filtered);
      })
    }

  // const handleSubmit=()=>{
  //   let data = {
  //     header,
  //     subHeader
  //   }
  //   let url = "http://localhost:8080/" + props.recordName;
  //   let id = props.match.params.id;
  //
  //   if(id) url += "/" + id;
  //
  //   let method = id ? "PUT" : "POST";
  //   const response = fetch(url, {
  //     method: method,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   }).then(()=>{
  //     props.history.push("/" + props.recordName);
  //   }).catch((err)=>{
  //     console.log(err);
  //   })
  // }
  React.useEffect(()=>{
    if(props.match.params.id){
      fetchRecord();
    }
  }, []);
  const handleRecordChange=()=>{

  }
  let inputArr=[];
  for (let [key, value] of Object.entries(record)) {
    inputArr.push(<input key={key} placeholder={key} onChange={handleRecordChange(key, value)} />)
  }
  return (
    <>
    {inputArr}
    </>
  );
}
export default CreateUpdateRecord;
