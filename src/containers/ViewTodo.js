import React from 'react'
import {connect} from 'react-redux'
import {viewTodo} from '../actions'
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

let ViewTodo = ({id, dispatch, todo}) => {
    const [open, setOpen] = React.useState(false)
    const viewModalStyle = {
        modal: {
            padding: '5px',
            borderRadius: '10px',
        }
    }
    return (
        <div style={{ display: 'inline', margin: '5px' }}>
            <button className="button" onClick={() => setOpen(true) }>
                <span onClick={e => {
                    e.preventDefault()

                    dispatch(viewTodo(id, todo))

                } } className="glyphicon glyphicon-folder-open"></span>
            </button>
            <Modal open={open} onClose={() => setOpen(false) } center styles={viewModalStyle}>
                <div className="container col-8">
                    <table className="table table-bordered" >
                        <tbody >
                            <tr>
                                <td ><h4><span>Summary: </span></h4></td>
                                <td><div className="alert alert-success" role="alert">{todo.summary}</div></td>
                            </tr>
                            <tr>
                                <td><h4><span>Description: </span></h4></td>
                                <td><div className="alert alert-success" role="alert">{todo.description}</div></td>
                            </tr>
                            <tr>
                                <td><h4><span>Priority: </span></h4></td>
                                <td><div className="alert alert-success" role="alert">{todo.priority}</div></td>
                            </tr>
                            <tr>
                                <td><h4><span>Created on: </span></h4></td>
                                <td><div className="alert alert-success" role="alert">{todo.created_date}</div></td>
                            </tr>
                            <tr>
                                <td> <h4><span>Due date: </span></h4></td>
                                <td><div className="alert alert-success" role="alert">{new Date(todo.due_date).toString().split(' ').slice(1, 4).join('-')}</div></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
            </Modal>

        </div>
    )
}

ViewTodo = connect()(ViewTodo)

export default ViewTodo