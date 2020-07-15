import React from 'react'
import {Tabs,Tab} from 'react-bootstrap';
import ListView from '../listView/list-view';

const TodoTabs = () => {

    return (
        <div className="container">
            <Tabs defaultActiveKey="all" id="uncontrolled-tab-example" 
                >
                <Tab eventKey="all" title="All">
                <div className="container">
                    <ListView 
                        keyData='all'/>
                </div>
            </Tab>
            <Tab eventKey="pending" title="Pending">
            <div className="container">
                    <ListView 
                        keyData='pending'/>
                </div>

            </Tab>
            <Tab eventKey="completed" title="Completed">
            <div className="container">
                    <ListView 
                        keyData='completed'/>
                </div>
            </Tab>
            </Tabs>
        </div>
    )
}

export default TodoTabs;