import React, {useState, useEffect} from 'react';
import {v4} from 'uuid';

import Input from './components/Input';
import Todos from './components/Todos';
import Button from './components/Button';
import Select from './components/Select';
import Form from './components/Form';
import Modal from './components/Modal';
import {
  todosData,
  sortValues,
  searchValues,
  groupValues,
  priorityValues,
} from './data';

import './App.css';
import moment from 'moment';

function App () {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date().getDate());
  const [priority, setPriority] = useState({value: '', status: 0});

  const [sortBy, setSortBy] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [search, setSearch] = useState('');
  const [groupBy, setGroupBy] = useState('');

  const [todos, setTodos] = useState(todosData);
  const [showTodos, setShowTodos] = useState(todos);

  const [showAddTodo, setShowAddTodo] = useState(false);
  const [editTodo, setEditTodo] = useState(false);
  const [editId, setEditId] = useState(null);

  const [tab, setTab] = useState('all');

  useEffect (
    () => {
      if (searchBy) {
        const filteredTodos = todos.filter (todo =>
          todo[searchBy].toLowerCase ().includes (search.toLowerCase ())
        );
        setShowTodos (filteredTodos);
      }
    },
    [searchBy, search]
  );

  const escKey = window.addEventListener('keyup', (e) => {
    if (e.keyCode === 27) {
      setShowAddTodo(false)
      setEditTodo(false)
    }
  })

  useEffect(() => {
    return () => window.removeEventListener(escKey);
  }, [])

  useEffect (
    () => {
      if (groupBy) {
        const groupedTodos = {};
        let groupByValue;
        todos.forEach (todo => {
          groupByValue = todo[groupBy];
          if (groupBy === 'priority') {
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
    },
    [groupBy]
  );

  useEffect (
    () => {
      let sortedTodos = [...todos];
      if (sortBy) {
        switch (sortBy) {
          case 'completed':
            sortedTodos = sortedTodos.sort ((a, b) => {
              if (a.checked) return -1;
              if (b.checked) return 1;
              return 0;
            });
            break;
          case 'title':
            sortedTodos = sortedTodos.sort((a, b) => {
              const titleA = a.title.toUpperCase ();
              const titleB = b.title.toUpperCase ();
              if (titleA > titleB) return 1;
              if (titleA < titleB) return -1;
              return 0;
            });
            break;
          case 'createdAt':
            sortedTodos = sortedTodos.sort((a, b) => {
              return b.createdAt - a.createdAt;
            });
            break;
          case 'dueDate':
            sortedTodos = sortedTodos.sort((a, b) => {
              return a.dueDate - b.dueDate;
            });
            break;
          case 'priority':
            sortedTodos = sortedTodos.sort((a, b) => {
              return b.priority.status - a.priority.status;
            });
            break;
          default: setShowTodos(sortedTodos);
        }
      }
      setShowTodos(sortedTodos);
    },
    [sortBy]
  );

  useEffect (
    () => {
      setShowTodos(todos);
    },
    [todos]
  );

  const submit = e => {
    e.preventDefault();
    if (editTodo) {
      const allTodos = [...todos];
      const editedTodo = allTodos.find(todo => todo.id === editId);
      const editedTodoIndex = allTodos.findIndex(todo => todo.id === editId);
      const updatedTodo = {
        ...editedTodo,
        title,
        description,
        dueDate,
        priority
      }
      allTodos.splice(editedTodoIndex, 1, updatedTodo);
      setTodos(allTodos);
    } else {
      const data = {
        id: v4(),
        checked: false,
        title,
        description,
        createdAt: new Date().getTime(),
        dueDate: new Date(dueDate).getTime(),
        priority,
      };
      setTodos ([...todos, data]);
    }
    setTitle ('');
    setDescription ('');
    setPriority ({ value: '', status: 0 });
    setShowAddTodo (false);
    setEditTodo(false);
  };

  const setPriorityValue = e => {
    let status = 1;
    if (e.target.value === 'medium') status = 2;
    else if (e.target.value === 'high') status = 3;
    setPriority ({value: e.target.value, status});
  };

  const setGroupByValue = e => {
    setSortBy('');
    setSearchBy('');
    setGroupBy(e.target.value);
  };

  const setSortByValue = e => {
    setGroupBy('');
    setSearchBy('');
    setSortBy(e.target.value);
  };

  const setSearchByValue = e => {
    setGroupBy('');
    setSortBy('');
    setSearchBy(e.target.value);
  };

  const formData = {
    titleData: {
      value: title,
      setText: setTitle,
    },
    descriptionData: {
      value: description,
      setText: setDescription,
    },
    priorityData: {
      values: priorityValues,
      value: priority.value,
      selectValue: setPriorityValue,
    },
    dueDateData: {
      value: dueDate,
      setText: setDueDate,
    }
  };

  const todoCompletionStatus = (e, id) => {
    const allTodos = [...todos];
    const todo = allTodos.find(todo => todo.id === id);
    todo.checked = e.target.checked;
    setTodos(allTodos);
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const edit = (id) => {
    const todo = todos.find(todo => todo.id === id);
    setTitle(todo.title);
    setDescription(todo.description);
    setPriorityValue({target: { value: todo.priority.value }});
    setDueDate(todo.dueDate);
    setEditId(id);
    setEditTodo(!editTodo)
  }

  const todosProps = {
    todoCompletion: todoCompletionStatus,
    remove: removeTodo,
    edit,
    search,
    searchBy
  }

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="tabs">
        <span onClick={() => setTab('all')}>All Todos</span>
        <span onClick={() => setTab('pending')}>Pending Todos</span>
        <span onClick={() => setTab('completed')}>Completed Todos</span>
      </div>
      {tab === 'all' && <>
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
      {searchBy &&
        <div style={{margin: '10px 0'}}>
          <Input
            type="text"
            label={`Search by ${searchBy}`}
            value={search}
            showLabel={false}
            setText={setSearch}
          />
        </div>}
        <div style={{margin: '10px 0'}}>
        <Button click={() => setShowAddTodo(!showAddTodo)}>Add Todo</Button>
      </div>
      <Modal show={showAddTodo}>
        <Form formData={formData} submit={submit} close={() => setShowAddTodo(!showAddTodo)} />
      </Modal>
      <Modal show={editTodo}>
        <Form formData={formData} submit={submit} close={() => setEditTodo(!editTodo)} />
      </Modal>
      <Todos 
        todos={showTodos} 
        {...todosProps}
      />
      </>}
      {tab === 'pending' 
      && <Todos 
          todos={todos.filter(todo => !todo.checked)}
          {...todosProps}
          />}
      {tab === 'completed' 
        && <Todos 
              todos={todos.filter(todo => todo.checked)}
              {...todosProps}
            />
      }
    </div>
  );
}

export default App;
