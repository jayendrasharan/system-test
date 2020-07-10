import React from "react";
import classes from "./styles.module.css";

const Dropdown = (props) => {
  const { options = [], ...rest } = props;
  return (
    <select {...rest} className={classes.select}>
      {options.map(({ key, value }) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
