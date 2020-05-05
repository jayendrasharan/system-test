import React from 'react'
import {connect} from 'react-redux'
import {deleteTodo} from '../actions'
import swal from 'sweetalert';

let RemoveTodo = ({id, dispatch}) => {


    return (
        <div style={{ display: 'inline', margin: '5px' }}>
            <button className="button" onClick={e => {
                    e.preventDefault()


                    swal({
                        title: 'Do you want to delete this task ?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        buttons: [
                            'No, cancel it!',
                            'Yes, delete it!'
                        ],

                    }).then((value) => {
                        if (value) {
                            dispatch(deleteTodo(id))
                            swal(
                                'Deleted!',
                                'Task has been deleted.',
                                'success'
                            )
                        }
                    });



                    
                } } >
                <span  className="glyphicon glyphicon-trash"></span>
            </button>

        </div>
    )
}

RemoveTodo = connect()(RemoveTodo)

export default RemoveTodo