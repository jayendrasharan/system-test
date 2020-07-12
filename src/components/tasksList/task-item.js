import cn from 'classnames';
import { isEmpty } from 'lodash';
import React from 'react';
import './task-list.scss';
import { getFieldValue } from "../../helpers";
import { CrudActions, fields } from "../../constants";
import { updateTodo } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

//Renders each row in the list of tasks
function TaskItem({ todo, onAction, checked }) {
    let properties = useSelector(state => state.properties);
    const dispatch = useDispatch();

    if(isEmpty(todo)) {
        return null;
    }

    return (
        <div className={cn("table-row", {
            "completed-todo": todo.currentState === 1,
        })}>
            {/* {todo.currentState === 1 && <i className="material-icons done-icon">done</i>} */}
            <span className="checkbox-field">
                <input
                    checked={checked}
                    type="checkbox"
                    onChange={() => onAction(todo, CrudActions.Check)} />
            </span>
            {fields.map(field => {
                if (!isEmpty(field.value) && field.view) {
                    const fieldValue = getFieldValue(todo[field.value], field.value);
                    const isSearched = field.searchby && !isEmpty(properties.searchBy) && (fieldValue.toLowerCase().indexOf(properties.searchBy.toLowerCase()) > -1);
                    return <span
                        key={`${todo.id}_${field.value}`}
                        onClick={() => onAction(todo, CrudActions.View)}
                        className={"field-item"}
                        title="View Task"
                    >
                        <span className={cn({
                            "field-highlight": isSearched
                        })}>
                            {fieldValue}
                        </span>
                    </span>
                }
                return null;
            })}
            <span className="field-item" key={`${todo.id}_actions`} >
                <i
                    className="material-icons edit-icon"
                    onClick={() => onAction(todo, CrudActions.Update)}
                    title="Edit Task"
                >
                    edit
                </i>
                <i
                    className="material-icons delete-icon"
                    onClick={() => onAction(todo, CrudActions.Delete)}
                    title="Delete Task"
                >
                    delete
                </i>
                {todo.currentState === 0 ?
                    <button
                        className="btn btn-success status-btn"
                        onClick={() => dispatch(updateTodo({ ...todo, currentState: 1 }))}
                    >Done</button> :
                    <button
                        className="btn btn-warning status-btn"
                        onClick={() => dispatch(updateTodo({ ...todo, currentState: 0 }))}
                    >Reopen</button>}
            </span>
        </div>
    );
}

export default TaskItem;