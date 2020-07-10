import React from "react";
import classes from "./styles.module.css";

const Button = (props) => {
  const { children, onClick, ...rest } = props;
  return (
    <button
      className={classes.button}
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
