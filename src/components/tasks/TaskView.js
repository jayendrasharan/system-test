import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Tabs, Tab } from 'react-bootstrap';
import TaskGrid from './TaskGrid';
import TaskModal from './TaskModal';
import './tasks.css';

const TaskView = (props) => {

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

    const { tasks } = props;
    
    const pendingTasks = tasks && tasks.length ? tasks.filter(t => t.currentState === 'open') : [];
    const completedTasks = tasks && tasks.length ? tasks.filter(t => t.currentState !== 'open') : [];

    return (
        <div className='tasks-wrapper'>
            <Tabs id="tasks-tabs" fill>
                <Tab eventKey="allTasks" title="All tasks">
                    <TaskGrid
                        {...props}
                        tasks={tasks && tasks.length ? tasks : []}
                    />
                </Tab>
                <Tab eventKey="completed" title="Completed">
                    <TaskGrid {...props} tasks={completedTasks} />
                </Tab>
                <Tab eventKey="pending" title="Pending">
                    <TaskGrid {...props} tasks={pendingTasks} />
                </Tab>
            </Tabs>
            <TaskModal
                handleClose={handleClose}
                show={showModal}
                addTask={props.addTask}
                title='Add Task'
            />
            <div className="add-task" onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faPlus} size="2x" />
            </div>
        </div>
    )
}

export default TaskView;
