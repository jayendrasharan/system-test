import React, { useEffect, useRef, useState } from "react";
import Tabs from "../components/Tabs";
import Input from "../components/Input";
import { AddTask, EditTask } from "../containers/ManageTask";
import { handleGlobalSearch } from "./actions";
import { useDispatch } from "react-redux";
import TaskList from "./TaskList";
import AddButton from "../components/AddButton";

const Main = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [isAddModelOpen, setAddModel] = useState(false);
  const toggleAdd = () => setAddModel(!isAddModelOpen);

  useEffect(() => {
    inputRef.current.focus();
    let keysPressed = {};
    const keyDownEvent = window.addEventListener("keydown", (event) => {
      keysPressed[event.key] = true;
      if (keysPressed["Shift"] && keysPressed["Control"] && keysPressed["F"]) {
        inputRef.current.focus();
      }
    });

    const keyUpEvent = window.addEventListener("keyup", (event) => {
      delete keysPressed[event.key];
    });

    return () => {
      keyDownEvent.removeEventListener();
      keyUpEvent.removeEventListener();
    };
  }, []);

  return (
    <main className="container">
      <div className="mb-1">
        <Input
          ref={inputRef}
          size="lg"
          placeholder="Search"
          onChange={(e) => dispatch(handleGlobalSearch(e.target.value))}
        />
      </div>
      <Tabs>
        <div label="All Tasks">
          <TaskList type="allTab" />
        </div>
        <div label="Completed">
          <TaskList type="completedTab" />
        </div>
        <div label="Pending">
          <TaskList type="pendingTab" />
        </div>
      </Tabs>
      <AddTask isAddModelOpen={isAddModelOpen} toggleAdd={toggleAdd} />
      <EditTask />
      <AddButton onClick={toggleAdd} />
    </main>
  );
};

export default Main;
