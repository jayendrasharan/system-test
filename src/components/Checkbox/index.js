import React from "react";
import classes from "./styles.module.css";
import { ReactComponent as Checked } from "../../icons/check.svg";
import { ReactComponent as UnChecked } from "../../icons/uncheck.svg";

const Checkbox = (props) => {
  const { onChange, onClick, checked, ...rest } = props;
  return (
    <span
      className={classes.checkbox}
      onClick={(e) => {
        e.stopPropagation();
        onChange && onChange(e);
      }}
    >
      <input type="checkbox" {...rest} />
      {checked ? (
        <Checked className={classes.icon} />
      ) : (
        <UnChecked className={classes.icon} />
      )}
    </span>
  );
};

export default Checkbox;
