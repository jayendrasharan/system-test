import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
  <BrowserRouter basename="/tasks">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

