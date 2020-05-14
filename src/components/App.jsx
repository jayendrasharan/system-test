import React, { useState } from "react";
import Pending from "./Pending";
import Completed from "./Completed";
import AllTask from "./AllTask";
import FAB from "./FAB";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [value, setValue] = useState([]);
  function onSubmit(event) {
    setValue([...value, event]);
  }
  return (
    <Tabs defaultActiveKey="AllTask" id="uncontrolled-tab-example">
      <Tab eventKey="AllTask" title="All Task">
        <AllTask list={value}></AllTask>
        <FAB submit={onSubmit}></FAB>
      </Tab>
      <Tab eventKey="completed" title="Completed">
        <Completed></Completed>
      </Tab>
      <Tab eventKey="pending" title="Pending">
        <Pending list={value}></Pending>
      </Tab>
    </Tabs>
  );
}

export default App;
