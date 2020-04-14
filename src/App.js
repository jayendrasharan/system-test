import React from "react";
import "./App.css";

import GlobalSearch from "./Components/GlobalSearch";
import Dropdown from "./Components/Dropdown";
import ToDo from "./Components/ToDo";
import Model from "./Components/Model/createToDoModel";
import ViewToDo from "./Components/Model/ViewToDo";

import { ToDoConsumer } from "./context";

function App() {
  return (
    <div className="container">
      <div className="row" id="header">
        <div className="col-4 align-self-center">
          <h3>TO - DO App</h3>
        </div>
        <div className="col-4 align-self-center">
          <GlobalSearch />
        </div>
        <div className="col-4 align-self-center">
          <Dropdown />
        </div>
      </div>
      <br />
      <br />
      <ToDo />
      <div className="row float-right">
        <div className="col">
          <ToDoConsumer>
            {({ openModel }) => (
              <button
                type="button"
                className="btn btn-primary"
                onClick={openModel}
              >
                <i className="fa fa-plus"></i>
              </button>
            )}
          </ToDoConsumer>
        </div>
      </div>
      <Model />
      <ViewToDo />
    </div>
  );
}

export default App;
