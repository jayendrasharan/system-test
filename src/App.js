import React, { useState, useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import { connect } from 'react-redux';

import Input from './components/Input';
import Todos from './components/Todos';
import Button from './components/Button';
import Select from './components/Select';
import Form from './components/Form';
import Modal from './components/Modal';
import { sortValues, searchValues, groupValues, priorityValues } from './data';
import {
  initAddTodo,
  initRemoveTodo,
  initEditTodo,
  initGroupBy,
  initSortBy,
  initSearchBy,
  switchStatus
} from './store/actions';

import './App.css';

function App(props) {
  const {
    todos,
    addTodo,
    removeTodo,
    loading,
    edit,
    todosToDisplay,
    groupTodos,
    sortTodos,
    searchTodos,
    switchStatus
  } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date().getDate());
  const [priority, setPriority] = useState({ value: '', status: 0 });

  const [sortBy, setSortBy] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [search, setSearch] = useState('');
  const [groupBy, setGroupBy] = useState('');

  const [showAddTodo, setShowAddTodo] = useState(false);
  const [editTodo, setEditTodo] = useState(false);
  const [editId, setEditId] = useState(null);

  const [tab, setTab] = useState('all');

  const escKey = window.addEventListener('keyup', e => {
    if (e.keyCode === 27) {
      setShowAddTodo(false);
      setEditTodo(false);
    }
  });

  const focusSearch = window.addEventListener('keyup', e => {
    if ((e.ctrlKey && e.shiftKey, e.keyCode === 70)) {
      document.querySelector('#search').focus();
    }
  });

  useEffect(() => {
    return () => {
      window.removeEventListener(escKey);
      window.removeEventListener(focusSearch);
    };
  }, []);

  useEffect(() => {
    if (searchBy) searchTodos({ searchBy, search });
  }, [searchBy, search, searchTodos]);

  useEffect(() => {
    if (groupBy) groupTodos(groupBy);
  }, [groupBy, groupTodos]);

  useEffect(() => {
    if (sortBy) sortTodos(sortBy);
  }, [sortBy, sortTodos]);

  const submit = e => {
    e.preventDefault();

    if (editTodo) {
      edit({
        id: editId,
        title,
        description,
        dueDate,
        priority
      });
    } else {
      const data = {
        id: v4(),
        checked: false,
        title,
        description,
        createdAt: new Date().getTime(),
        dueDate: new Date(dueDate).getTime(),
        priority
      };
      addTodo(data);
    }
    setTitle('');
    setDescription('');
    setPriority({ value: '', status: 0 });
    setShowAddTodo(false);
    setEditTodo(false);
    setEditId('');
  };

  const setPriorityValue = e => {
    let status = 1;
    if (e.target.value === 'medium') status = 2;
    else if (e.target.value === 'high') status = 3;
    setPriority({ value: e.target.value, status });
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
      setText: setTitle
    },
    descriptionData: {
      value: description,
      setText: setDescription
    },
    priorityData: {
      values: priorityValues,
      value: priority.value,
      selectValue: setPriorityValue
    },
    dueDateData: {
      value: dueDate,
      setText: setDueDate
    }
  };

  const todoCompletionStatus = (e, id) => {
    switchStatus({ checked: e.target.checked, id });
  };

  const editSingleTodo = id => {
    const todo = todos.find(todo => todo.id === id);
    setTitle(todo.title);
    setDescription(todo.description);
    setPriorityValue({ target: { value: todo.priority.value } });
    setDueDate(todo.dueDate);
    setEditId(id);
    setEditTodo(!editTodo);
  };

  const todosProps = {
    todoCompletion: todoCompletionStatus,
    remove: removeTodo,
    edit: editSingleTodo,
    search,
    searchBy,
    groupBy
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="tabs">
        <span onClick={() => setTab('all')}>All Todos</span>
        <span onClick={() => setTab('pending')}>Pending Todos</span>
        <span onClick={() => setTab('completed')}>Completed Todos</span>
      </div>
      {!loading ? (
        <div>
          {tab === 'all' && (
            <>
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
              <div style={{ margin: '10px 0' }}>
                <Input
                  type="text"
                  label={`Search by ${searchBy}`}
                  value={search}
                  showLabel={false}
                  setText={setSearch}
                  id="search"
                />
              </div>
              <div style={{ margin: '10px 0' }}>
                <Button click={() => setShowAddTodo(!showAddTodo)}>
                  Add Todo
                </Button>
              </div>
              <Modal show={showAddTodo}>
                <Form
                  formData={formData}
                  submit={submit}
                  close={() => setShowAddTodo(!showAddTodo)}
                />
              </Modal>
              <Modal show={editTodo}>
                <Form
                  formData={formData}
                  submit={submit}
                  close={() => setEditTodo(!editTodo)}
                  editMode={editTodo}
                />
              </Modal>
              <Todos todos={todosToDisplay} {...todosProps} />
            </>
          )}
          {tab === 'pending' && (
            <Todos
              todos={todos.filter(todo => !todo.checked)}
              {...todosProps}
            />
          )}
          {tab === 'completed' && (
            <Todos todos={todos.filter(todo => todo.checked)} {...todosProps} />
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    todos: state.todos,
    loading: state.loading,
    todosToDisplay: state.showTodos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: todo => dispatch(initAddTodo(todo)),
    removeTodo: id => dispatch(initRemoveTodo(id)),
    edit: todo => dispatch(initEditTodo(todo)),
    groupTodos: groupBy => dispatch(initGroupBy(groupBy)),
    sortTodos: sortBy => dispatch(initSortBy(sortBy)),
    searchTodos: ({ searchBy, search }) =>
      dispatch(initSearchBy({ searchBy, search })),
    switchStatus: ({ checked, id }) => dispatch(switchStatus({ checked, id }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
