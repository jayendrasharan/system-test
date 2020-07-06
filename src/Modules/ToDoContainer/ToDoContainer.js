import React, { useEffect } from "react";
import ToDoHeader from './ToDoHeader';
import { useDispatch, useSelector } from "react-redux";
import ToDoItem from "./ToDoItem";
import { sortColumns, groupBy } from './helpers';
import './todoContainer.css';



const useFilters = (state) => {
    let todos = useSelector(({ TODO }) => TODO.todos);
    const groupByKey = useSelector(({ TODO }) => TODO[state].groupBy);
    const sortColumn = useSelector(({ TODO }) => TODO[state].sortColumn);
    const sortOrder = useSelector(({ TODO }) => TODO[state].sortOrder);

    if (state === "pending") {
        todos = todos.filter((item) => item.currentState);
    }

    if (state === "completed") {
        todos = todos.filter((item) => !item.currentState);
    }

    todos = React.useMemo(() => sortColumns(todos, sortColumn, sortOrder), [
        todos,
        sortColumn,
        sortOrder,
    ]);


    let groupByList = null;
    if (groupByKey && groupByKey !== 'null' && groupByKey !== 'none') {
        groupByList = groupBy(todos, groupByKey);
    }

    return [todos, groupByList, groupByKey];
}



const TodoContainer = ({ tabName }) => {
    const dispatch = useDispatch();
    const [todos, groupByList] = useFilters(tabName);

    useEffect(() => {
        dispatch({ type: 'SET_CURRENT_TAB', payload: tabName });
    }, [])


    // const handleSelection = (id) => {
    //     dispatch(
    //         { type: 'UPDATE_SELECTED_TODOS', payload: id }
    //     )
    // }

    const handleDone = (todo) => {
        dispatch(
            { type: 'UPDATE_ITEM_STATE', payload: todo }
        )
    };

    const handleDelete = (todo) => {
        dispatch(
            { type: 'DELETE_TODO_FROM_STORAGE', payload: todo }
        )
    };

    const getTodos = () => {
        if (todos && todos.length === 0) {
            return <div>No todos to show</div>
        }

        if (groupByList === null) {
            return todos.map((item) => (<ToDoItem
                todo={item}
                key={item.id}
                handleDone={handleDone}
                handleDelete={handleDelete}
            />
            ))

        } else {
            return Object.keys(groupByList).map((groupLabel) => {
                return (
                    <>
                        <div key={groupLabel} className="groupByContainer">
                            {groupLabel}
                        </div>
                        {groupByList[groupLabel].map((item) => (<ToDoItem
                            todo={item}
                            key={item.id}
                            handleDone={handleDone}
                            handleDelete={handleDelete}
                        />
                        ))}
                    </>
                );
            });
        }
    };

    return (
        <div className='container'>
            <table>
                <ToDoHeader />
                <tbody>
                    {getTodos()}
                </tbody>
            </table>
        </div>
    );
};

export default TodoContainer;
