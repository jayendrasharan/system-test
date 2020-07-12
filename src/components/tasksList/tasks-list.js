import cn from 'classnames';
import { get, orderBy, groupBy, isEmpty } from "lodash";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fields } from "../../constants";
import TaskItem from "./task-item";
import "./task-list.scss";
import { sortByTodo } from "../../redux/actions";
import { getFieldValue } from '../../helpers';


//To render the list of tasks with headings like a table
function TasksList({ onAction, location, selectedTodos }) {
    let properties = useSelector(state => state.properties);
    let todos = useSelector(state => orderBy(state.todos, [properties.sortBy], [properties.sortOrder]));
    let dispatch = useDispatch();

    if(isEmpty(todos)){
        return <div className="no-tasks-msg">
            {"There are no tasks yet. Start Adding by clicking Add Icon"}
        </div>
    }

    if (get(location, "pathname", "").indexOf("pending") > -1) {
        todos = todos.filter(todo => todo.currentState === 0);
    } else if (get(location, "pathname", "").indexOf("completed") > -1) {
        todos = todos.filter(todo => todo.currentState === 1);
    }

    let groupBy_Todos;
    if (properties.groupBy !== "") {
        groupBy_Todos = groupBy(todos, (todo) => todo[properties.groupBy])
    }

    return (
        <div>
            <div className="table-row">
                <span className="checkbox-field"></span>
                {fields.map(field => {
                    return field.view && <span
                        key={`${field.value}`}
                        className={cn("field-heading", {
                            "sort-field": field.sortby
                        })}
                        onClick={() => (field.sortby) ? dispatch(sortByTodo(field.value)) : null}
                    >{field.label}</span>
                })}
            </div>
            {isEmpty(groupBy_Todos) ?
                todos.map(todo => {
                    const isChecked = selectedTodos && 
                    !isEmpty(selectedTodos.find(selected => selected.id === todo.id));

                    return <TaskItem key={todo.id} todo={todo} onAction={onAction} checked={isChecked} />
                }) : null}
            {!isEmpty(groupBy_Todos) &&
                Object.keys(groupBy_Todos).map((key) => {
                    return <div key={key}>
                        <p className="group-heading">{getFieldValue(key, properties.groupBy)}</p>
                        {groupBy_Todos[key].map(todo => {
                            const isChecked = selectedTodos && 
                            !isEmpty(selectedTodos.find(selected => selected.id === todo.id));

                            return <TaskItem key={todo.id} todo={todo} onAction={onAction} checked={isChecked} />
                        })}
                    </div>
                })
            }
        </div>
    );
}


export default TasksList;