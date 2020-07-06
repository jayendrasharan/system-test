import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import store from "./store/store";
import Tabs from './Components/Tabs/Tabs';
import TodoContainer from './Modules/ToDoContainer/ToDoContainer';
import SearchBar from './Modules/SearchBar/searchBar';
import TaskBar from './Modules/TaskBar/TaskBar';

function App() {

  return (
    <Provider store={store}>
      <div className="todoapp">
        <header className='header'>
          <h1>todos</h1>

        </header>
        <TaskBar />
        <SearchBar />
        <Tabs>
          <div label="All Tasks">
            {/* <TodoContainer tabName="all" /> */}
            <TodoContainer tabName="all" />
          </div>
          <div label="Completed">
            <TodoContainer tabName="completed" />
          </div>
          <div label="Pending">
            <TodoContainer tabName="pending" />
          </div>
        </Tabs>

        {/* <ModalButton /> */}

      </div>
    </Provider>
  );
}

export default App;
