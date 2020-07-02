import React, { useState } from 'react'
import Todo from './Todo'



const TodoList = ({ todos, toggleTodo }) => {


const sort = {
    summary: false,
    description: false,
    due_date: false,
    }

    const [todosList, setTodosList] = useState(sort);


const sortBySummary = (e) => {
    // const sorted = [...todosData].sort((a, b) => {
    //     return a.summary.localeCompare(b.summary)
    // })..map((item, i) => <List key={i} data={item} />)
    // setTodosList(sorted);
    // console.log(sorted)
    // console.log(todosData)

    e.preventDefault()
        
        setTodosList({
            summary: !todosList.summary
        })

        console.log(todosList.summary);
        
}

    return(
    <div style={{
        marginTop: '25px',
    }}>
        <table className="table table-striped table-hover bg-light">
            <thead className="thead-dark">
                <tr>
                    <th onClick={sortBySummary}>Summary</th>
                    <th>Priority</th>
                    <th>Created on</th>
                    <th>Due date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {todos.length === 0 ?
                    <tr>
                        <td colSpan="5"><center>  No Tasks to show.</center></td>
                    </tr> : null}
                {
                    (todosList.summary === true) ? 
                   console.log(todos.map(todo => (
                    <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id) } />
                   )).map(sorted => sorted.props.text).sort((a,b) => {
                       return a.summary.localeCompare(b.summary)
                   })) :
                    todos.map(todo => (
                    <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id) } />
                )) 
                }
            </tbody>
        </table>
    </div>
);

}

export default TodoList