import React, {useState} from 'react'
import {connect} from 'react-redux'
import {editTodo} from '../actions'
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { updateTodo } from '../actions'

let EditTodo = ({id, dispatch, todo}) => {
    const [open, setOpen] = React.useState(false)

    const message = {
    summaryError: '',
    descriptionError: '',
    due_dateError: '',
    }

    const [todoData, settodoData] = useState(todo);
    const [err, setError] = useState(message);

    const viewModalStyle = {
        modal: {
            padding: '10px',
            borderRadius: '10px',
        }
    }

    const todoChange = e => {
        const {name, value} = e.target;
        settodoData({...todoData, [name]: value});
    }

     const handleSubmit = e => {
        e.preventDefault();
        if(todoData.summary === '') {
        setError({
            summaryError: '* Summary should not be empty'
        })
        }
        else if(todoData.summary.length < 10) {
        setError({
            summaryError: '* Summary must have at least 10 characters'
        })
        }
        else if(todoData.summary.length > 140) {
        setError({
            summaryError: '* Summary should not exceed 140 characters'
        })
        }
        else if(todoData.description === '') {
        setError({
            descriptionError: '* Description should not be empty'
        })
        }
        else if(todoData.description.length < 10) {
        setError({
            descriptionError: '* Description must have at least 10 characters'
        })
        }
         else if(todoData.description.length > 500) {
        setError({
            descriptionError: '* Description should not exceed 500 characters'
        })
        }
        else if(todoData.due_date === '') {
        setError({
            due_dateError: '* Due date should not be empty'
        })
        }
        else {
        dispatch(updateTodo(id, todoData));
        setOpen(false);
        
        }
    }

    const closeModal = e => {
        e.preventDefault();
        setOpen(false);
    }

    return (
        <div style={{ display: 'inline' }}>
            <button className="button" onClick={() => setOpen(true) }>
                <span onClick={e => {
                    e.preventDefault()

                    dispatch(editTodo(id, todo))

                    
                } } className="glyphicon glyphicon-pencil"></span>
            </button>
            <Modal open={open} onClose={() => setOpen(false) } center styles={viewModalStyle}>
                <div className="container col-8" >
                    <div className="container">
            <form>

                <div className="form-group col-md-8">
                    <input type="text" value={todoData.summary} name="summary" onChange={todoChange} className="form-control" placeholder="Summary" />
                    <p style={{color: 'red', fontSize: '12'}}>{err.summaryError}</p>
                </div>
                <div className="form-group col-md-8">
                    <textarea rows="4" value = {todoData.description} name="description" onChange={todoChange} className="form-control" placeholder="Description" />
                    <p style={{color: 'red', fontSize: '12'}}>{err.descriptionError}</p>
                </div>
                <div className="form-group col-md-8">
                    <label htmlFor="exampleFormControlSelect1">Priority</label>
                    <select className="form-control" id="exampleFormControlSelect1" value={todoData.priority} name="priority" onChange={todoChange} >
                        <option>None</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
                <div className="form-group col-md-8">
                    <input type="date" value = {todoData.due_date} name="due_date" onChange={todoChange} className="form-control" />
                    <p style={{color: 'red', fontSize: '12'}}>{err.due_dateError}</p>
                </div>
                <div className="form-group col-md-8">
                    <button type="submit" className="btn btn-primary" style={{margin: '20px', float: 'right'}} onClick={closeModal} >Close</button>
                    <button type="submit" className="btn btn-primary" style={{margin: '20px', float: 'right'}} onClick={handleSubmit} >Save</button>
                </div>
            </form>
        </div>
                </div>
            </Modal>

        </div>
    )
}

EditTodo = connect()(EditTodo)

export default EditTodo