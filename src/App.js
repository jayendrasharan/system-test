import React from 'react';
import './App.css';
import AddTask from './modules/todo/components/AddTaskButton/AddTask';
import TodoList from './modules/todo/components/TodoListTab/TodoList';

import './modules/shared/styles/styles.scss'
function App() {
  return (
    <div className="App">
      <AddTask/>
      <TodoList/>
    </div>
  );
}

export default App;
