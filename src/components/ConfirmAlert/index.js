import React from "react";
import Button from "../Button";
import classes from "./styles.module.css";

const ConfirmAlert = (props) => {
  const { heading = "Confirm", info = "", yesClick, noClick } = props;
  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <h1>{heading}</h1>
      </div>
      <div className={classes.content}>
        <p>{info}</p>
      </div>
      <div className={classes.footer}>
        <Button onClick={noClick}>NO</Button>
        <Button onClick={yesClick}>YES</Button>
      </div>
    </div>
  );
};

export default ConfirmAlert;
