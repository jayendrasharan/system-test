import React from 'react';
import './TodoListTab.scss';
import {connect} from 'react-redux';
import TodoListView from '../TodoListView/TodoListView'
import {listFilters, toDoListColumns} from '../../constants/todoListViewConfigurations';
import { searchTask } from '../../actions/taskActions';

const TodoListTab = ({tasks, filterTasks, filter, viewTask, searchText, searchTask, groupTask, groupBy, taskGroups, sortedBy, sort}) => {
    const tabFilters = listFilters;
    const groupByFilters = toDoListColumns.filter(each => each.groupBy)
    document.onkeyup  = (e)=>{
        // CTRL + SHIFT + F
        if (e.ctrlKey && e.shiftKey && e.which == 70){
            const searchInput = document.getElementById("searchInput");
            searchInput.focus();
        }
    }
    return (
        <div className="tab-wrapper">
            <div className="task-searcher">
                <input id="searchInput" placeholder="Search For Tasks" defaultValue={searchText} onChange={(e)=>{searchTask(e.target.value)}}/>
            </div>
            <div className="tab-switch">
                {tabFilters.map((eachTab)=>(
                    <div className={`tab ${eachTab.value === filter ? 'active': ''}`} onClick={()=>filterTasks(eachTab.value)}>{eachTab.label}</div>
                ))}
                <div className="task-grouper">
                    List by  
                    <select onChange={(e)=>groupTask(e.target.value)}>
                        <option value=''>None</option>
                        {groupByFilters.map(each =>{
                            return (
                            <option value={each.field}>{each.label}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            {groupBy === '' ? <TodoListView sortObj={{sortedBy: sortedBy, sort: sort}} tasks={[...tasks]}/> : <TodoListView sortObj={sortedBy, sort} taskGroups={[...taskGroups]}/>
            }
        </div>
    )
}

export default connect()(TodoListTab);