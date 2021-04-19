import React from 'react';
import { useSelector } from 'react-redux';

import AddTodo from './AddTodo';
import Todos from './Todos';
import TodoModalForm from './core/TodoForm';
import Search from './Search';

const App = () =>{
    const todos = useSelector(state => state.todos);    
    return (
        <div className="container-fluid p-0 m-0">
            { todos.isLoading && (<div class="loader">
                <div class="text-center align-self-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>) }
            <Search/>
            <Todos/>
            <AddTodo/>    
            { todos.modal.isOpen && <TodoModalForm/> }
        </div>
    )
} 

export default App;
