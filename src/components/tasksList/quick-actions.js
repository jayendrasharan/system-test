import { isEmpty, map } from 'lodash';
import React from 'react';
import './task-list.scss';
import { CrudActions } from "../../constants";
import { updateTodo, deleteTodo } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

//Creates Quick action buttons to perform bulk operations
function QuickActions({ todosArray, clearSelected }) {
    const dispatch = useDispatch();
    let todos = useSelector(state => state.todos);

    if(isEmpty(todos)) {
        return null;
    }

    const onAction = (actionType, currentState) => {
        switch (actionType) {
            case CrudActions.Delete:
                map(todosArray, todo => {
                    dispatch(deleteTodo(todo.id))
                })
                break;
            case CrudActions.Update:
                map(todosArray, todo => {
                    dispatch(updateTodo({ ...todo, currentState }))
                })
                break;
            default:
                break;
        }
        clearSelected();
    }
    return (
        <div className="table-row">
            <span className="quick-action-header">Quick Actions</span>
            <button
                disabled={isEmpty(todosArray)}
                className="btn btn-danger quick-btn"
                onClick={() => { onAction(CrudActions.Delete) }}
                title="Delete Task"
            >
                Delete
                </button>
            <button
                disabled={isEmpty(todosArray)}
                className="btn btn-success quick-btn"
                onClick={() => onAction(CrudActions.Update, 1)}
            >Done</button>
            <button
                disabled={isEmpty(todosArray)}
                className="btn btn-warning quick-btn"
                onClick={() => onAction(CrudActions.Update, 0)}
            >Reopen</button>
        </div>
    );
}

export default QuickActions;