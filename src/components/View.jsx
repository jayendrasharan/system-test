import React from "react";
import "../css/cssfile.css";
import Title from "./Title";
import Description from "./Description";
import Priority from "./Priority";
import Date from "./Date";
import CurrentTime from "./CurrentTime";
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
  var tmp = props;
  return (
    <div className="dialog">
      <form>
        Title: {props.title}
        <br />
        <br />
        Description: {props.description}
        <br />
        <br />
        Priority: {props.priority}
        <br />
        <br />
        CreatedOn: {props.createdOn}
        <br />
        <br />
        DueDate: {props.date}
        <br></br>
        Action: {props.action}
        <br></br>
        <div class="buttons" style={{ float: "right", paddingRight: "200px" }}>
          <a class="btn cancelBtn" onClick={props.cancel}>
            cancel
          </a>
        </div>
      </form>
    </div>
  );
}
export default View;
