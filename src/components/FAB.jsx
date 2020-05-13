import React, { useState, useContext } from "react";
import "../css/cssfile.css";
import Submit from "./Submit";
const Mousetrap = require("mousetrap");

function FAB(props) {
  const [value, setValue] = useState({ isActive: false });
  function onClick() {
    setValue({ isActive: true });
  }
  function onCancelFun() {
    setValue({ isActive: false });
  }
  Mousetrap.bind("esc", () => {
    setValue({ isActive: false });
  });

  function onSaveFun(event) {
    // console.log(event.title.length);
    if (event.title.length > 10 && event.description.length > 10) {
      setValue({ isActive: false });

      props.submit(event);
    } else {
      alert("Title and Description should be minimum of 10 characters");
    }
    //console.log("set: " + JSON.parse(JSON.stringify(event)));
  }
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
