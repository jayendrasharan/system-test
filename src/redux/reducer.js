import { ADD_TODO, UPDATE_TODO, DELETE_TODO, SEARCH_TODO, SORT_TODO, GROUPBY_TODO } from './actions';
import { todos } from './states';
import { combineReducers } from 'redux';

export let TodoReducer = (state = todos, action) => {
    let todosTemp = [...state];
    switch (action.type) {
        case ADD_TODO:
            todosTemp = [action.payload, ...todosTemp];
            return todosTemp;
        case UPDATE_TODO:
            todosTemp = todosTemp.map(todo => (
                todo.id === action.payload.id ? action.payload : todo));
            return todosTemp;
        case DELETE_TODO:
            todosTemp = todosTemp.filter(todo => todo.id !== action.payload);
            return todosTemp;
        default:
            return state;
    }
}

const otherProperties = {
    sortBy: "",
    groupBy: "",
    searchBy: "",
    sortOrder: "asc",
}

export let PropertiesReducer = (state = otherProperties, action) => {
    switch (action.type) {
        case SEARCH_TODO:
            return {...state, searchBy: action.payload};
        case SORT_TODO:
            let order= state.sortOrder;
            if(action.payload === state.sortBy) {
                if(order === 'desc') {
                    order= 'asc'
                } else {
                    order= 'desc'
                }
            } else {
                order = 'asc'
            }
            return {
                ...state,
                sortBy: action.payload,
                sortOrder: order,
            };
        case GROUPBY_TODO:
            return {...state, groupBy: action.payload};
        default:
            return state;
    }
}

export const allReducers = combineReducers({
    todos: TodoReducer,
    properties: PropertiesReducer
})