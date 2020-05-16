import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Tabs, Tab, Button } from 'react-bootstrap';
import TaskGrid from './TaskGrid';
import TaskModal from './TaskModal';
import './tasks.css';
import { getOrderedTasks } from '../../utils/taskHelper';
import { Coldefs } from './coldefs';

const TaskView = (props) => {

    const { tasks } = props;

    const [showModal, setShowModal] = useState(false);
    const [sortEle, setSortEle] = useState({ summary: 'asc' });
    const [tasksList, setTasks] = useState(getOrderedTasks(tasks, sortEle));
    const [groupBy, setGroupBy] = useState();
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        setTasks(getOrderedTasks(tasks, sortEle));
    }, [tasks, sortEle]);

    const handleClose = () => setShowModal(false);

    const handleSearch = ({ target: { value } }) => setSearchText(value);

    const handleGroupBy = ({ target: { value } }) => {};

    const handleClearFilters = () => {
        setSearchText('');
    };

    const getTasks = tasks => {
        if (!searchText) {
            return tasksList;
        }
        const cols = Coldefs.filter(c => c.allowSearch);
        let filteredTasks = tasksList.filter(t => {
            for (let c of cols) {
                if (t[c.key] && t[c.key].toLowerCase().includes(searchText.toLowerCase())) {
                    return true;
                }
            }
            return false;
        });
        return filteredTasks;
    }

    const pendingTasks = tasksList && tasksList.length ? tasksList.filter(t => t.currentState === 'open') : [];
    const completedTasks = tasksList && tasksList.length ? tasksList.filter(t => t.currentState !== 'open') : [];

    return (
        <div className='tasks-wrapper'>
            <div className='task-header'>
                <div className="input-group mb-3 task-header-input">
                    <input
                        placeholder='Search tasks'
                        onChange={handleSearch}
                        value={searchText}
                    />
                </div>
                <Button className="task-header-btn" variant="light" onClick={handleClearFilters}>
                    Clear Filters
                </Button>
                <div className="input-group mb-3 task-header-group-by">
                    <select
                        className="form-control"
                        id="groupBy"
                        value={groupBy}
                        onChange={handleGroupBy}
                    >
                        <option>Group by</option>
                        {Coldefs.filter(col => col.allowGroup && !col.hidden)
                            .map(c => <option>{c.header}</option>)}
                    </select>
                </div>
            </div>
            <Tabs id="tasks-tabs" fill>
                <Tab eventKey="allTasks" title="All tasks">
                    <TaskGrid
                        {...props}
                        tasksList={getTasks(tasksList)}
                        sortEle={sortEle}
                        setSortEle={setSortEle}
                        setTasks={setTasks}
                    />
                </Tab>
                <Tab eventKey="completed" title="Completed">
                    <TaskGrid
                        {...props}
                        tasksList={getTasks(completedTasks)}
                        sortEle={sortEle}
                        setSortEle={setSortEle}
                        setTasks={setTasks}
                    />
                </Tab>
                <Tab eventKey="pending" title="Pending">
                    <TaskGrid
                        {...props}
                        tasksList={getTasks(pendingTasks)}
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
