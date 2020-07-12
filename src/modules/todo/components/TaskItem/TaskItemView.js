import React from 'react';
import './TaskItemView.scss'
import {connect} from 'react-redux';
import { toDoListColumns, fomatters } from '../../constants/todoListViewConfigurations';
const validDataFields = toDoListColumns.filter(each => each.field)
const TaskItemView = ({task, completeTask, deleteTask, reopenTask, editTask, viewTask, confirmDelete, closeModal, searchText})=>{
    return (
        <div className="view-item-wrapper" onClick={()=>viewTask(task)}>
            { validDataFields.map(each => {
                const formattedValue = fomatters[each.field] ? fomatters[each.field](task[each.field]) : task[each.field]; 
                if(each.allowSearch && searchText){
                    const splitStrings = formattedValue.split(searchText);
                    if(splitStrings.length > 1){
                        return <div className="label" >
                            {splitStrings.map((eachSplit, index)=>{
                                return <span>{eachSplit}
                                        {(index < splitStrings.length-1) ? <span className="searched-text">{searchText}</span>: ''}
                                        </span>
                            })}</div>
                    }else{
                        return <div className="label" >{formattedValue}</div>
                    }
                }else{
                    return <div className="label">{formattedValue}</div>
                }
            })}
            <div className="actions-wrapper" onClick={(e)=>e.stopPropagation()}>
                <div className="app-button raised edit-icon" onClick={()=>editTask(task)}></div>
                { task.status === 'PENDING' ? <div className="app-button raised complete-icon" onClick={()=>completeTask(task.id)}></div> : ''}
                { task.status === 'COMPLETED' ? <div className="app-button raised reopen-icon" onClick={()=>reopenTask(task.id)}></div> : ''}
                <div className="app-button raised delete-icon"  onClick={()=>confirmDelete(() => deleteTask(task.id), () => closeModal())}></div>
            </div>
        </div>
    )
}

export default connect()(TaskItemView);