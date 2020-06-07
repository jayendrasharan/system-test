import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editTodoModal, viewTodoModal, toggleTodoStatus, deleteTodo } from '../../actions';
import { columns, actions } from '../../constants';
import Tabs from '../core/Tabs';
import Table from '../core/Table';

const Todos = () => {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const tabs = [
        { name: 'All tasks' },
        { name: 'Completed' },
        { name: 'Pending' }
    ];
    const [activeIndex, updateActiveIndex] = useState(0);
    const filteredTodos = todos.tasks.filter((todo)=> {
        if(activeIndex===2) {
            return todo.currentState;
        } else if(activeIndex===1) {
            return !todo.currentState;
        } else {
            return todo;
        }
    })
    const onActionClick = (type, todo) => {
        if(type==='VIEW') {
            dispatch(viewTodoModal(todo))
        } else if(type==='EDIT') {
            dispatch(editTodoModal(todo))
        } else if(type==='DELETE') {
            dispatch(deleteTodo(todo))
        } else if(type==='STATUS') {
            dispatch(toggleTodoStatus(todo))
        }        
    }
    return (<div className="todos">
        <Tabs tabs={tabs} updateActiveIndex={updateActiveIndex} defaultIndex={0}/>  
        <Table 
            groupBy={todos.groupBy}
            searchKeyword={todos.searchKeyword}
            columns={columns} 
            data={filteredTodos} 
            actions={actions} 
            onActionClick={onActionClick}/>
    </div>)
}

export default Todos;
