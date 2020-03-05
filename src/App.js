import React, { useState } from 'react';
import uuid from 'uuid/v4';

import Button from './components/Button';
import Todos from './components/Todos';
import Select from './components/Select';
import Form from './components/Form';
import {
  todosData,
  sortValues,
  searchValues,
  groupValues,
  priorityValues
} from './data';

import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toLocaleDateString());
  const [priority, setPriority] = useState('');

  const [sortBy, setSortBy] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [groupBy, setGroupBy] = useState('');

  const [todos, setTodos] = useState(todosData);

  const submit = e => {
    e.preventDefault();
    const data = {
      id: uuid(),
      checked: false,
      title,
      description,
      createdAt: new Date().toLocaleString(),
      dueDate,
      priority
    };
    setTodos([...todos, data]);
  };

  const formData = {
    titleData: {
      label: 'title',
      type: 'text',
      value: title,
      setText: setTitle
    },
    descriptionData: {
      label: 'description',
      value: description,
      setText: setDescription
    },
    priorityData: {
      label: 'priority',
      values: priorityValues,
      value: priority,
      selectValue: setPriority
    },
    dueDateData: {
      label: 'due date',
      type: 'date',
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
          selectValue={setSortBy}
        />
        <Select
          values={searchValues}
          value={searchBy}
          label="Search By"
          selectValue={setSearchBy}
        />
        <Select
          values={groupValues}
          value={groupBy}
          label="Group By"
          selectValue={setGroupBy}
        />
      </div>
      <Form formData={formData} submit={submit} />
      <Todos todos={todos}></Todos>
    </div>
  );
}

export default App;
