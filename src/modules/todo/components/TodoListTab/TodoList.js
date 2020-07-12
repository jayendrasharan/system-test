import {connect} from 'react-redux'
import TodoListTab from './TodoListTab'
import {filterFunctions, filterSearchMatchedTasks, getGroups} from '../../constants/filterUtils'
import {filterTasks, searchTask, groupTask} from '../../actions/taskActions'
import ViewTodoForm from '../ViewTodoForm/ViewTodoForm'

import {openModal} from '../../../shared/actions/modalActions'
import { asyncWrapper } from '../../actions/asyncActions'

const getTasksForListView = (tasks, filter, searchText) => {
    if(filter){
        tasks = [...tasks.filter(filterFunctions[filter])]
    }
    if(searchText){
        tasks = [...tasks.filter(filterSearchMatchedTasks.bind(this, searchText))]
    }
    return tasks;
}

const getTaskGroups = (tasks, filter, searchText, groupBy)=>{
    const filteredTasks = getTasksForListView(tasks, filter, searchText);
    return getGroups(filteredTasks, groupBy);
}

const mapStateToProps = state => ({
    filter: state.filter,
    searchText: state.search.searchText,
    sortedBy: state.tasksState.sortedBy,
    sort: state.tasksState.sort,
    tasks: getTasksForListView(state.tasksState.tasks, state.filter, state.search.searchText),
    taskGroups: getTaskGroups(state.tasksState.tasks, state.filter, state.search.searchText, state.groupBy.groupBy),
    groupBy: state.groupBy.groupBy
})

const mapDispatchToProps = dispatch => ({
    searchTask: (searchText) => {
        dispatch(searchTask(searchText));
    },
    filterTasks: (filter) => {
        asyncWrapper(dispatch, ()=> dispatch(filterTasks(filter)))
    },
    groupTask: (groupBy)=> asyncWrapper(dispatch, () => dispatch(groupTask(groupBy)))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoListTab)
