import React from 'react'
import { connect } from "react-redux";
import RemoveTodo from '../containers/RemoveTodo'
import ViewTodo from '../containers/ViewTodo'
import EditTodo from '../containers/EditTodo'


const Todo = ({ onClick, completed, edited,  text, id }) => (
    <tr>
        <td onClick={onClick}
            style={{
                textDecoration: completed ? 'line-through' : 'none',
                cursor: 'pointer'
            }}>
            {text.summary}
        </td>
        <td onClick={onClick}
            style={{
                textDecoration: completed ? 'line-through' : 'none',
                cursor: 'pointer'
            }}>
            {text.priority}
        </td>
        <td onClick={onClick}
            style={{
                textDecoration: completed ? 'line-through' : 'none',
                cursor: 'pointer'
            }}>
            {text.created_date}
        </td>
        <td onClick={onClick}
            style={{
                textDecoration: completed ? 'line-through' : 'none',
                cursor: 'pointer'
            }}>
            {new Date(text.due_date).toString().split(' ').slice(1, 4).join('-')}
        </td>
        <td>
            <ViewTodo id={id} todo={text} />
            <EditTodo id={id} todo={text} />
            <RemoveTodo id={id} />
        </td>
    </tr>
)


export default connect()(Todo) 