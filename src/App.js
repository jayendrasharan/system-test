import React from 'react';
import theme from "./theme/main_theme";
import {ThemeProvider} from '@material-ui/styles';
import ToastMessageProvider from "./lib/contexts/message_context";
import {Planets} from "react-preloaders";
import './App.css';
import Todo from "./views/ToDo";
import Header from "./components/header";
import TodoDataProvider from "./lib/contexts/todo_action_context";
import ToastMessage from "./components/toast_message";

function App() {
  return (
        <ThemeProvider theme={theme}>
            <ToastMessageProvider>
                <Header/>
                <TodoDataProvider>
                    <Todo/>
                </TodoDataProvider>
                <ToastMessage/>
            </ToastMessageProvider>
        </ThemeProvider>
  );
}

export default App;
