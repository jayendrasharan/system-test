import { toDoListColumns, fomatters } from "./todoListViewConfigurations"

export const filterFunctions = {
    'ALL' : (each)=>{ return true},
    'PENDING': (each)=>{ return each.status === 'PENDING'},
    'COMPLETED': (each)=>{ return each.status == 'COMPLETED'}
}

export const filterSearchMatchedTasks = (searchedTask, task) =>{
    if(searchedTask){
        const searchableFields = toDoListColumns.filter(each => each.allowSearch)
        return searchableFields.some((eachFieldConfig)=>{
            return task[eachFieldConfig.field].toLowerCase().split(searchedTask.toLowerCase()).length > 1;
        })
    }else{
        return true;
    }
}

export const getGroups = (tasks, groupBy)=>{
    const groups = {};
    const formatterOfGroupBy = fomatters[groupBy];
    if(groupBy){
        tasks.forEach((task)=>{
            let valueToGroup = task[groupBy];
            if(formatterOfGroupBy){
                valueToGroup  = formatterOfGroupBy(valueToGroup)
            }
            if(groups[valueToGroup]){
                groups[valueToGroup].items.push(task)
            }else{
                groups[valueToGroup] = {
                    groupBy,
                    items: [task],
                    value: valueToGroup
                }
            }
        })
    }
    return Object.values(groups);
}
