import React from 'react';
import Home from './components/home';
import Search from './components/search';
import TaskList from './components/tasklist';
import './App.css';

function App(props) {
  return (
    <div className="wrapper">
       <header className='header_site'>
            <div className="container">
                <div className="logo"> 
                    <h1>Task Demo</h1>
                </div>
            </div>
        </header> 
      <Search/>
      <Home/>
      <TaskList/>
    </div>
  );
}

export default App;
