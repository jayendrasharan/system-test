import React from "react";

export default function Dropdown() {
  return (
    <div className="form-group row m-0">
      <label
        htmlFor="exampleFormControlSelect1"
        className="col-5 m-0 p-0 align-self-center"
      >
        Order By :
      </label>
      <select
        className="form-control col-7 ml-0"
        id="exampleFormControlSelect1"
      >
        <option>None</option>
        <option>Created On</option>
        <option>Pending On</option>
        <option>Priority</option>
      </select>
    </div>
  );
}
