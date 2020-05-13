import React from "react";
import "../css/cssfile.css";
import Title from "./Title";
import Description from "./Description";
import Priority from "./Priority";
import Date from "./Date";
import CurrentTime from "./CurrentTime";
function Submit(props) {
  var temp = {
    isCompleted: false,
    title: "",
    description: "",
    priority: "",
    date: "",
    createdOn: <CurrentTime />,
    action: "Pending",
  };
  function getTitle(event) {
    temp = { ...temp, title: event };
  }
  function getDescription(event) {
    temp = { ...temp, description: event };
  }
  function getPriority(event) {
    temp = { ...temp, priority: event };
  }
  function getDate(event) {
    temp = { ...temp, date: event };
  }
  function sendData() {
    props.save(temp);
    console.log(temp);
  }
  return (
    <div className="dialog">
      <form>
        <Title title={getTitle} />
        <br />
        <br />
        <Description desc={getDescription} />
        <br />
        <br />
        <Priority priority={getPriority} />
        <Date date={getDate} />
        <br />
        <br />
        <br />
        <div class="buttons" style={{ float: "right", paddingRight: "200px" }}>
          <a class="btn cancelBtn" onClick={props.cancel}>
            <b>cancel</b>
          </a>
          <a class="btn saveBtn" onClick={sendData}>
            <b> Save</b>
          </a>
        </div>
      </form>
    </div>
  );
}
export default Submit;
