import React, { useState } from "react";
import "../css/cssfile.css";
import Submit from "./Submit";

function FAB(props) {
  const [value, setValue] = useState({ isActive: false });

  function onClick() {
    setValue({ isActive: true });
  }
  function onCancelFun() {
    setValue({ isActive: false });
  }
  function onSaveFun() {}
  return (
    <>
      {value.isActive ? <Submit cancel={onCancelFun} save={onSaveFun} /> : null}

      <a onClick={onClick} class="fab">
        +
      </a>
    </>
  );
}
export default FAB;
