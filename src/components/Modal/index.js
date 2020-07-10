import React, { useEffect, useCallback } from "react";
import classes from "./styles.module.css";

const Modal = (props) => {
  const { onClose } = props;
  const onKeyPress = (event) => {
    if (event.keyCode == 27) {
      onClose && onClose();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", onKeyPress, false);
    return () => {
      document.removeEventListener("keydown", onKeyPress, false);
    };
  }, []);
  return (
    <div
      className={classes.modal}
      onClick={useCallback(() => onClose && onClose(), [])}
    >
      <div
        className={classes.content}
        onClick={function (e) {
          e.stopPropagation();
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
