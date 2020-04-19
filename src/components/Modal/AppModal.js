/**
 * Created by Rakesh Peela
 * Date: 16-Apr-2020
 * Time: 11:29 PM
 */

import React from 'react';
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {addTask, deleteTask, editTask} from "../../actions/tasksAction";
import {MODAL_TYPES} from "../../actionTypes/app";
import AddTodoModal from "./AddTodoModal";
import DeleteAlertModal from "./DeleteAlertModal";

const mapStateToProps = (state) => ({
    app: state.appState,
})

const mapDispatchToProps = (dispatch) => ({
    handleDelete: (taskId) => dispatch(deleteTask(taskId)),
    handleEditTask: (taskId, task) => dispatch(editTask(taskId, task)),
    handleAddTask: (task) => dispatch(addTask(task)),
})

class AppModal extends React.Component {
    render() {
        const {onHide, showDialog, modalType, handleDelete, handleEditTask, handleAddTask} = this.props;
        const {app: {modalProps, progressState}} = this.props;
        const commonProps = {
            modalProps,
            handleClose: onHide,
            apiState: progressState,
        }
        let size = "lg"
        let component = null;
        switch (modalType) {
            case MODAL_TYPES.DELETE_TASK_MODAL:
                size = "md";
                component = <DeleteAlertModal
                    handleDelete={handleDelete}
                    {...commonProps}
                />;
                break;
            case MODAL_TYPES.ADD_TASK_MODAL:
                component = <AddTodoModal
                    handleAddTask={handleAddTask}
                    {...commonProps}
                />;
                break;
            case MODAL_TYPES.EDIT_TASK_MODAL:
                component = <AddTodoModal
                    handleEditTask={handleEditTask}
                    {...commonProps}
                    editMode
                />;
                break;
            case MODAL_TYPES.VIEW_TASK_MODAL:
                component = <AddTodoModal
                    {...commonProps}
                    viewOnly
                />;
                break;
            default:
                console.log("No Relevant Modal Type Found");
        }
        return (
            <Modal
                show={showDialog}
                size={size}
                onHide={onHide}
                centered
            >
                {component}
            </Modal>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AppModal);