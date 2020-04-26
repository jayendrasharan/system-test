import {testData} from './testdata'; 
export const initialState  = {
    taskReducer :{
        taskDetails:testData,
        editedRow:{
        },
        taskIdVal:14,
        Alltasks:[],
        Completed:[],
        Pendings:[],
        SearchTasks:[],
        groupByData:{},
    },
    modalReducer: {
        showModal:false,
        showGroupBy: true,
        showSrch:true ,
    },
    searchReducer: {},
    groupByReducer:{},
};