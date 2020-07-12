import React from 'react';
import './TodoListView.scss';
import {connect} from 'react-redux';
import {openModal} from '../../../shared/actions/modalActions';
import TaskItem from '../TaskItem/TaskItem';
import ModalSpace from '../../../shared/components/ModalSpace';
import {toDoListColumns, fomatters} from '../../constants/todoListViewConfigurations';
import {sortTasks} from '../../actions/taskActions'

const mapDispatchToProps = (dispatch) => ({
    sortTasks: (field, sort) => (dispatch(sortTasks(field, sort)))
});
const enabledColumns = toDoListColumns.filter(column => column.show)
const TodoListView = ({tasks, sortTasks, taskGroups, sortObj}) => {
    return (
        <div className="todo-list-wrapper">
            <div className="column-headers">
                {enabledColumns.map((eachColumn)=>(
                    <div className="column-header">
                    <div onClick={()=>{
                        if(eachColumn['sort'] !== undefined){
                            sortTasks(eachColumn.field, eachColumn.sort);
                            eachColumn.sort = !eachColumn.sort;
                        }
                    }}>{eachColumn.label}</div>
                    {(sortObj.sort !== '' && eachColumn.sort !== undefined && sortObj.sortedBy ===  eachColumn.field) ? <span className={`sort-icon ${ sortObj.sort ? 'down-arrow' : 'up-arrow'}`}></span>: ''}</div>
                ))}
            </div>
            <div className="list-items">
                {tasks ? tasks.map((task)=>(
                    <div className={`list-item ${task.status === 'PENDING' ? 'pending-task': 'completed-task'}`}>
                        <TaskItem key={task.id} task={{...task}}/>
                    </div>
                )) : ''}
                {tasks && tasks.length === 0 ? <div className="items-unavailable">No Items Available</div> : ''}
                {(taskGroups ? taskGroups.map((taskGroup)=>(
                    <div className="group">
                        <div className="group-label">{fomatters[taskGroup.groupBy] ? fomatters[taskGroup.groupBy](taskGroup.value) : taskGroup.value}</div>
                        {taskGroup.items.map((task)=>(
                            <div className={`list-item ${task.status === 'PENDING' ? 'pending-task': 'completed-task'}`}>
                                <TaskItem key={task.id} task={{...task}}/>
                            </div>
                        ))}
                    </div>
                )): '')}
                {taskGroups && taskGroups.length === 0 ? <div className="items-unavailable">No Items Available</div> : ''}
            </div>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(TodoListView);