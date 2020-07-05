import React from 'react';
import Modal from "../Modal/Modal";
import ModalView from "../ModalView/ModalView";
import ModalDelete from "../ModalDelete/ModalDelete"
import moment from 'moment';
// import set from 'lodash/set';
// import get from 'lodash/get';
import tasks from '../tasksData/tasksData.json'

class Hello extends React.Component {
    constructor() {
        super();
        this.state = {
            openModal: '',
            allTasksArray: [],
            pendingArray: [],
            completedArray: [],
            showAllTasks: false,
            showCompletedtasks: false,
            showPendingTasks: false,
            storeTask: {}
        };
    }

    componentDidMount() {
        const today = moment().format('YYYY-MM-DD');
        var allDataArr = [];
        var pendingArr = [];
        var completedArr = [];
        tasks.map((task) => {
            if (task.dueDate >= today || task.currentState === 'Open') {
                console.log('pending tasks');
                pendingArr.push(task);
                this.setState({
                    pendingArray: pendingArr
                })
            } else if (task.dueDate < today || task.currentState === 'Done') {
                completedArr.push(task);
                this.setState({
                    completedArray: completedArr
                })
            }
            allDataArr.push(task);
            this.setState({
                allTasksArray: allDataArr
            })
            return null;
        })
    }

    activateModal = (value) => {
        setTimeout(function () {
            alert("Good to see you back adding new task into your list");
        }, 2000);
        this.setState({
            openModal: true
        })
    }

    closeModal = (e, value) => {
        const today = moment().format('YYYY-MM-DD');
        this.setState({
            openModal: false
        })
        if (e === 'saveModal') {
            console.log('printing value', value);
            var dataArr = {};
            var allDataArr = {};
            if (value.dueDate >= today || value.currentState === 'Open') {
                dataArr = value;
                this.setState({
                    pendingArray: [...this.state.pendingArray, dataArr]
                })
            } else if (value.dueDate < today || value.currentState === 'Done') {
                dataArr = value;
                this.setState({
                    completedArray: [...this.state.completedArray, dataArr]
                })
            }
            allDataArr = value;
            this.setState({
                allTasksArray: [...this.state.allTasksArray, allDataArr]
            })
        } else if (e === 'modalDelete') {
            const title = value.title;
            const allArrayItem = this.state.allTasksArray.filter(item => item.title !== title);
            const pendingArrayItem = this.state.pendingArray.filter(item => item.title !== title);
            const completedArrayItem = this.state.completedArray.filter(item => item.title !== title);
            value.dueDate >= today ? this.setState({allTasksArray: allArrayItem, pendingArray: pendingArrayItem})
            : this.setState({allTasksArray: allArrayItem, completedArray: completedArrayItem})
        }
    }
    enableTasks = () => {
        this.state.showAllTasks ? this.setState({ showAllTasks: false }) : this.setState({ showAllTasks: true })
    }

    showTheTasks = (value) => {
        console.log('here state', this.state.completedArray, value);
        var tasksArray = [];
        if (value === 'pending') {
            tasksArray = this.state.pendingArray
        } else if (value === 'completed') {
            tasksArray = this.state.completedArray
        } else {
            tasksArray = this.state.allTasksArray
        }
        const getTasksData = (<div>
            <div class="table">
                <tr>
                    <th>Title</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                </tr>
                {tasksArray.map((tasks) => {
                    return (
                        <tr>
                            <td>{tasks.title}</td>
                            <td>{tasks.priority}</td>
                            <td>{tasks.dueDate}</td>
                            <td><button class="Delete" onClick={() => this.setState({ openModal: 'delete', storeTask: tasks })}>{'Delete'}</button>
                            <button class="View" onClick={() => this.setState({ openModal: 'view', storeTask: tasks })}>{'View'}</button></td>
                        </tr>
                    )
                })}
            </div>
        </div>)
        return getTasksData;
    }

    openModalBox = () => {
        if (this.state.openModal === 'view') {
            return (
                <ModalView onEvent={(e, value) => this.closeModal(e, value)} task={this.state.storeTask} />
            )
        } else if (this.state.openModal === 'open') {
            return (
                <Modal onEvent={(e, value) => this.closeModal(e, value)} />
            )
        } else if(this.state.openModal === 'delete') {
           return (
            <ModalDelete onEvent={(e, value) => this.closeModal(e, value)} task={this.state.storeTask} />
           )
        } else {
            return null
        }
    }

    render() {
        console.log('checking state', this.state);
        return (
            <div>
                <div>
                    <button class="All" onClick={this.enableTasks}>Click here to view All Tasks</button>
                    <div>{this.state.showAllTasks ? this.showTheTasks('all') : ''}</div>
                </div>
                <div>
                    <button id="Complete" onClick={() => this.state.showCompletedtasks ? this.setState({ showCompletedtasks: false })
                        : this.setState({ showCompletedtasks: true })}>Click here to view Completed Tasks</button>
                    <div>{this.state.showCompletedtasks ? this.showTheTasks('completed') : ''}</div>
                </div>
                <div>
                    <button id="Pending" onClick={() => this.state.showPendingTasks ? this.setState({ showPendingTasks: false })
                        : this.setState({ showPendingTasks: true })}>Click here to view Pending Tasks</button>
                    <div>{this.state.showPendingTasks ? this.showTheTasks('pending') : ''}</div>
                </div>
                <button class="compose" onClick={() => this.setState({ openModal: 'open' })}><b>+</b> </button>
                {this.openModalBox()}
            </div>
        )
    }
}

export default Hello
