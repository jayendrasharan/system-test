import React from "react";
function Title(props) {
  function changes(event) {
    props.title(event.target.value);
  }
  return (
    <>
      <label for="title">Title</label>
      <input
        type="text"
        name="title"
        onChange={changes}
        placeholder="Enter Title"
        maxLength="140"
        minLength="10"
      ></input>
    </>
  );
}
export default Title;
