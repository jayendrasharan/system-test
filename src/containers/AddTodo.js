import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'



const AddTodo = ({ dispatch, close }) => {

    const initTodo = {
    summary: '',
    description : '',
    priority: 'None',
    created_date: new Date().toString().split(' ').slice(1, 4).join('-'),
    due_date: '',
    }

    const message = {
    summaryError: '',
    descriptionError: '',
    due_dateError: '',
    }

    const [todo, setTodo] = useState(initTodo);
    const [err, setError] = useState(message);

    const handleChange = e => {
        const {name, value} = e.target;
        setTodo({...todo, [name]: value});
    }    

    
    const saveTodo = (e) => {
        e.preventDefault()
        if(todo.summary === '') {
        setError({
            summaryError: '* Summary should not be empty'
        })
        }
        else if(todo.summary.length < 10) {
        setError({
            summaryError: '* Summary must have at least 10 characters'
        })
        }
        else if(todo.summary.length > 140) {
        setError({
            summaryError: '* Summary should not exceed 140 characters'
        })
        }
        else if(todo.description === '') {
        setError({
            descriptionError: '* Description should not be empty'
        })
        }
        else if(todo.description.length < 10) {
        setError({
            descriptionError: '* Description must have at least 10 characters'
        })
        }
         else if(todo.description.length > 500) {
        setError({
            descriptionError: '* Description should not exceed 500 characters'
        })
        }
        else if(todo.due_date === '') {
        setError({
            due_dateError: '* Due date should not be empty'
        })
        }
        else {
        dispatch(addTodo(todo));
        close(e);
        
        }
    }

    return (
        <div className="container">
            <form>
                <div className="form-group col-md-8">
                    <input type="text" value={todo.summary} name="summary" onChange={handleChange}  className="form-control" placeholder="Summary" />
                    <p style={{color: 'red', fontSize: '12'}}>{err.summaryError}</p>
                </div>
                <div className="form-group col-md-8">
                    <textarea rows="4" value={todo.description} name="description" onChange={handleChange} className="form-control" placeholder="Description" required />
                    <p style={{color: 'red', fontSize: '12'}}>{err.descriptionError}</p>
                </div>
                <div className="form-group col-md-8">
                    <label htmlFor="exampleFormControlSelect1">Priority</label>
                    <select className="form-control" id="exampleFormControlSelect1" value={todo.priority} name="priority" onChange={handleChange} >
                        <option>None</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
                <div className="form-group col-md-8">
                    <input type="date" value={todo.due_date} name="due_date" onChange={handleChange} className="form-control" />
                    <p style={{color: 'red', fontSize: '12'}}>{err.due_dateError}</p>
                </div>
                <div className="form-group col-md-8">
                    <button type="submit" className="btn btn-primary" style={{margin: '20px', float: 'right'}} onClick={close}>Close</button>
                    <button type="submit" className="btn btn-primary" style={{margin: '20px', float: 'right'}} onClick={saveTodo} >Save</button>
                </div>
            </form>
        </div>
    )
}

export default connect()(AddTodo)