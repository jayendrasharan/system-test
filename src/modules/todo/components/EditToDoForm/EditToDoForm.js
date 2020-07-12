import React from 'react';
import {connect} from 'react-redux';
import './EditToDoForm.scss'
import TodoForm from '../TodoForm/TodoForm'

const EditToDoForm = (props)=>{
    let form = props.data;
    return (
        <div className="form-wrapper">
            <TodoForm data={form}/>
            <div className="form-actions">
                <div className="app-button raised add-button" onClick={()=>props.updateTask(form.id, form)}>
                    <span>Update</span>
                </div>
                <div className="app-button raised cancel-button" onClick={props.closeModal}>
                    <span>Cancel</span>
                </div>
            </div>
        </div>
    )
}

export default EditToDoForm;