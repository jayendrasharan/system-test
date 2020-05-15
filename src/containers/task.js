import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TaskView from '../components/tasks/TaskView';
import * as actionCreators from '../actions/task';

const TaskContainer = props => {
    const { addTask, updateTask, deleteTask, tasks } = props;
    return (
        <div>
            <TaskView
                addTask={addTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                tasks={tasks}
            />
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