import React from 'react';
import { useSelector } from 'react-redux';
import AddTodo from './AddTodo';
import Todos from './Todos';
import TodoModalForm from './core/TodoForm';

const App = () =>{
    const todos = useSelector(state => state.todos);
    return (
        <div className="container-fluid p-0 m-0">
            <div className="search"></div>
            <Todos/>
            <AddTodo/>    
            { todos.modal.isOpen && <TodoModalForm/> }
        </div>
    )
} 

export default App;
