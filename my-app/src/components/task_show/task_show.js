import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Table from './../UI/Table/table'
import { useSelector, useDispatch } from 'react-redux'
import TaskAdd from './../task_add/task_add'
import * as actions from './../../store/actions/index'

function TaskShow(props) {
    const dispatch = useDispatch();
    const [key, setKey] = useState('all')
    let data = useSelector(state => state.tag_reducer.tags)

    const task_action = (itemkey, itemvalue) => {
        let duplicate_data = [...data]
        dispatch(actions.list_action(duplicate_data, itemkey, itemvalue))
    }

    return (
        <React.Fragment>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}>
                <Tab eventKey="all" title="All">
                    <Table data={data} isComplete="all"
                        clicked={(itemkey, itemvalue) => task_action(itemkey, itemvalue)} />
                </Tab>
                <Tab eventKey="completed" title="Completed">
                    <Table data={data} isComplete={true} />
                </Tab>
                <Tab eventKey="pending" title="Pending" >
                    <Table data={data} isComplete={false} />
                </Tab>
            </Tabs>
        </React.Fragment>
    )
}

export default TaskShow