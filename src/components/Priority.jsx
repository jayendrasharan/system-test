import React from "react";
function Priority() {
  return (
    <div>
      <label for="Priority">Priority: </label>

      <select id="Priority">
        <option value="None">None</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
}
export default Priority;
