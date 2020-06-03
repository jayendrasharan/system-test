import React, {useState, createContext, useReducer} from "react";
import todoReducer, {INITIAL_TODO_STATE} from "../../reducers/todo_reducers";

export const TodoDataContext = createContext({});

export default function TodoDataProvider({ children }) {
    const [todoState,dispatch] = useReducer(todoReducer,INITIAL_TODO_STATE);

    let ToDo = {todoState,dispatch};
    return (
        <TodoDataContext.Provider value={ToDo}>
            {children}
        </TodoDataContext.Provider>
    );
}