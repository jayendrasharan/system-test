import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Tabs, Tab } from 'react-bootstrap';
import TaskGrid from './TaskGrid';
import TaskModal from './TaskModal';
import './tasks.css';
import { getOrderedTasks } from '../../utils/taskHelper';

const TaskView = (props) => {

    const { tasks } = props;

    const [showModal, setShowModal] = useState(false);
    const [sortEle, setSortEle] = useState({ summary: 'asc' });
    const [tasksList, setTasks] = useState(getOrderedTasks(tasks, sortEle));

    useEffect(() => {
        setTasks(getOrderedTasks(tasks, sortEle));
    }, [tasks, sortEle]);

    const handleClose = () => setShowModal(false);
    
    const pendingTasks = tasksList && tasksList.length ? tasksList.filter(t => t.currentState === 'open') : [];
    const completedTasks = tasksList && tasksList.length ? tasksList.filter(t => t.currentState !== 'open') : [];

    return (
        <div className='tasks-wrapper'>
            <Tabs id="tasks-tabs" fill>
                <Tab eventKey="allTasks" title="All tasks">
                    <TaskGrid
                        {...props}
                        tasksList={tasksList && tasksList.length ? tasksList : []}
                        sortEle={sortEle}
                        setSortEle={setSortEle}
                        setTasks={setTasks}
                    />
                </Tab>
                <Tab eventKey="completed" title="Completed">
                    <TaskGrid
                        {...props}
                        tasksList={completedTasks}
                        sortEle={sortEle}
                        setSortEle={setSortEle}
                        setTasks={setTasks}
                    />
                </Tab>
                <Tab eventKey="pending" title="Pending">
                    <TaskGrid
                        {...props}
                        tasksList={pendingTasks}
                        sortEle={sortEle}
                        setSortEle={setSortEle}
                        setTasks={setTasks}
                    />
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
