import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TaskView from '../components/tasks/TaskView';
import * as actionCreators from '../actions/task';

const TaskContainer = props => {
    return (
        <div>
            <TaskView {...props}/>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks.tasks
    }
}

function mapDispachToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispachToProps)(TaskContainer)