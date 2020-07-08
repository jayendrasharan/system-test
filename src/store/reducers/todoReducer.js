import todoListData from '../staticData/todoListData';
import { searchableFields } from '../../config';


const initialState = {
    data: todoListData,
    isFormOpen: false,
    isEditMode: true,
    selectedTodoId: null,
    selectedTodoItem: {},
    lastEditTimestamp: null,
    filteredData: todoListData
};


export default function (state = initialState, action) {
    const updatedState = { ...state };
    switch (action.type) {
        case "GET_TODO_LIST":

            break;

        case "TOGGLE_COMPLETE":
            const id = action.values.id;
            const item = updatedState.data.find(item => item.id === id);
            if (item.status === "pending") item.status = "completed";
            else if (item.status === "completed") item.status = "pending";

            updatedState.lastEditTimestamp = new Date().getTime();
            break;

        case "ADD_TODO_LIST":
            const fieldValues = action.values;
            if (updatedState.selectedTodoId > 0 || fieldValues.id > 0) {
                const id = updatedState.selectedTodoId || fieldValues.id;
                const record = updatedState.data.find(item => item.id === id);
                record.summary = fieldValues.summary;
                record.description = fieldValues.description;
                record.priority = fieldValues.priority;
                record.dueDate = fieldValues.dueDate;
            } else {
                fieldValues.id = updatedState.data.length + 1;
                fieldValues.status = "pending";
                updatedState.data.push(fieldValues);
            }
            updatedState.lastEditTimestamp = new Date().getTime();
            break;
        case "DELETE_TODO":
            const todoList = updatedState.data.filter((item => item.id !== action.values.id));
            const filteredTodoList = updatedState.filteredData.filter((item => item.id !== action.values.id))
            updatedState.data = todoList;
            updatedState.filteredData = filteredTodoList;
            break;

        case "TOGGLE_TODO_FORM":
            updatedState.isFormOpen = !updatedState.isFormOpen;
            const values = action.values;

            if (updatedState.isFormOpen && action.values && Object.keys(action.values).length > 0) {
                updatedState.selectedTodoId = action.values.id;
                if (values.isEditable) {
                    updatedState.isEditMode = true;
                } else {
                    updatedState.isEditMode = false;
                }
                updatedState.selectedTodoItem = updatedState.data.find(item => item.id === action.values.id);
            }
            break;
        case "SEARCH_TODO_ITEMS":
            const searchText = action.values.searchText;
            if (searchText === "") {
                updatedState.filteredData = updatedState.data;
            } else {
                updatedState.filteredData = updatedState.data.filter(item => {
                    for (let field of searchableFields) {
                        if (item[field].includes(searchText)) {
                            return item;
                        }
                    }
                });
            }

            break;
        case "MARK_LIST_DONE":
            const ids = action.values.ids;
            updatedState.data.forEach(data => {
                ids.forEach(id => {
                    if (data.id === id) {
                        data.status = "completed";
                    }
                })
            });
            updatedState.filteredData.forEach(data => {
                ids.forEach(id => {
                    if (data.id === id) {
                        data.status = "completed";
                    }
                })
            });
            updatedState.lastEditTimestamp = new Date().getTime();
            break;
        case "MARK_LIST_PENDING":
            {
                const ids = action.values.ids;
                updatedState.data.forEach(data => {
                    ids.forEach(id => {
                        if (data.id === id) {
                            data.status = "pending";
                        }
                    })
                })
                updatedState.filteredData.forEach(data => {
                    ids.forEach(id => {
                        if (data.id === id) {
                            data.status = "pending";
                        }
                    })
                })
                updatedState.lastEditTimestamp = new Date().getTime();
            }
            break;
    }
    return updatedState;
}