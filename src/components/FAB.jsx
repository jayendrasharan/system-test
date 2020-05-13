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
    setValue({ isActive: false });

    // var temp = {
    //   isCompleted: event[0].isCompleted,
    //   title: event[0].title,
    //   description: event[0].description,
    //   priority: event[0].priority,
    //   date: event[0].date,
    // };
    console.log("set: " + JSON.parse(JSON.stringify(event)));
    props.submit(event);
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
