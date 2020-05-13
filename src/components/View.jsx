import React from "react";
import "../css/cssfile.css";
function View(props) {
  // var temp = {
  //   isCompleted: false,
  //   title: "",
  //   description: "",
  //   priority: "",
  //   date: "",
  //   createdOn: <CurrentTime />,
  //   action: "Pending",
  // };
  var tmp = props.send;
  console.log(tmp);
  return (
    <div className="dialog">
      <b>Title: </b>
      {tmp.title}
      <br />
      <br />
      <b>Description: </b>
      {tmp.description}
      <br />
      <br />
      <b>Priority: </b> {tmp.priority}
      <br />
      <br />
      <b>CreatedOn: </b>
      {tmp.createdOn}
      <br />
      <br />
      <b> DueDate:</b> {tmp.date}
      <br />
      <br />
      <b>Action: </b>
      {tmp.action}
      <br></br>
      <div class="buttons" style={{ float: "right", paddingRight: "200px" }}>
        <a class="btn cancelBtn" onClick={props.cancel}>
          <b>cancel</b>
        </a>
      </div>
    </div>
  );
}
export default View;
