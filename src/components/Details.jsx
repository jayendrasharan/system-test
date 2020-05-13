import React from "react";
import "../css/cssfile.css";
function Details(props) {
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
            Delete
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
