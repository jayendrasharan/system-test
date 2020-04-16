/**
 * Created by Rakesh Peela
 * Date: 17-Apr-2020
 * Time: 12:49 AM
 */

import React from 'react';
import {Button, Table} from "react-bootstrap";
import {FiCheckCircle, FiEdit, FiEye, FiTrash, FiXCircle} from 'react-icons/fi';
import {connect} from "react-redux";
import styled from 'styled-components';

import {TaskModel} from '../../models/task';
import {toggleTaskStatus} from '../../actions/tasksAction';
import {getTimeFromMillis} from "../../utils";

const mapStateToProps = (state) => ({
    tasksState: state.tasks,
});

const mapDispatchToProps = (dispatch) => {
    return {
        setTaskStatus: (taskIds) => dispatch(toggleTaskStatus(taskIds)),
    }
};

const StyledTaskRow = styled.tr`
    text-decoration: ${props => props.currentState ? "none" : "line-through"};
    /*background-color: ${props => props.currentState ? "inherit" : "maroon !important"};*/
`

const StyledTaskCell = styled.td`
    vertical-align: middle !important;
`

class TasksListing extends React.Component {
    render() {
        const {tasks, setTaskStatus} = this.props;
        return (
            <Table striped bordered variant="dark" style={{marginTop: 12}}>
                <thead>
                <tr>
                    {
                        Object.keys(TaskModel).map((taskDataKey, index) => {
                            if (TaskModel[taskDataKey].hidden) {
                                return null;
                            }
                            let currentItem = TaskModel[taskDataKey];
                            return <td key={"header-" + index}>
                                {currentItem.label}
                            </td>
                        })
                    }
                    <td width={25}>Actions</td>
                </tr>
                </thead>
                <tbody>
                {
                    tasks.map(taskItem => {
                        return <StyledTaskRow
                            key={taskItem.id}
                            currentState={taskItem.currentState}
                        >
                            <StyledTaskCell>
                                {taskItem.currentState ? "Open" : "Completed"}
                            </StyledTaskCell>
                            <StyledTaskCell>
                                {taskItem.title}
                            </StyledTaskCell>
                            <StyledTaskCell>
                                {getTimeFromMillis(taskItem.createdOn)}
                            </StyledTaskCell>
                            <StyledTaskCell>
                                {getTimeFromMillis(taskItem.dueDate)}
                            </StyledTaskCell>
                            <StyledTaskCell>
                                {taskItem.priority}
                            </StyledTaskCell>
                            <StyledTaskCell style={{display: "flex", flexDirection: "row"}}>
                                <Button
                                    style={{marginRight: 6}} variant={"dark"}
                                >
                                    <FiEye/>
                                </Button>
                                <Button
                                    style={{marginRight: 6, marginLeft: 6}} variant={"dark"}
                                >
                                    <FiEdit/>
                                </Button>
                                <Button
                                    onClick={() => {
                                        this.props.setTaskStatus([taskItem.id])
                                    }}
                                    style={{marginRight: 6, marginLeft: 6}}
                                    variant={taskItem.currentState ? "success" : "info"}
                                >
                                    {taskItem.currentState ? <FiCheckCircle/> : <FiXCircle/>}
                                </Button>
                                <Button
                                    style={{marginLeft: 6}} variant={"danger"}
                                >
                                    <FiTrash/>
                                </Button>
                            </StyledTaskCell>
                        </StyledTaskRow>
                    })
                }
                </tbody>
            </Table>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksListing);