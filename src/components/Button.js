import React from "react";

const Button = ({ name = "Btn", class_ = "", onClick = null, type = "" }) => {
  return (
    <>
      <button type={type} className={"button " + class_} onClick={onClick}>
        {name}
      </button>
    </>
  );
};

export default Button;
