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
    const [groupBy, setGroupBy] = useState('');
    const [searchText, setSearchText] = useState('');
    const [allCheck, setAllCheck] = useState(false);

    // Adding key board shortcut for search
    document.onkeyup = function(e) {
        if (e.ctrlKey && e.shiftKey && e.which === 70) {
            const searchNode = document.getElementById('global-search');
            if (searchNode) {
                searchNode.focus();
            }
        }
    }

    useEffect(() => {
        setTasks(getOrderedTasks(tasks, sortEle));
        setAllCheck()
    }, [tasks, sortEle]);

    const handleClose = () => setShowModal(false);

    const removeHighlighting = () => {
        // delete all nodes with highlight class.
        document.querySelectorAll('.highlight').forEach(a => {
            // dirty work around to remove highlighted span
            // eslint-disable-next-line
            a.parentElement.innerText = a.parentElement.innerText;
        });
    }

    const setCheckOnAllTasks = () => {
        let allTasks = tasksList.map(t => {
            t.checked = !allCheck;
            return t;
        });
        setAllCheck(!allCheck);
        setTasks(allTasks);
    };

    const setCheckOnTask = (taskId) => {
        let taskIndex = tasksList.findIndex(t => t.id === taskId);
        let task = tasksList[taskIndex];
        task.checked = !task.checked;
        const allTasks = [
            ...tasksList.slice(0, taskIndex),
            task,
            ...tasksList.slice(taskIndex + 1)
        ];
        setAllCheck(allTasks.every(t => t.checked));
        setTasks(allTasks);
    }

    const handleSearch = ({ target: { value } }) => {
        setSearchText(value);
        removeHighlighting();
        if (value) {
            const elementsToHighlight = [
                ...document.getElementsByClassName('summary'),
                ...document.getElementsByClassName('description'),
            ];
            for (let ele of elementsToHighlight) {
                var innerHTML = ele.innerHTML;
                var index = innerHTML.toLowerCase().indexOf(value.toLowerCase());
                if (index >= 0) {
                    innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" +
                        innerHTML.substring(index, index + value.length) + "</span>" + innerHTML.substring(index + value.length);
                    ele.innerHTML = innerHTML;
                }
            }
        }
    };

    const handleGroupBy = ({ target: { value } }) => setGroupBy(value);

    const handleClearFilters = () => {
        setSearchText('');
        setGroupBy('');
        removeHighlighting();
    };

    const getTasks = tasks => {
        if (!searchText) {
            return tasks;
        }
        const cols = Coldefs.filter(c => c.allowSearch);
        let filteredTasks = tasks.filter(t => {
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
                        id='global-search'
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
                            .map(c => <option key={`option-${c.key}`} value={c.key}>{c.header}</option>)}
                    </select>
                </div>
            </div>
            <Tabs id="tasks-tabs" fill>
                <Tab eventKey="allTasks" title="All tasks">
                    <TaskGrid
                        type='all'
                        {...props}
                        tasksList={getTasks(tasksList)}
                        sortEle={sortEle}
                        setSortEle={setSortEle}
                        setTasks={setTasks}
                        groupBy={groupBy}
                        setCheckOnAllTasks={setCheckOnAllTasks}
                        setCheckOnTask={setCheckOnTask}
                        allCheck={allCheck}
                    />
                </Tab>
                <Tab eventKey="completed" title="Completed">
                    <TaskGrid
                        type='completed'
                        {...props}
                        tasksList={getTasks(completedTasks)}
                        sortEle={sortEle}
                        setSortEle={setSortEle}
                        setTasks={setTasks}
                        groupBy={groupBy}
                        setCheckOnAllTasks={setCheckOnAllTasks}
                        setCheckOnTask={setCheckOnTask}
                        allCheck={allCheck}
                    />
                </Tab>
                <Tab eventKey="pending" title="Pending">
                    <TaskGrid
                        type='pending'
                        {...props}
                        tasksList={getTasks(pendingTasks)}
                        sortEle={sortEle}
                        setSortEle={setSortEle}
                        setTasks={setTasks}
                        groupBy={groupBy}
                        setCheckOnAllTasks={setCheckOnAllTasks}
                        setCheckOnTask={setCheckOnTask}
                        allCheck={allCheck}
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
