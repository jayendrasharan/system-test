import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Table from './../UI/Table/table'
import { useSelector } from 'react-redux'



function TaskShow() {
    const [key, setKey] = useState('all')
    const data = useSelector(state => state.tag_reducer.tags)
    return (
        <React.Fragment>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}>
                <Tab eventKey="all" title="All">
                    <Table data={data} />
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