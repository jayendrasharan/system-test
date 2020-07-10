import React from "react";
import classes from "./styles.module.css";

const TextArea = (props) => {
  return <textarea className={classes.textarea} {...props} />;
};

export default TextArea;
