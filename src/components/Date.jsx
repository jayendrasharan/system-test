import React from "react";
function Date(props) {
  function changes(event) {
    props.date(event.target.value);
  }
  return (
    <div style={{ float: "right", paddingLeft: "40px" }}>
      <label for="Date">Date: </label>
      <input type="date" id="Date" name="Date" onChange={changes}></input>
    </div>
  );
}
export default Date;
