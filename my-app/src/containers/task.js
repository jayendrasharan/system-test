import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import AddBtn from './../components/UI/add/add'
import TaskAdd from '../components/task_add/task_add'
import TaskShow from './../components/task_show/task_show'
function Task() {
    const [show, setShow] = useState(false);
    const [state, setState] = useState({
        summary: '',
        description: '',
        priority: '',
        due_date: ''
    })
    const data = useSelector(state => state.tag_reducer.tags)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)
    const update_data = (itemkey, itemvalue) => {
        setState({ ...state, [itemkey]: itemvalue })
    }
    const onSubmit = () => {
        const new_data = {
            summary: state.summary,
            description: state.description,
            priority: state.priority,
            due_date: state.due_date,
            created_date: new Date()
        }
        if (window.confirm("Are you want to add data")) {
            data.push(new_data)
            alert('data submittrd')
            setShow(false)
          } 
    }

    return (
        <div className="App">
            <TaskShow/>
            <TaskAdd
                onSubmit={onSubmit}
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
                data={state}
                update_data={(itemkey, itemvalue) => update_data(itemkey, itemvalue)}
            />
            <AddBtn show={handleShow} />
        </div>
    );
}


export default Task  