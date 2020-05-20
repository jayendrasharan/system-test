import React from 'react';
import classes from './table.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';

const Table = (props) => {

    const row_data = props.data.map((row_data, index) => (
        row_data.isComplete === props.isComplete || props.isComplete === "all" ?
            <tr
                style={{
                    backgroundColor: row_data.isComplete ? 'lightGreen' : 'white'
                }}>
                <th scope="row">{row_data.summary}</th>
                <td>{row_data.priority}</td>
                <td>{row_data.created_date}</td>
                <td>{row_data.due_date}</td>
                <td>
                    <FontAwesomeIcon icon={faEdit} onClick={() => props.clicked('edit', index)}
                     className={classes.icon_align} />
                    <FontAwesomeIcon onClick={() => props.clicked('delete', index)}
                        icon={faTrash}
                        className={classes.icon_align} />
                    {!row_data.isComplete ?
                        <Button onClick={() => props.clicked('done', index)}
                            variant="success" size="sm">Done</Button> :
                        <Button onClick={() => props.clicked('re-open', index)}
                            variant="danger" size="sm">Re-open</Button>}
                </td>
            </tr> : null
    ))


    return (
        props.data.length === 0 ? <div className={classes.no_task}>No Task, Please add the task using '+' button</div> :
            <table class="table" style={{ marginTop: 50 }}>
                <thead>
                    <tr>
                        <th scope="col">Summary</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Created On</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {row_data}
                </tbody>
            </table>

    )
}

export default Table