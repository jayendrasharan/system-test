import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';


function TaskShow() {
    const [key, setKey] = useState('home')
    return (
        <React.Fragment>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}>
                <Tab eventKey="home" title="Home">

                </Tab>
                <Tab eventKey="profile" title="Profile">

                </Tab>
                <Tab eventKey="contact" title="Contact" >

                </Tab>
            </Tabs>
        </React.Fragment>
    )
}

export default TaskShow