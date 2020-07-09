import React from "react";
import useForm from "../../customHooks/useForm";
import { TODO_STATUS, TODO_PRIORITY } from "../../constants";
import Input from "../../components/Input";
import Button from "../../components/Button";

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
    <div>
      <div>Create Todo</div>
      <div>
        <div>
          <p>Summary</p>
          <Input
            type="text"
            name="title"
            onChange={handleChange}
            value={values.title}
          />
        </div>
        <div>
          <p>Description</p>
          <textarea
            type="textarea"
            name="description"
            onChange={handleChange}
            value={values.description}
          />
        </div>
        <div>
          <p>Due Date</p>
          <Input
            type="date"
            name="dueDate"
            onChange={handleChange}
            value={values.dueDate}
          />
        </div>
        <div>
          <p>Priority</p>
          <select
            name="priority"
            onChange={handleChange}
            value={values.priority}
          >
            <option>None</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>
      <div>
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
