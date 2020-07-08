import * as actionTypes from './actionTypes';
import Config from '../config/Config';
const getTableData = (tabName,gridData) => {
 let configData={...Config};
const updateTable=configData.grid[tabName]["gridTableData"]
return {
        type: actionTypes.GET_TABLE_DATA_SUCCESS, 
        payload: { tableData: updateTable }
    };
}

export default getTableData;