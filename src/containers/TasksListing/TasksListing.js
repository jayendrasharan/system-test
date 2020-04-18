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
import {deleteTask, toggleTaskStatus} from '../../actions/tasksAction';
import {MODAL_TYPES} from "../../actionTypes/app";
import SortableTableCell from "../../components/SortableTableCell";

import {TaskModel} from '../../models/task';
import {getFormattedDate} from "../../utils";
import SearchFormattedText from "./SearchFormattedText";

const mapStateToProps = (state) => ({
    tasksState: state.tasksState,
});

const mapDispatchToProps = (dispatch) => {
    return {
        setTaskStatus: (taskIds) => dispatch(toggleTaskStatus(taskIds)),
        deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    }
};

const StyledTaskRow = styled.tr`
    font-weight: ${props => props.bold ? "bold" : "inherit"};
    text-decoration: ${props => props.currentState ? "none" : "line-through"};
    /*background-color: ${props => props.currentState ? "inherit" : "maroon !important"};*/
`

const StyledTaskHeader = styled.tr`
    font-weight: ${props => props.bold ? "bold" : "inherit"};
    background-color: #25292d;
`

const StyledTaskCell = styled.td`
    vertical-align: middle !important;
`

class TasksListing extends React.Component {
    render() {
        const {tasks, sortKey, sortOrder, handleSetSort, searchText} = this.props;
        return (
            <>
                {
                    tasks.length === 0
                    && <div style={{margin: "auto", padding: 32}}>
                        <h5>No Tasks here</h5>
                    </div>
                }
                {
                    tasks.length > 0
                    && <Table bordered variant="dark" style={{marginTop: 12}}>
                        <thead>
                        <StyledTaskHeader bold>
                            {
                                Object.keys(TaskModel).map((taskDataKey, index) => {
                                    if (TaskModel[taskDataKey].hidden) {
                                        return null;
                                    }
                                    let currentItem = TaskModel[taskDataKey];
                                    return <SortableTableCell
                                        handleSetSort={handleSetSort}
                                        key={"header-" + index}
                                        sortable={currentItem.allowSort}
                                        dataKey={taskDataKey}
                                        sortOrder={sortOrder}
                                        sortKey={sortKey}
                                    >
                                        {currentItem.label}
                                    </SortableTableCell>
                                })
                            }
                            <td width={25}>Actions</td>
                        </StyledTaskHeader>
                        </thead>
                        <tbody>
                        {
                            tasks.map(taskItem => {
                                const {currentState, id, title, priority, createdOn, dueDate,} = taskItem;
                                return <StyledTaskRow
                                    key={id}
                                    currentState={currentState}
                                >
                                    <StyledTaskCell>
                                        <SearchFormattedText
                                            value={title} searchText={searchText}
                                            isSearchable={TaskModel.title.allowSearch}
                                        />
                                    </StyledTaskCell>
                                    <StyledTaskCell>
                                        <SearchFormattedText
                                            value={priority} searchText={searchText}
                                            isSearchable={TaskModel.priority.allowSearch}
                                        />
                                    </StyledTaskCell>
                                    <StyledTaskCell>
                                        <SearchFormattedText
                                            value={getFormattedDate(createdOn)} searchText={searchText}
                                            isSearchable={TaskModel.createdOn.allowSearch}
                                        />
                                    </StyledTaskCell>
                                    <StyledTaskCell>
                                        <SearchFormattedText
                                            value={getFormattedDate(dueDate)} searchText={searchText}
                                            isSearchable={TaskModel.dueDate.allowSearch}
                                        />
                                    </StyledTaskCell>
                                    <StyledTaskCell style={{display: "flex", flexDirection: "row"}}>
                                        <Button
                                            onClick={() => {
                                                this.props.showModal({
                                                    modalType: MODAL_TYPES.VIEW_TASK_MODAL,
                                                    modalProps: {
                                                        task: taskItem
                                                    }
                                                })
                                            }}
                                            title={"View Task"}
                                            style={{marginRight: 6}} variant={"dark"}
                                        >
                                            <FiEye/>
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                this.props.showModal({
                                                    modalType: MODAL_TYPES.EDIT_TASK_MODAL,
                                                    modalProps: {
                                                        task: taskItem
                                                    }
                                                })
                                            }}
                                            title={"Edit Task"}
                                            style={{marginRight: 6, marginLeft: 6}} variant={"dark"}
                                        >
                                            <FiEdit/>
                                        </Button>
                                        <Button
                                            title={`Mark as ${currentState ? "Completed" : "Pending"}`}
                                            onClick={() => {
                                                this.props.setTaskStatus([id])
                                            }}
                                            style={{marginRight: 6, marginLeft: 6}}
                                            variant={currentState ? "success" : "info"}
                                        >
                                            {currentState ? <FiCheckCircle/> : <FiXCircle/>}
                                        </Button>
                                        <Button
                                            title={"Delete Task"}
                                            style={{marginLeft: 6}} variant={"danger"}
                                            onClick={() => {
                                                this.props.showModal({
                                                    modalType: MODAL_TYPES.DELETE_TASK_MODAL,
                                                    modalProps: {
                                                        taskId: taskItem.id,
                                                        taskTitle: taskItem.title,
                                                    }
                                                })
                                            }}
                                        >
                                            <FiTrash/>
                                        </Button>
                                    </StyledTaskCell>
                                </StyledTaskRow>
                            })
                        }
                        </tbody>
                    </Table>
                }
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksListing);