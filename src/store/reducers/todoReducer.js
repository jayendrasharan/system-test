import todoListData from '../staticData/todoListData';

const initialState = {
    data: todoListData
};


export default function(state = initialState, action){
    const updatedState = {...state};
    switch(action.type){
        case "GET_TODO_LIST": 

            break;

        case "ADD_TODO_LIST": 
            const fieldValues = action.values;
            fieldValues.id = updatedState.data.length + 1;
            fieldValues.status = "pending";
            updatedState.data.push(fieldValues);
            break;
    }
    return updatedState;
}