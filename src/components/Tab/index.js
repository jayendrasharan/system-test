import React from 'react';
import './style.css';
import {connect} from 'react-redux';

const Tabs = ({history,getAllTasks,getPendingTasks,getCompletedTasks,location}) => {

const allTasksLoc = (location === "/allTasks");
const compLoc = (location === "/completedTasks");
const penLoc = (location === "/pendingTasks");

    return (
        <ul className="myTab">
            <li className={`tab ${allTasksLoc ? "tabSelect" : "tabunSelect"}`} onClick={e => { history.push('/allTasks'); getAllTasks() }}  >All tasks</li>
            <li className={`tab ${compLoc ? "tabSelect" : "tabunSelect"}`} onClick={e => { history.push('/completedTasks'); getCompletedTasks() }} >Completed</li>
            <li className={`tab ${penLoc ? "tabSelect" : "tabunSelect"}`} onClick={e => { history.push('/pendingTasks'); getPendingTasks(); }}  >Pending</li>
        </ul>
    )
}

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => {
    return {
        getAllTasks: () => {
            
            return(dispatch({type:"GET_ALL_TASKS"}));
        },
        getPendingTasks : () => {
            return(dispatch({type:"GET_PENDING_TASKS"}))
        },
        getCompletedTasks : () => {
            return(dispatch({type:"GET_COMPLETED_TASKS"}))
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Tabs);