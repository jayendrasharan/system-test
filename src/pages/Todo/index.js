import React from "react";
import useForm from "../../customHooks/useForm";
import { TODO_STATUS, TODO_PRIORITY } from "../../constants";
import Input from "../../components/Input";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import Dropdown from "../../components/Dropdown";
import classes from "./styles.module.css";

const Todo = (props) => {
  const { mode = "create", todo, onCancel, onSave } = props;
  const { values, handleChange } = useForm(() => {
    switch (mode) {
      case "update":
        return { ...todo };
      case "view":
        return { ...todo };
      default:
        return {
          currentState: TODO_STATUS.OPEN,
          title: "",
          description: "",
          createdAt: new Date(),
          dueDate: new Date(),
          priority: TODO_PRIORITY.NONE,
        };
    }
  });
  return (
    <div className={classes.main}>
      <h1>Create Todo</h1>
      <div>
        <div>
          <label>Summary</label>
          {mode == "view" ? (
            <p>{values.title}</p>
          ) : (
            <Input
              type="text"
              name="title"
              onChange={handleChange}
              value={values.title}
            />
          )}
        </div>
        <div>
          <label>Description</label>
          {mode == "view" ? (
            <p>{values.description}</p>
          ) : (
            <TextArea
              type="textarea"
              name="description"
              onChange={handleChange}
              value={values.description}
              rows={5}
            />
          )}
        </div>
        {mode == "view" && (
          <div>
            <label>Created On</label>
            <p>{values.createdAt}</p>
          </div>
        )}
        <div>
          <label>Due Date</label>
          {mode == "view" ? (
            <p>{values.dueDate}</p>
          ) : (
            <Input
              type="date"
              name="dueDate"
              onChange={handleChange}
              value={values.dueDate}
            />
          )}
        </div>
        <div>
          <label>Priority</label>
          {mode == "view" ? (
            <p>{values.priority}</p>
          ) : (
            <Dropdown
              onChange={handleChange}
              value={values.priority}
              options={[
                {
                  key: "None",
                  value: "None",
                },
                {
                  key: "Low",
                  value: "Low",
                },
                {
                  key: "Medium",
                  value: "Medium",
                },
                {
                  key: "High",
                  value: "High",
                },
              ]}
            />
          )}
        </div>
      </div>
      <div className={classes.footer}>
        <Button onClick={onCancel}>
          {mode == "view" ? "Close" : "Cancel"}
        </Button>
        {mode != "view" && (
          <Button onClick={() => onSave(values)}>
            {mode == "create" ? "Create" : "Save"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Todo;
