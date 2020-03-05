import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v4';

import Input from './components/Input';
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
  const [search, setSearch] = useState('');
  const [groupBy, setGroupBy] = useState('');

  const [todos, setTodos] = useState(todosData);
  const [showTodos, setShowTodos] = useState(todos);

  useEffect(() => {
    if (searchBy) {
      const filteredTodos = todos.filter(todo =>
        todo[searchBy].includes(search)
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
        groupedTodos[groupByValue] = groupedTodos[groupByValue]
          ? [...groupedTodos[groupByValue], todo]
          : [todo];
      });
      setShowTodos(groupedTodos);
    }
  }, [groupBy]);

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
      {searchBy && (
        <div style={{ margin: '10px 0' }}>
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
