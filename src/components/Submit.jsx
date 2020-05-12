import React from "react";
import "../css/cssfile.css";
import Title from "./Title";
import Description from "./Description";
import Priority from "./Priority";
import Date from "./Date";
function Submit(props) {
  return (
    <div className="dialog">
      <form>
        <Title />
        <br />
        <br />
        <Description />
        <br />
        <br />
        <Priority />
        <Date />
        <br />
        <br />
        <br />
        <div class="buttons" style={{ float: "right", paddingRight: "200px" }}>
          <a class="btn cancelBtn" onClick={props.cancel}>
            cancel
          </a>
          <a class="btn saveBtn" onClick={props.save}>
            Save
          </a>
        </div>
      </form>
    </div>
  );
}
export default Submit;
