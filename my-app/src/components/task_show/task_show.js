import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Table from './../UI/Table/table'
import { useSelector, useDispatch } from 'react-redux'
import TaskAdd from './../task_add/task_add'
import * as actions from './../../store/actions/index'
import Navbar from './../navbar/navbar'



function TaskShow(props) {
    const dispatch = useDispatch();
    const [key, setKey] = useState('all')
    const [edit, setEdit] = useState(false);
    const [index, setIndex] = useState(-1);
    const [search, setSearch] = useState('');
    const [state, setState] = useState({
        summary: '',
        description: '',
        priority: 'None',
        due_date: ''
    })
    const data = useSelector(state => state.tag_reducer.tags)
    let duplicate_data = [...data]

    const handleClose = () => setEdit(false);
    const handleShow = () => setEdit(true)
    const update_data = (itemkey, itemvalue) => {
        setState({ ...state, [itemkey]: itemvalue })
    }

    const task_action = (itemkey, itemvalue) => {
        if (itemkey === 'edit') {
            setEdit(true)
            setIndex(itemvalue)
            setState(duplicate_data[itemvalue])
            return
        }
        dispatch(actions.list_action(duplicate_data, itemkey, itemvalue))
    }

    const onSubmit = () => {
        if (actions.validate(state)) {
            return
        }
        if (window.confirm("Are you want to update data")) {
            dispatch(actions.update_tag(duplicate_data, state, index))
            setEdit(false)
            setState({ summary: '', description: '', priority: 'None', due_date: '' })
        }
    }

    return (
        <React.Fragment>
            <Navbar search={(item) => setSearch(item)} />
            <TaskAdd
                onSubmit={onSubmit}
                show={edit}
                handleClose={handleClose}
                handleShow={handleShow}
                data={state}
                update_data={(itemkey, itemvalue) => update_data(itemkey, itemvalue)} />
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}>
                <Tab eventKey="all" title="All">
                    <Table data={duplicate_data}
                        isComplete="all"
                        search_ele={search}
                        clicked={(itemkey, itemvalue) => task_action(itemkey, itemvalue)} />
                </Tab>
                <Tab eventKey="completed" title="Completed">
                    <Table data={duplicate_data}
                        isComplete={true}
                        search_ele={search}
                        clicked={(itemkey, itemvalue) => task_action(itemkey, itemvalue)} />
                </Tab>
                <Tab eventKey="pending" title="Pending" >
                    <Table data={duplicate_data} isComplete={false}
                        search_ele={search}
                        clicked={(itemkey, itemvalue) => task_action(itemkey, itemvalue)} />
                </Tab>
            </Tabs>
        </React.Fragment>
    )
}

export default TaskShow