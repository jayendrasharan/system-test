

import React from 'react';
import {connect} from 'react-redux';
import './AddTodoForm.scss'
import TodoForm from '../TodoForm/TodoForm'

const AddTodoForm = (props)=>{
    let form = props.data;
    return (
        <div className="form-wrapper">
            <TodoForm data={form}/>
            <div className="form-actions">
                <div className="app-button raised add-button" onClick={()=>props.addTask(form)}>
                    <span>Save</span>
                </div>
                <div className="app-button raised cancel-button" onClick={props.closeModal}>
                    <span>Cancel</span>
                </div>
            </div>
        </div>
    )
}

export default AddTodoForm;