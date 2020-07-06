import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { columnOptions } from '../../config';
import { useSelector } from "react-redux";
import Highlighter from "react-highlight-words";
import EditTodo from './EditTodo';

const getColumn = (searchKey, todo) => {
    const rows = columnOptions.map((column) => {
        let cellData = ''
        if (todo[column.name] === undefined) return <></>

        if (column.showHeader) {
            cellData = todo[column.name].toString();
        }

        if (column.name === 'currentState') return <td>{todo.currentState ? 'open' : 'completed'}</td>;
        return column.showHeader ? (column.allowSearch ? <td >
            <Highlighter
                searchWords={[searchKey]}
                autoEscape={true}
                textToHighlight={cellData}
            />

        </td> : <td>  {
            cellData
        } </td>) : <>  </>;

    });
    return (rows);
}


export default function ToDoItem({ todo, handleDone = () => { }, handleEdit = () => { }, handleDelete = () => { }, handleSelection = () => { } }) {
    const { title, currentState, dueDate, priority, createdAt } = todo;
    const searchKey = useSelector(({ TODO }) => TODO.searchKey);
    return <>

        <tr className={`priority-${priority} ${currentState ? 'open' : 'complete'}`} >

            {searchKey !== '' ? getColumn(searchKey, todo) : <>
                {/* <input id="box1" type="checkbox" />  */}
                <td>{title}</td>
                <td>{currentState ? 'open' : 'completed'}</td>
                <td>{createdAt}</td>
                <td>{dueDate}</td>
                <td>{priority}</td></>}
            <td >
                <span className='actionItem' onClick={() => handleDone(todo)}>
                    <button> {currentState ? 'done' : 're-open'}</button>
                </span>
                <span className='actionItem'>
                    <EditTodo todo={todo} />
                </span>
                <span className='actionItem' onClick={() => handleDelete(todo)}>
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(todo)} />
                </span>

            </td>
        </tr>

    </>;
}