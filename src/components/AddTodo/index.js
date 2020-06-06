import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoModal } from '../../actions';

const AddTodo = () => {
    const dispatch = useDispatch();
    const toggleModal = () => {
        console.log("HI")
        dispatch(addTodoModal());
    }
    return (
        <div className="footer col-12">        
            <button type="button" className="btn btn-info" onClick={toggleModal}> + </button>
        </div>
    )
} 

export default AddTodo;
