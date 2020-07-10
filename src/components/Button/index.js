import React from "react";
import classes from "./styles.module.css";

const Button = (props) => {
  const { children, onClick, className = "", ...rest } = props;
  return (
    <button
      className={className ? className : classes.button}
      {...rest}
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick(e);
      }}
    >
      {children}
    </button>
  );
};

export default Button;
