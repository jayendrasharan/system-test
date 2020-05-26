import React, { useState, useEffect,Fragment } from 'react';
import Home from './components/Home/Home';
import NavBar from './components/navbar/NavBar'
import './App.css';

function App() {

  return (
    <div>
      <Fragment>
        <NavBar />
      <Home />
     </Fragment> 

      
    </div>

  );
};

export default App;
