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
const StyledGroupHeaderRow = styled.td`
    background-color: #3e464e;
    text-align: center;
    font-weight: 800;
    text-transform: uppercase;
    text-decoration: underline;
`

const StyledTaskCell = styled.td`
    padding: 4px;
    vertical-align: middle !important;
`

const getTaskRows = (tasks, groupByKey, props) => {
    let resultTasks = tasks;
    const {searchText, showModal, setTaskStatus} = props;
    resultTasks = tasks.reduce((result, item) => {
        (result[item[groupByKey]] = result[item[groupByKey]] || []).push(item)
        return result
    }, {})

    let resultantRows = [];
    Object.keys(resultTasks).forEach((group, index) => {
        if (groupByKey !== "") {
            resultantRows.push(
                <tr key={"group-" + index}>
                    <StyledGroupHeaderRow colSpan={6}>
                        {group}
                    </StyledGroupHeaderRow>
                </tr>
            )
        }

        resultTasks[group].forEach(taskItem => {
            const {currentState, id, title, priority, createdOn, dueDate,} = taskItem;
            let item = <StyledTaskRow
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
                        value={(createdOn)} searchText={searchText}
                        isSearchable={TaskModel.createdOn.allowSearch}
                    />
                </StyledTaskCell>
                <StyledTaskCell>
                    <SearchFormattedText
                        value={(dueDate)} searchText={searchText}
                        isSearchable={TaskModel.dueDate.allowSearch}
                    />
                </StyledTaskCell>
                <StyledTaskCell style={{display: "flex", flexDirection: "row"}}>
                    <Button
                        onClick={() => {
                            showModal({
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
                            showModal({
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
                            setTaskStatus([id])
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
                            showModal({
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
            </StyledTaskRow>;
            resultantRows.push(item)
        })
    })
    return resultantRows;
}

class TasksListing extends React.Component {
    render() {
        const {tasks, sortKey, sortOrder, groupByKey, handleSetSort} = this.props;
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
                            getTaskRows(tasks, groupByKey, this.props)
                        }
                        </tbody>
                    </Table>
                }
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksListing);