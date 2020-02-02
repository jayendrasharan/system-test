import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { deleteTodo, toggleStatus } from '../redux'

// Import AddToto Component
import Model from './Model'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_PENDING } from './config'
let date = new Date()
const initialState = {
    summary: '',
    description: '',
    createdDate: `${date.getFullYear()}-${date.getMonth() < 9 ? `0${date.getMonth()}` : date.getMonth()}-${date.getDate() < 9 ? `0${date.getDate()}` : date.getDate()}`,
    dueDate: '',
    priority: 'None',
    completed: false
}

const TodoList = () => {
    const [showModel, setShowModel] = useState(false)
    const [editTodo, setEditTodo] = useState(initialState)
    const [searchKey, setSearchKey] = useState('')
    const todos = useSelector(state => state)
    const dispatch = useDispatch()
    const [filteredTodos, setFilteredTodos] = useState(todos)


    // const sortedTodos = []

    useEffect(() => {
        setFilteredTodos(todos)

    }, [todos])




    console.log(todos)

    //filter todos on completion status
    const filterTodos = async (filter) => {
        switch (filter) {
            case SHOW_ALL:
                await setFilteredTodos(todos)
                break
            case SHOW_COMPLETED:
                await setFilteredTodos(todos.filter(todo => todo.completed))
                // filteredTodos = todos.filter(todo => todo.completed)
                break
            case SHOW_PENDING:
                console.log(todos)
                await setFilteredTodos(todos.filter(todo => !todo.completed))
                // filteredTodos = todos.filter(todo => !todo.completed)
                break
            default:
                break
        }
    }


    //set model status
    const model = (e, todo) => {
        e.stopPropagation();
        setShowModel(!showModel)
        setEditTodo(todo)

    }
    //to close model
    const close = () => {
        setShowModel(false)
        setEditTodo(initialState)
    }

    const status = (e, todo) => {
        e.stopPropagation();
        dispatch(toggleStatus(todo))
    }

    const handleChange = (e) => {
        setSearchKey(e.target.value)
        // setFilteredTodos(filterForSearch.filter())
    }




    return (
        <div className='todo-container'>
            <form className='inline-form search-container'>
                <div className='form-group mr-2'>
                    <input type='text' className='form-control' placeholder='Search Todos' value={searchKey} onChange={handleChange} />
                </div>
            </form>
            <div className='tabs-container'>
                <nav className='nav' >
                    <a className='nav-link' onClick={() => filterTodos(SHOW_ALL)}>All</a>
                    <a className='nav-link' onClick={() => filterTodos(SHOW_COMPLETED)}>Completed</a>
                    <a className='nav-link' onClick={() => filterTodos(SHOW_PENDING)}>Pending</a>
                </nav>


            </div>
            <table className='table '>
                <thead className='thead-light'>
                    <tr>
                        <th scope="col" name='summary' >Summary</th>
                        <th scope="col" name='priority' >Priority</th>
                        <th scope="col" name='createddate'>Created Date</th>
                        <th scope="col" value='duedate' >Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='h-25 overflow-auto'>

                    {
                        filteredTodos &&
                        filteredTodos.filter(todo => {
                            if (!searchKey) return true
                            return todo.summary.toLowerCase().includes(searchKey)

                        }
                        ).map(todo => {
                            return (
                                <tr key={todo.id} style={{ border: '1px solid black' }} className={`todo-item ${todo.completed ? 'bg-success' : ''}`} onClick={(e) => model(e, { ...todo, view: true })} >
                                    <td >{todo.summary}</td>
                                    <td >{todo.priority}</td>
                                    <td >{todo.createdDate}</td>
                                    <td >{todo.dueDate}</td>
                                    <td className='action'>
                                        <span onClick={(e) => status(e, todo)}>{todo.completed ? 'Open' : 'Done'}</span>
                                        <span onClick={(e) => model(e, todo)}><i className="far fa-edit"></i></span>
                                        <span onClick={(e) => { e.stopPropagation(); dispatch(deleteTodo(todo.id)) }}><i className="fas fa-trash"></i></span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>


            <div className='plus' onClick={(e) => model(e, initialState)}>
                <i className="fas fa-plus-circle"></i>
            </div>

            {showModel && <Model todo={editTodo} onClose={close} />}

        </div >
    )
}



export default TodoList