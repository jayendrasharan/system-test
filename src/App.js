import React, { useState, useEffect } from "react";
import { v4 } from "uuid";

import Input from "./components/Input";
import Todos from "./components/Todos";
import Select from "./components/Select";
import Form from "./components/Form";
import {
  todosData,
  sortValues,
  searchValues,
  groupValues,
  priorityValues
} from "./data";

import "./App.css";
import moment from "moment";

function App() {
  const [title, setTitle] = useState("sdfdsf");
  const [description, setDescription] = useState("sdfdsfsd");
  const [dueDate, setDueDate] = useState(new Date().getDate());
  const [priority, setPriority] = useState({ value: "", status: 0 });

  const [sortBy, setSortBy] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [search, setSearch] = useState("");
  const [groupBy, setGroupBy] = useState("");

  const [todos, setTodos] = useState(todosData);
  const [showTodos, setShowTodos] = useState(todos);

  useEffect(() => {
    if (searchBy) {
      const filteredTodos = todos.filter(todo =>
        todo[searchBy].toLowerCase().includes(search.toLowerCase())
      );
      setShowTodos(filteredTodos);
    }
  }, [searchBy, search]);

  useEffect(() => {
    if (groupBy) {
      const groupedTodos = {};
      let groupByValue;
      todos.forEach(todo => {
        groupByValue = todo[groupBy];
        if (groupBy === "priority") {
          groupedTodos[groupByValue.value] = groupedTodos[groupByValue.value]
            ? [...groupedTodos[groupByValue.value], todo]
            : [todo];
        } else {
          groupedTodos[groupByValue] = groupedTodos[groupByValue]
            ? [...groupedTodos[groupByValue], todo]
            : [todo];
        }
      });
      setShowTodos(groupedTodos);
    } else {
      setShowTodos(todos);
    }
  }, [groupBy]);

  useEffect(() => {
    let sortedTodos = todos;
    if (sortBy) {
      switch (sortBy) {
        case "completed":
          sortedTodos = todos.sort((a, b) => {
            if (a.checked) return -1;
            if (b.checked) return 1;
            return 0;
          });
          break;
        case "title":
          sortedTodos = todos.sort((a, b) => {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();
            if (titleA > titleB) return 1;
            if (titleA < titleB) return -1;
            return 0;
          });
          break;
        case "createdAt":
          sortedTodos = todos.sort((a, b) => {
            return b.createdAt - a.createdAt;
          });
          break;
        case "dueDate":
          sortedTodos = todos.sort((a, b) => {
            return a.dueDate - b.dueDate;
          });
          break;
        case "priority":
          sortedTodos = todos.sort((a, b) => {
            return b.priority.status - a.priority.status;
          });
          break;
      }
    }
    setShowTodos(sortedTodos);
  }, [sortBy]);

  useEffect(() => {
    setShowTodos(todos);
  }, [todos]);

  const submit = e => {
    e.preventDefault();
    const data = {
      id: v4(),
      checked: false,
      title,
      description,
      createdAt: new Date().getTime(),
      dueDate: new Date(dueDate).getTime(),
      priority
    };
    setTodos([...todos, data]);
    setTitle("");
    setDescription("");
    setPriority({ value: "", status: 0 });
  };

  const setPriorityValue = e => {
    let status = 1;
    if (e.target.value === "medium") status = 2;
    else if (e.target.value === "high") status = 3;
    setPriority({ value: e.target.value, status });
  };

  const setGroupByValue = e => {
    setSortBy("");
    setSearchBy("");
    setGroupBy(e.target.value);
  };

  const setSortByValue = e => {
    setGroupBy("");
    setSearchBy("");
    setSortBy(e.target.value);
  };

  const setSearchByValue = e => {
    setGroupBy("");
    setSortBy("");
    setSearchBy(e.target.value);
  };

  const formData = {
    titleData: {
      label: "title",
      type: "text",
      value: title,
      setText: setTitle
    },
    descriptionData: {
      label: "description",
      value: description,
      setText: setDescription
    },
    priorityData: {
      label: "priority",
      values: priorityValues,
      value: priority.value,
      selectValue: setPriorityValue
    },
    dueDateData: {
      label: "due date",
      type: "date",
      value: dueDate,
      setText: setDueDate
    }
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="filters">
        <Select
          values={sortValues}
          value={sortBy}
          label="Sort By"
          selectValue={setSortByValue}
        />
        <Select
          values={searchValues}
          value={searchBy}
          label="Search By"
          selectValue={setSearchByValue}
        />
        <Select
          values={groupValues}
          value={groupBy}
          label="Group By"
          selectValue={setGroupByValue}
        />
      </div>
      {searchBy && (
        <div style={{ margin: "10px 0" }}>
          <Input
            type="text"
            label={`Search by ${searchBy}`}
            value={search}
            showLabel={false}
            setText={setSearch}
          />
        </div>
      )}
      <Form formData={formData} submit={submit} />
      <Todos todos={showTodos}></Todos>
    </div>
  );
}

export default App;
