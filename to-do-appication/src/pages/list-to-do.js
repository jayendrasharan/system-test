import React from 'react';
import LocalStorageService from './utils/localstorageservice';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';


class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toDoList: [],
            isEditRedirectpage: false,
            editId: -1,
            insertRedirection: false,
            priority: {
                0: 'None',
                1: 'Low',
                2: 'Medium',
                3: 'High'
            },
            tabsBool: [true, false, false],
            prevSelectedColName: '',
            prevSortType: 'asc',
            selectedIndBool: [],
            selectedInd: [],
            isSelectAll: false,
            openDialog: false,
            selectedTaskInd: -1,
            searchInput: '',
            showSearchResult: false,
            searchResult: [],
            groupByElem: ''
        }
        this.localStorageService = new LocalStorageService();
        this.handleEditRedirection = this.handleEditRedirection.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleTabs = this.handleTabs.bind(this);
        this.sortLabel = this.sortLabel.bind(this);
        this.handleSelectTask = this.handleSelectTask.bind(this);
        this.handleDialog = this.handleDialog.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.groupBy = this.groupBy.bind(this);
    }

    componentDidMount() {
        let toDoList = this.localStorageService.retrieveDataItem('toDoList');
        if (toDoList === null) {
            this.setState({ toDoList: [], selectedIndBool: [] });
        }
        else {
            let selectedIndBool = new Array(toDoList.length).fill(false);
            this.setState({ toDoList: toDoList, selectedIndBool: selectedIndBool });
        }
    }

    componentWillUnmount() {
        let copyToDoList = this.state.toDoList;
        copyToDoList.sort((a, b) => (a.id > b.id ? 1 : (a.id === b.id ? 0 : -1)))
        this.localStorageService.storeDataItem('toDoList', copyToDoList);
    }

    handleEditRedirection(id) {
        this.setState({ isEditRedirectpage: true, editId: id });
    }

    handleInsertRedirection = () => {
        this.setState({ insertRedirection: true });
    }

    handleChangeStatus(index) {
        let bool = window.confirm('Are you sure want to continue changing the status?');
        if (bool) {
            let copyToDoList = this.state.toDoList;
            copyToDoList[index].currentState = !copyToDoList[index].currentState;
            this.setState({ toDoList: copyToDoList });
            copyToDoList.sort((a, b) => (a.id > b.id ? 1 : (a.id === b.id ? 0 : -1)))
            this.localStorageService.storeDataItem('toDoList', copyToDoList);
        }
    }
    handleDelete(index) {
        let bool = window.confirm('Are you sure want to delete the task?');
        if (bool) {
            let copyToDoList = this.state.toDoList;
            copyToDoList.splice(index, 1);
            this.setState({ toDoList: copyToDoList, });
            copyToDoList.sort((a, b) => (a.id > b.id ? 1 : (a.id === b.id ? 0 : -1)))
            this.localStorageService.storeDataItem('toDoList', copyToDoList);
            let selectedIndBool = new Array(copyToDoList.length).fill(false);
            this.setState({ selectedIndBool: selectedIndBool, selectedInd: [] });
        }
    }

    handleTabs(index) {
        let tabsBool = new Array(3).fill(false);
        let selectedIndBool = new Array(this.state.toDoList.length).fill(false);
        tabsBool[index - 1] = true;
        this.setState({ tabsBool: tabsBool, prevSelectedColName: '', selectedIndBool: selectedIndBool, selectedInd: [] });
    }

    sortLabel(colName) {
        let orderOfSorting = 'asc';
        if (colName === this.state.prevSelectedColName) {
            orderOfSorting = this.state.prevSortType === 'desc' ? 'asc' : 'desc';
        }
        let copyToDoList = this.state.toDoList;
        copyToDoList.sort((a, b) => (a.id > b.id ? 1 : (a.id === b.id ? 0 : -1)));
        if (orderOfSorting === 'asc') {
            copyToDoList.sort((a, b) => (a[colName] > b[colName] ? 1 : a[colName] === b[colName] ? 0 : -1));
        }
        else {
            copyToDoList.sort((a, b) => (a[colName] < b[colName] ? 1 : (a[colName] === b[colName] ? 0 : -1)));
        }
        this.setState(() => ({ prevSelectedColName: colName, toDoList: copyToDoList, prevSortType: orderOfSorting }));
    }

    handleSelectTask(ind) {
        let selectedInd = this.state.selectedInd;
        let copyToDoList = this.state.toDoList;
        let selectedIndBool = this.state.selectedIndBool;
        selectedIndBool[ind] = !selectedIndBool[ind];
        if (selectedIndBool[ind] === true) {
            selectedInd.push(ind);
        }
        else {
            selectedInd.splice(selectedInd.indexOf(ind), 1);
        }
        if (selectedInd.length === copyToDoList.length) {
            this.setState({ isSelectAll: true });
        }
        else {
            this.setState({ isSelectAll: false });
        }
        this.setState({ selectedInd: selectedInd, selectedIndBool: selectedIndBool });
    }

    handleSelectAll = () => {
        if (!this.state.isSelectAll) {
            let selectedInd = Array.from(Array(this.state.toDoList.length).keys())
            let selectedIndBool = new Array(this.state.toDoList.length).fill(true);
            this.setState({ selectedInd: selectedInd, selectedIndBool: selectedIndBool, isSelectAll: true });
        }
        else {
            let selectedIndBool = new Array(this.state.toDoList.length).fill(false);
            this.setState({ selectedInd: [], selectedIndBool: selectedIndBool, isSelectAll: false });
        }
    }

    handleDelMultiple = () => {
        let bool = window.confirm('Are you want to deleted selected tasks?');
        if (bool) {
            let selectedInd = this.state.selectedInd;
            let copyToDoList = this.state.toDoList;
            selectedInd.map(ind => {
                copyToDoList.splice(ind, 1);
            });
            let selectedIndBool = new Array(this.state.toDoList.length).fill(false);
            this.setState({ toDoList: copyToDoList, selectedInd: [], selectedIndBool: selectedIndBool, isSelectAll: false });
            copyToDoList.sort((a, b) => (a.id > b.id ? 1 : (a.id === b.id ? 0 : -1)))
            this.localStorageService.storeDataItem('toDoList', copyToDoList);
        }
    }

    handleChangeStatusMultiple = () => {
        let bool = window.confirm('Are you want to Change status of selected tasks?');
        if (bool) {
            let selectedInd = this.state.selectedInd;
            let copyToDoList = this.state.toDoList;
            selectedInd.map(ind => {
                copyToDoList[ind].currentState = !copyToDoList[ind].currentState;
            });
            let selectedIndBool = new Array(this.state.toDoList.length).fill(false);
            this.setState({ toDoList: copyToDoList, selectedInd: [], selectedIndBool: selectedIndBool, isSelectAll: false });
            copyToDoList.sort((a, b) => (a.id > b.id ? 1 : -1));
            this.localStorageService.storeDataItem('toDoList', copyToDoList);
        }
    }
    handleDialog(ind) {
        if (!this.state.openDialog) {
            this.setState({ selectedTaskInd: ind, openDialog: true });
        } else {
            this.setState({ selectedTaskInd: ind, openDialog: false });
        }
    }

    handleSearchInput(e) {
        let newInput = e.target.value;
        if (newInput !== '') {
            let searchVal = newInput.toLowerCase();
            let copyToDoList = this.state.toDoList;
            let result = [];
            copyToDoList.map(toDo => {
                let compareVal = toDo.title.toLowerCase();
                if (compareVal.includes(searchVal)) {
                    result.push(toDo);
                }
            });
            this.setState({ searchResult: result, showSearchResult: true, searchInput: e.target.value });
        }
        else {
            this.setState({ showSearchResult: false, searchResult: [], searchInput: '' });
        }
    }
    groupBy(e) {
        let copyToDoList = this.state.toDoList;
        let groupByKey = e.target.value;
        if (groupByKey !== '') {
            copyToDoList.sort((a, b) => (a[groupByKey] > b[groupByKey] ? 1 : (a[groupByKey] === b[groupByKey] ? 0 : -1)))
            let selectedIndBool = new Array(this.state.toDoList.length).fill(false);
            this.setState({ groupByElem: groupByKey, toDoList: copyToDoList, selectedInd: [], isSelectAll: false, selectedIndBool: selectedIndBool, selectedTaskInd: -1, openDialog: false });
        }
        else {
            copyToDoList.sort((a, b) => (a.id > b.id ? 1 : (a.id === b.id ? 0 : -1)))
            let selectedIndBool = new Array(this.state.toDoList.length).fill(false);
            this.setState({ groupByElem: '', toDoList: copyToDoList, selectedInd: [], isSelectAll: false, selectedIndBool: selectedIndBool, selectedTaskInd: -1, openDialog: false });
        }
    }
    render() {
        if (this.state.isEditRedirectpage) {
            return <Redirect to={'/edit/' + this.state.editId} />
        }
        if (this.state.insertRedirection) {
            return <Redirect to='/insert' />
        }
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '0 auto',
                transform: 'translate(-50%, -50%)',
                width: '40%',
                height: '80%'
            }
        };
        return <div style={{ padding: '4%' }} class="container">
            <h1 style={{ margin: '0 auto' }}>TO DO</h1>
            <div class="container">
                <div class="row" >
                    {!this.state.showSearchResult && <div class='col-sm-3'>
                        <label>Group By: </label>
                        <select onChange={this.groupBy.bind(this)} value={this.state.groupByElem}>
                            <option value=''>None</option>
                            <option value='createdAt'>Created On</option>
                            <option value='dueDate'>Due Date</option>
                            <option value='priority'>Priority</option>
                        </select>
                    </div>}
                    <div class='col-sm-3'>
                        <input type='text' placeholder='Enter search value' value={this.state.searchInput} onChange={this.handleSearchInput.bind(this)} />
                    </div>
                    <div class='col-sm-3'>
                        <button onClick={this.handleInsertRedirection}>Add New Task</button>
                    </div>
                </div>
            </div>

            {!this.state.showSearchResult ? <div>
                <ul class="nav nav-tabs" style={{ padding: '1%' }}>
                    <li class={this.state.tabsBool[0] ? 'active' : ''} style={{ padding: '1%' }} onClick={this.handleTabs.bind(this, 1)}><a data-toggle="tab" href="#all">All</a></li>
                    <li style={{ padding: '1%' }} class={this.state.tabsBool[1] ? 'active' : ''} onClick={this.handleTabs.bind(this, 2)}><a data-toggle="tab" href="#pending">Pending</a></li>
                    <li style={{ padding: '1%' }} class={this.state.tabsBool[2] ? 'active' : ''} onClick={this.handleTabs.bind(this, 3)}><a data-toggle="tab" href="#completed">Completed</a></li>
                </ul>
                {this.state.toDoList.length ?
                    <div class="tab-content">
                        {this.state.selectedInd.length > 0 && <div style={{ padding: '2%' }}>
                            <button style={{ float: 'left' }} onClick={this.handleChangeStatusMultiple}>Change Status</button>
                            <button style={{ float: 'left' }} onClick={this.handleDelMultiple}>Delete</button>
                        </div>}
                        <div id="all" class={"tab-pane " + (this.state.tabsBool[0] ? 'active' : '')}>
                            <p>All Tasks</p>
                            <table class="table table-bordered" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th><input type='checkbox' checked={this.state.isSelectAll} onChange={this.handleSelectAll} /></th>
                                        <th style={{ cursor: 'pointer' }} onClick={this.sortLabel.bind(this, 'title')}>Summary</th>
                                        <th style={{ cursor: 'pointer' }} onClick={this.sortLabel.bind(this, 'priority')}>Priority</th>
                                        <th style={{ cursor: 'pointer' }} onClick={this.sortLabel.bind(this, 'createdAt')}>Created On</th>
                                        <th style={{ cursor: 'pointer' }} onClick={this.sortLabel.bind(this, 'dueDate')}>Due Date</th>
                                        <th style={{ cursor: 'pointer' }} onClick={this.sortLabel.bind(this, 'currentState')}>Status</th>
                                        <th colSpan="2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.toDoList.map((toDo, ind) => {
                                        return <tr>
                                            <td><input type='checkbox' checked={this.state.selectedIndBool[ind]} onChange={this.handleSelectTask.bind(this, ind)} /></td>
                                            <td style={{ cursor: 'pointer' }}><a href='#' style={{ textDecoration: 'none' }} onClick={this.handleDialog.bind(this, ind)}>{toDo.title}</a></td>
                                            <td>{this.state.priority[toDo.priority]}</td>
                                            <td>{toDo.createdAt}</td>
                                            <td>{!!toDo.dueDate ? toDo.dueDate : 'NA'}</td>
                                            <td><button onClick={this.handleChangeStatus.bind(this, ind)}>{toDo.currentState ? 'Re-open' : 'Done'}</button></td>
                                            <td><button onClick={this.handleEditRedirection.bind(this, toDo.id)}>Edit</button></td>
                                            <td><button onClick={this.handleDelete.bind(this, ind)}>Delete</button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div id="pending" class={"tab-pane " + (this.state.tabsBool[1] ? 'active' : '')}>
                            <p>Pending Tasks</p>
                            <table class='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th><input type='checkbox' checked={this.state.isSelectAll} onChange={this.handleSelectAll} /></th>
                                        <th style={{ cursor: 'pointer' }} onClick={this.sortLabel.bind(this, 'title')}>Summary</th>
                                        <th style={{ cursor: 'pointer' }} onClick={this.sortLabel.bind(this, 'priority')}>Priority</th>
                                        <th style={{ cursor: 'pointer' }} onClick={this.sortLabel.bind(this, 'createdAt')}>Created On</th>
                                        <th style={{ cursor: 'pointer' }} onClick={this.sortLabel.bind(this, 'dueDate')}>Due Date</th>
                                        <th style={{ cursor: 'pointer' }} onClick={this.sortLabel.bind(this, 'currentState')}>Status</th>
                                        <th colSpan="2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.toDoList.map((toDo, ind) => {
                                        {
                                            return <>
                                                {!toDo.currentState && <tr>
                                                    <td><input type='checkbox' checked={this.state.selectedIndBool[ind]} onChange={this.handleSelectTask.bind(this, ind)} /></td>
                                                    <td style={{ cursor: 'pointer' }}><a href='#' style={{ textDecoration: 'none' }} onClick={this.handleDialog.bind(this, ind)}>{toDo.title}</a></td>
                                                    <td>{this.state.priority[toDo.priority]}</td>
                                                    <td>{toDo.createdAt}</td>
                                                    <td>{!!toDo.dueDate ? toDo.dueDate : 'NA'}</td>
                                                    <td><button onClick={this.handleChangeStatus.bind(this, ind)}>{toDo.currentState ? 'Re-open' : 'Done'}</button></td>
                                                    <td><button onClick={this.handleEditRedirection.bind(this, toDo.id)}>Edit</button></td>
                                                    <td><button onClick={this.handleDelete.bind(this, ind)}>Delete</button></td>
                                                </tr>}
                                            </>
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div id="completed" class={"tab-pane " + (this.state.tabsBool[2] ? 'active' : '')}>
                            <p>Completed Tasks</p>
                            <table class='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th><input type='checkbox' checked={this.state.isSelectAll} onChange={this.handleSelectAll} /></th>
                                        <th style={{ cursor: 'pointer' }} onClick={this.sortLabel.bind(this, 'title')}>Summary</th>
                                        <th style={{ cursor: 'pointer' }} onClick={this.sortLabel.bind(this, 'priority')}>Priority</th>
                                        <th style={{ cursor: 'pointer' }} onClick={this.sortLabel.bind(this, 'createdAt')}>Created On</th>
                                        <th style={{ cursor: 'pointer' }} onClick={this.sortLabel.bind(this, 'dueDate')}>Due Date</th>
                                        <th style={{ cursor: 'pointer' }} onClick={this.sortLabel.bind(this, 'currentState')}>Status</th>
                                        <th colSpan="2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.toDoList.map((toDo, ind) => {
                                        return <>
                                            {toDo.currentState && <tr>
                                                <td><input type='checkbox' checked={this.state.selectedIndBool[ind]} onChange={this.handleSelectTask.bind(this, ind)} /></td>
                                                <td style={{ cursor: 'pointer' }}><a href='#' style={{ textDecoration: 'none' }} onClick={this.handleDialog.bind(this, ind)}>{toDo.title}</a></td>
                                                <td>{this.state.priority[toDo.priority]}</td>
                                                <td>{toDo.createdAt}</td>
                                                <td>{!!toDo.dueDate ? toDo.dueDate : 'NA'}</td>
                                                <td><button onClick={this.handleChangeStatus.bind(this, ind)}>{toDo.currentState ? 'Re-open' : 'Done'}</button></td>
                                                <td><button onClick={this.handleEditRedirection.bind(this, toDo.id)}>Edit</button></td>
                                                <td><button onClick={this.handleDelete.bind(this, ind)}>Delete</button></td>
                                            </tr>}
                                        </>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    <div style={{ padding: '20%' }}>
                        <p style={{ margin: '0 auto' }}>No tasks</p>
                    </div>
                }
            </div>
                :
                <div>
                    {this.state.searchResult.length > 0 ? <table class="table table-bordered" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Summary</th>
                                <th>Priority</th>
                                <th>Created On</th>
                                <th>Due Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.searchResult.map((toDo, ind) => {
                                return <tr>
                                    <td>{toDo.title}</td>
                                    <td>{this.state.priority[toDo.priority]}</td>
                                    <td>{toDo.createdAt}</td>
                                    <td>{!!toDo.dueDate ? toDo.dueDate : 'NA'}</td>
                                    <td>{toDo.currentState ? 'Completed' : 'Pending'}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                        :
                        <div style={{ padding: '20%' }}>
                            <p style={{ margin: '0 auto' }}>No tasks</p>
                        </div>
                    }
                </div>
            }


            {this.state.openDialog && <Modal
                isOpen={this.state.openDialog}
                onRequestClose={this.handleDialog.bind(this, -1)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div class="container" style={{ padding: '3%' }} id='modal'>
                    <div class="row">
                        <div class="col-sm-4">
                            <strong>Summary: </strong>
                        </div>
                        <div class="col-sm-6">
                            <p>{this.state.toDoList[this.state.selectedTaskInd].title}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <strong>Description: </strong>
                        </div>
                        <div class="col-sm-6">
                            <p>{this.state.toDoList[this.state.selectedTaskInd].description}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <strong>Priority: </strong>
                        </div>
                        <div class="col-sm-6">
                            <p>{this.state.priority[this.state.toDoList[this.state.selectedTaskInd].priority]}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <strong>Status: </strong>
                        </div>
                        <div class="col-sm-6">
                            <p>{this.state.toDoList[this.state.selectedTaskInd].currentState ? 'Completed' : 'Pending'}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <strong>Created On: </strong>
                        </div>
                        <div class="col-sm-6">
                            <p>{this.state.toDoList[this.state.selectedTaskInd].createdAt}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <strong>Due Date: </strong>
                        </div>
                        <div class="col-sm-6">
                            <p>{this.state.toDoList[this.state.selectedTaskInd].dueDate !== '' ? this.state.toDoList[this.state.selectedTaskInd].dueDate : 'NA'}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6" style={{ margin: '0 auto' }}>
                            <button onClick={this.handleDialog.bind(this, -1)}>OK</button>
                        </div>
                    </div>
                </div>
            </Modal>
            }
        </div>
    }
}

export default ToDoList;