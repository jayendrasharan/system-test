import {ADD_TASK, ADDING_TASK, EDIT_TASK, DELETE_TASK, SORT_COLUMN, TASK_STATUS_UPDATE, GROUP_BY, SEARCH_ITEM, ERROR_SUM, ERROR_DES}  from '../actions/types';

const initialState = {todo:[], loading:false, groupBy:{}, searchedItem:[], searchedTerm:'', groupByTerm:'', errorSum:'', errorDes:'', sortBy:'Summary', sortOrder:'ASC'}


export default function(state=initialState, action) {
    
    switch(action.type) {
        case ADD_TASK:
            return{ 
                ...state, 
                todo: [action.payload, ...state.todo],
                loading:false
            }
        case ERROR_SUM:
            return{
                ...state,
                errorSum : action.payload
            }
        case ERROR_DES:
            return{
                ...state,
                errorDes : action.payload
            }
        case ADDING_TASK:
            return {
                ...state,
                loading:true
            }
        case EDIT_TASK:
            // Object.entries(state.groupBy).map(([key, value], ind)=>{
            //     console.log("groupby")
            //     let newarr=[], newarr1=[]
            //     return value.map((item, ind)=>{
            //         console.log("return")
            //         if(item.id!==action.payload.id){
            //             console.log("if")
            //             newarr.push(item)
            //             return state.groupBy[key]=newarr
            //         }else {
            //             console.log(key, state.groupByTerm)
            //             let groupByItem=state.groupByTerm=='Priority' ? 'priority':
            //             state.groupByTerm=='Created On' ? 'createdAt':
            //             state.groupByTerm=='Pending On' ? 'dueDate':
            //             state.groupByTerm=='None' ? 'None':'';
            //             let current = item[groupByItem]
            //             item.summary= action.payload.summary
            //             item.description= action.payload.description
            //             item.priority= action.payload.priority
            //             item.dueDate= action.payload.dueDate
            //             if(!state.groupBy[item[groupByItem]]) state.groupBy[item[groupByItem]]=[]
            //             console.log(state.groupBy[key].length)
            //             if(item[groupByItem]!=current) state.groupBy[current]=[]
            //             newarr1.push(item)
            //             console.log(newarr1)
            //             return  state.groupBy[item[groupByItem]]=newarr1
            //         }
            //     })
            // })
            return {...state, 
                todo: state.todo.map((item, ind)=>{
                        if(item.id!=action.payload.id){
                            return item
                        }else return {...item, 
                            summary: action.payload.summary,
                            description: action.payload.description,
                            priority: action.payload.priority,
                            dueDate: action.payload.dueDate,
                        }
                }),
                searchedItem: state.searchedItem.map((item, ind)=>{
                    if(item.id!=action.payload.id){
                        return item
                    }else return {...item, 
                        summary: action.payload.summary,
                        description: action.payload.description,
                        priority: action.payload.priority,
                        dueDate: action.payload.dueDate,
                    }
            }),
                loading:false
        }
        case DELETE_TASK:
            Object.entries(state.groupBy).map(([key, value], ind)=>{
                let newarr=[]
                return value.map((item, ind)=>{
                    if(item.id!==action.id){
                        newarr.push(item)
                        return state.groupBy[key]=newarr
                    }else {
                        return state.groupBy[key]=newarr
                    }
                })
            })
            return{ 
                ...state, 
                todo: state.todo.filter((i, ind)=>i.id!=action.id),
                searchedItem: state.searchedItem.filter((i, ind)=>i.id!=action.id),
                loading:false
            }

        case TASK_STATUS_UPDATE:
            Object.entries(state.groupBy).map(([key, value], ind)=>{
                let newarr=[]
                return value.map((item, ind)=>{
                    if(item.id!==action.payload.id){
                        newarr.push(item)
                        return state.groupBy[key]=newarr
                    }else {
                        newarr.push({...item, 
                            currentState:action.payload.currentState
                        })
                        return state.groupBy[key]=newarr
                    }
                })
            })
            return {...state, 
                todo: state.todo.map((item, ind)=>{
                        if(item.id==action.payload.id){
                            item.currentState=action.payload.currentState
                            return item
                        }else return item
                }),
                searchedItem: state.searchedItem.map((item, ind)=>{
                    if(item.id==action.payload.id){
                        item.currentState=action.payload.currentState
                        return item
                    }else return item
            }),
                loading:false
            }
        case SORT_COLUMN: {
            const columnName = action.payload
            const sortOrder = state.sortBy !== columnName ? state.sortOrder : state.sortOrder === 'ASC' ? 'DESC' : 'ASC'
            let col = (columnName == 'Summary' && 'summary')
                || (columnName == 'Priority' && 'priority')
                || (columnName == 'Created On' && 'createdAt')
                || (columnName == 'Due Date' && 'dueDate');
            const callback = (a, b) => {
                if(a[col] < b[col]) return sortOrder === 'ASC' ? -1 : 1
                else if(a[col] > b[col]) return sortOrder === 'ASC' ? 1 : -1;
                else return 0;
            }
            const sortedTasks = state.todo.sort(callback)
            return {
                ...state,
                sortOrder,
                sortBy: columnName,
                todo: sortedTasks,
            }
            }
        case GROUP_BY:
            return {
                ...state,
                groupBy : action.currentState.reduce((newData, i)=>{
                    let groupByItem=action.item=='Priority' ? 'priority':
                        action.item=='Created On' ? 'createdAt':
                        action.item=='Pending On' ? 'dueDate':
                        action.item=='None' ? 'None':'';
                    if(groupByItem=='None'){
                        return {}
                    }
                    if(!newData[i[groupByItem]]) newData[i[groupByItem]]=[]
                    newData[i[groupByItem]].push(i)
                    return newData
                }, {}),
                groupByTerm : action.item,
                loading:false
            }
        case SEARCH_ITEM:
            return {
                ...state,
                searchedItem : state.todo.filter(item=>{
                    if(action.item){
                        return item.summary.search(action.item)!=-1 
                        // ||
                        //     item.description.search(action.item)!=-1
                    }
                    else return ""
                }),
                searchedTerm:action.item
            }
        default:
            return state;
    }
}