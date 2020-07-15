

import {CREATE_TODO, REMOVE_TODO, TODO_STATUS_UPDATE, EDIT_TODO,
    LOAD_TODO_FAILURE, 
    LOAD_TODO_PROGRESS, 
    SEARCH_TODO_TEXT,
    LOAD_TODO_SUCCESS} from './actions';
import  newId from '../utils/newId';

export const isLoading = (state= false, action) => {
    switch (action.type)  {
        case LOAD_TODO_PROGRESS:
                return true
        case LOAD_TODO_FAILURE:
        case LOAD_TODO_SUCCESS:
                return false

    default: 
    return state;

}

}


export const todos = (state=[], action) => {
    console.log(action, state);
            const { type, payload } = action;

            console.log(payload);
        switch (action.type)  {

            case CREATE_TODO: {
                // const { todo } = payload;
     const {summary,description,dueDate,priority } = payload.todo;

                const newTodo ={
                    id: newId(),
                    createdAt: new Date().toLocaleDateString(),
                    isCompleted: false,
                    summary,description,dueDate,priority,
                }
                    return state.concat(newTodo);
            }
            case REMOVE_TODO: {
                return state.filter(todo => todo.id !== payload.todo.id);
            }
            case TODO_STATUS_UPDATE: {
                    return state.map(todo => {
                        if(todo.id === payload.todo.id) {
                            const taskStatus = payload.todo.isCompleted ? false : true;
                            return {
                                ...todo, isCompleted: taskStatus
                            }
                        }
                        return todo
                    })
            }
            case EDIT_TODO: {
                const  todoItem = payload.todo;

                return state.map(todo => {
                    if(todo.id === todoItem.id) {
                        return {
                            ...todoItem
                        }
                    }
                    return todo
                })
        }

        case SEARCH_TODO_TEXT: {
            console.log(state, action.payload.text);
            const text = action.payload.text;
            console.log(text)
            let filteredData;
            
            if(state.filteredData) {
                if(todos.text === "") {
                    return filteredData = todos.state
                } else {
                    return filteredData = todos.filteredData
                }
            } else {
                 filteredData = state.filter(todo => 
                        todo.summary.toLowerCase().includes(text.toLowerCase()))
                        return {state, filteredData, text}
            }
        }

            case LOAD_TODO_SUCCESS : {
                return action.payload.todos;
            }

            default:
            return state;
        }

}

