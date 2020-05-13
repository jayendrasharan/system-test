import React from "react";
function Priority(props) {
  function changes(event) {
    props.priority(event.target.value);
  }
  return (
    <div>
      <label for="Priority">Priority: </label>

      <select id="Priority" onChange={changes}>
        <option value="None">None</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
}
export default Priority;
