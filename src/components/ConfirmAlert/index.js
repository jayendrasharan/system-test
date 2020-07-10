import React from "react";
import Button from "../Button";

const ConfirmAlert = (props) => {
  const { heading = "Confirm", info = "", yesClick, noClick } = props;
  return (
    <div>
      <div>
        <h1>{heading}</h1>
      </div>
      <div>
        <p>{info}</p>
      </div>
      <div>
        <Button onClick={noClick}>NO</Button>
        <Button onClick={yesClick}>YES</Button>
      </div>
    </div>
  );
};

export default ConfirmAlert;
