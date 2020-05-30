import * as actionTypes from '../actions/actionTypes';
import Config from '../config/Config';

const configData={...Config};
const initialState = {
    tableData: configData.grid["allTasks"]["gridTableData"],
    gridData: configData.grid,

}

const reducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case actionTypes.GET_TABLE_DATA_SUCCESS:
             newState = { ...state };
            newState.tableData = action.payload.tableData;
            return newState;
        case actionTypes.ADD_TASK_SUCCESS:
             newState = { ...state };
            newState.gridData = action.payload.gridData;
            return newState;

        default:
            return state;
    }

}
export default reducer;