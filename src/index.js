import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/core";

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';

import App from './App.jsx';
import theme from './theme';
import rootReducer from './store/reducers';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App /> 
   </ThemeProvider>
   </Provider>
   , document.getElementById('root')
);