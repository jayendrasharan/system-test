import React from 'react';
import { connect } from 'react-redux'

import EditIcon from '../ui/Icons/editIcon'
import DeleteIcon from '../ui/Icons/deleteIcon'

import { completeTask, deleteTask, togglePopup } from '../Store/actions/actions'

import './style.css'


const actionBox = (props) => {
    return (
        <div className="action-icon-holder">
            <EditIcon className="flex-item" handleClick={() => props.togglePopup({ type: 'edit', data: props.taskObject })} size={{ 'height': '20px', 'width': '20px' }} />
            <DeleteIcon className="flex-item" handleClick={() => props.deleteTask(props.itemId)} size={{ 'height': '20px', 'width': '20px' }} />
            {(<span className="flex-item comp-link" onClick={() => props.completeTask(props.itemId)}>{props.isCompleted ? 'Un-done' : 'Complete Task'}</span>)}
        </div>

    )
}


const mapDispatchToProps = (dispatch) => ({
    completeTask: (payload) => dispatch(completeTask(payload)),
    deleteTask: (payload) => dispatch(deleteTask(payload)),
    togglePopup: (contentType) => dispatch(togglePopup(contentType))
})

export default connect('', mapDispatchToProps)(actionBox);


