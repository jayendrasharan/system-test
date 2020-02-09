import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/actions";
import { Button, Table } from "react-bootstrap";
import EditTask from "../EditTask/EditTask";
import 'font-awesome/css/font-awesome.min.css';

class AllTasks extends Component {

    deleteTask = (index) => {
        this.props.deleteTask(index);
    }

    handleEditClick = (task) => {
        this.props.editTask(task);
        this.props.toggleEditModal();
    }

    handleDoneClick = (task) => {
        this.props.markAsDone(task);
    }

    handleDeleteClick = (task) => {
        this.props.deleteTask(task);
    }

    handleReOpenClick = (task) => {
        this.props.reOpenTask(task);
    }

    render() {

        let allTasks = this.props.allTasks.map((task, key) => {
            if (task['status'] === "pending") {
                return (
                    <tr key={key} style={{ backgroundColor: "yellow" }}>
                        {Object.keys(task).map(key => {
                            if (key !== "id" && key !== "description" && key !== "status") {
                                return <td>{task[key]}</td>
                            } else if (key === "id") {
                                return <td>
                                    <span>
                                        <Button onClick={() => { this.handleEditClick(task) }} variant="secondary" style={{ margin: "5px" }}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
                                        <Button onClick={() => { this.handleDoneClick(task) }} variant="success" style={{ margin: "5px" }}><i class="fa fa-check-square-o" aria-hidden="true"></i></Button>
                                        <Button onClick={() => { this.handleDeleteClick(task) }} variant="danger" style={{ margin: "5px" }}><i class="fa fa-trash" aria-hidden="true"></i></Button>
                                    </span>
                                </td>
                            }
                        })}
                    </tr>
                )
            } else {
                return (
                    <tr key={key} style={{ backgroundColor: "green" }}>
                        {Object.keys(task).map(key => {
                            if (key !== "id" && key !== "description" && key !== "status") {
                                return <td>{task[key]}</td>
                            } else if (key === "id") {
                                return <td>
                                    <span>
                                        <Button onClick={() => { this.handleReOpenClick(task) }} variant="secondary" style={{ margin: "5px" }}>Re-open</Button>
                                    </span>
                                </td>
                            }
                        })}
                    </tr>
                )
            }
        });


        let editTask = this.props.selectedTask ? <EditTask data={this.props.selectedTask} show={this.props.showEditModal} /> : null;

        return (
            <div>
               <Table id="task" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Summary</th>
                            <th>Priority</th>
                            <th>Created On</th>
                            <th>Due Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTasks}
                    </tbody>
                </Table>
                {editTask}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allTasks: state.allTasks,
        tasks: state.tasks,
        doneTasks: state.doneTasks,
        showEditModal: state.showEditModal,
        selectedTask: state.selectedTask
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteTask: (task) => dispatch(actions.deleteTask(task)),
        toggleEditModal: () => dispatch(actions.toggleEditModal()),
        editTask: (task) => dispatch(actions.editTask(task)),
        markAsDone: (task) => dispatch(actions.markAsDone(task)),
        reOpenTask: (task) => dispatch(actions.reOpenTask(task))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTasks);