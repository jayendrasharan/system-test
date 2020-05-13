import React from "react";
function Description(props) {
  function changes(event) {
    props.desc(event.target.value);
  }
  return (
    <div>
      <label for="description">Description: </label>

      <textarea
        id="description"
        rows="4"
        cols="50"
        onChange={changes}
        placeholder="Enter Description"
      ></textarea>
    </div>
  );
}
export default Description;
