import React, { forwardRef } from "react";
import "./styles.css";

const Input = forwardRef((props, ref) => {
  let classNames = "input";
  if (props.size) {
    classNames += ` input-${props.size}`;
  }
  if (props.size && props.size === "full") {
    classNames += " input-full";
  }
  if (props.light) {
    classNames += " input-light";
  }

  return <input className={classNames} ref={ref} {...props} />;
});

export default Input;
