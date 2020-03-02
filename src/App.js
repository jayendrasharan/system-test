import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store, persistor} from './store';
import Header from './components/layout/Header';
import AddTask from './components/AddTask';
import './App.css';
import AllTaskView from './components/AllTaskView';
import PendingTaskView from './components/PendingTaskView';
import CompletedTaskView from './components/CompletedTaskView'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
      <div className="App">
        <Header />
        <div className='container'>
          <Switch>
            <Route exact path ='/' component={AllTaskView}></Route>
          </Switch>
          <Switch>
            <Route exact path ='/pending' component={PendingTaskView}></Route>
          </Switch>
          <Switch>
            <Route exact path ='/completed' component={CompletedTaskView}></Route>
          </Switch>
        </div>
     </div>
     <footer>
        <AddTask/>
    </footer>
     </Router>
     </PersistGate>
    </Provider>
    
  );
}

export default App;
