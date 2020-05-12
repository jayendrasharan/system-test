import React from "react";
function Date() {
  return (
    <div style={{ float: "right", paddingLeft: "40px" }}>
      <label for="Date">Date: </label>
      <input type="date" id="Date" name="Date"></input>
    </div>
  );
}
export default Date;
