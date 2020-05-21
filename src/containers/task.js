import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import AddBtn from '../components/UI/add/add'
import TaskAdd from '../components/task_add/task_add'
import TaskShow from '../components/task_show/task_show'
import * as actions from '../store/actions/index'

function Task() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [state, setState] = useState({
        summary: '',
        description: '',
        priority: 'None',
        due_date: ''
    })
    const data = useSelector(state => state.tag_reducer.tags)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)


    const update_data = (itemkey, itemvalue) => {
        setState({ ...state, [itemkey]: itemvalue })    
    }
    
    const onSubmit = () => {
        if (actions.validate(state)) {
            return
         }
        let duplicate_data = [...data]
        if (window.confirm("Do you want to add data")) {
            dispatch(actions.add_new_tag(duplicate_data, state))
            setShow(false)
            setState({ summary: '', description: '', priority: 'None', due_date: '' })
        }
    }

    return (
        <div className="App">
            <TaskShow />
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