import React from "react";
import classes from "./styles.module.css";

const Input = (props) => {
  return <input className={classes.input} {...props} />;
};

export default Input;
