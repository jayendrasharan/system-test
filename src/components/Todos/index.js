import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editTodoModal, viewTodoModal, toggleTodoStatus, deleteTodo } from '../../actions';
import Tabs from '../core/Tabs';

const Pencil = () => <svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
<path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
</svg>;

const Remove = () => <svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>

const Table = ({ data = [], onActionClick }) => {
    return (<table className="table table-bordered">
    <thead>
      <tr>
        <th scope="col">Summary</th>
        <th scope="col">Priority</th>
        <th scope="col">Created on</th>
        <th scope="col">Due date</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
        { data.map((todo)=>{
            return (<tr className={todo.currentState==='open' ? 'red-bg' : 'green-bg'} key={todo.title+todo.id} onClick={() => onActionClick('VIEW', todo)}>
                <td>{todo.title}</td>
                <td>{todo.priority}</td>
                <td>{todo.createdAt.toString()}</td>
                <td>{todo.dueDate.toString()}</td>
                <td onClick={(e)=>e.stopPropagation()}>
                    <div className="flex justify-content-around">
                        <div onClick={() => onActionClick('EDIT', todo)}> <Pencil/> </div>
                        <div onClick={() => onActionClick('DELETE', todo)}> <Remove /> </div>
                        <button type="button" className="btn btn-info" onClick={() => onActionClick('STATUS', todo)}>{ todo.currentState === 'open' ? 'Done' : 'Re-open' }</button>
                    </div>
                </td>
            </tr>)
        })}      
    </tbody>
  </table>)
}

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
            return todo.currentState === 'open';
        } else if(activeIndex===1) {
            return todo.currentState === 're-open';
        } else {
            return todo;
        }
    })
    const onActionClick = (type, todo) => {
        console.log(todo, type)
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
        <Table data={filteredTodos} onActionClick={onActionClick}/>       
    </div>)
}

export default Todos;
