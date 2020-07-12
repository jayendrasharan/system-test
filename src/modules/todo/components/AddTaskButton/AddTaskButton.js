import React from 'react';
import './AddTaskButton.scss';
import {connect} from 'react-redux'
import {openModal} from '../../../shared/actions/modalActions'
import TodoForm from '../TodoForm/TodoForm'
import ModalSpace from '../../../shared/components/ModalSpace';


const AddTaskButton = ({onClick}) => {
    return (
        <div className="app-button round-raised add-task-button" onClick={() => onClick({title: 'Add a New Task ToDo', wrapperClass: "add-form-modal"})}>
            <div className="label">+</div>
        </div>
    )
}

export default connect()(AddTaskButton);