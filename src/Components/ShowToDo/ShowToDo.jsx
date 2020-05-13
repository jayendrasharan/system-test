import React, { Component } from 'react';
import ModalComponent from '../ModalComponent/ModalComponent';
import '../SearchToDo/ShowToDo.css';
import './ShowToDo.css';
class ShowToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: { ...props.tasks, visibleTitle: null, visibleDescription: null },
            hideAdding: false,
            previewTask: null,
            showModal: false,
            buttonClicked: null,
            prevItsChanged: null,
            checkedList: []
        }
        this.handleClick = this.handleClick.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.handleKeyBoardEvent = this.handleKeyBoardEvent.bind(this);
    }
    static getDerivedStateFromProps(props, state) {
        switch (props.tasksByStatus) {
            default:
                state.tasks = props.tasks.filter(val => {
                    return (
                        val.status === 'Completed' || val.status === 'Pending'
                    );
                });
                break;
            case 'Pending':
                state.tasks = props.tasks.filter(val => {
                    return (
                        val.status === 'Pending'
                    );
                });
                break;
            case 'Completed':
                state.tasks = props.tasks.filter(val => {
                    return (
                        val.status === 'Completed'
                    );
                });
        }
        state.tasks = state.tasks.filter(val => {
            return (
                val.title.toLowerCase().includes((props.searchKeyword) ? props.searchKeyword.toLowerCase() : '') ||
                val.description.toLowerCase().includes((props.searchKeyword) ? props.searchKeyword.toLowerCase() : '')
            );
        });
        state.tasks.map((val) => {
            if (val.title.toLowerCase().includes((props.searchKeyword) ? props.searchKeyword.toLowerCase() : '')) {
                val.visibleTitle = val.title.replace(`${props.searchKeyword}`, `<span class="highlightSearch">${props.searchKeyword}</span>`)
            } else {
                val.visibleTitle = val.title;
            }
            if (val.description.toLowerCase().includes((props.searchKeyword) ? props.searchKeyword.toLowerCase() : '')) {
                val.visibleDescription = val.description.replace(`${props.searchKeyword}`, `<span class="highlightSearch">${props.searchKeyword}</span>`)
            } else {
                val.visibleDescription = val.description;
            }
            return true;
        });
        return state;
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyBoardEvent, true);
    }

    handleKeyBoardEvent = (event) => {
        if (event.keyCode === 27) {
            if (this.state.showModal) {
                this.toggleModal();
            }
        }
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    updateTask = (...vals) => {
        this.props.updateTask(vals);
        this.toggleModal();
    }

    handleClick = (event) => {
        let eventCaptured = event.target;
        if (eventCaptured.type !== 'checkbox') {
            this.setState({
                hideAdding: (eventCaptured.name === 'view'),
                buttonClicked: eventCaptured.name,
                prevItsChanged: eventCaptured.value
            });
            this.state.tasks.map((val) => {
                if (val.title === eventCaptured.value) {
                    this.setState({
                        previewTask: val
                    });
                }
                return null;
            });
            if (eventCaptured.name === 'view' || eventCaptured.name === 'edit') {
                this.toggleModal();
            } else if (eventCaptured.name.includes('delete')) {
                let confirmDelete = window.confirm(`Do you want to delete ${(eventCaptured.name === 'deleteSelected') ?
                    this.props.checkList.toString().replace(/,/g, ', ')
                    : eventCaptured.value}`);
                if (confirmDelete) {
                    this.props.handleTaskCompleted((eventCaptured.name === 'deleteSelected') ?
                        this.props.checkList : [eventCaptured.value]);
                    this.setState({ checkedlist: [] });
                }
            } else {
                this.props.handleTaskReopen(eventCaptured.value);
            }
        } else {
            if (eventCaptured.checked) {
                this.props.handleCheckList(eventCaptured.value, true);
            } else if (eventCaptured.checked === false) {
                this.props.handleCheckList(eventCaptured.value, false);
            }
        }
    }

    render() {
        let counter = 0;
        return (
            <div>
                {
                    (this.state.tasks.length > 0 && !this.state.showModal) ?
                        <div className="mt-3 handleOverflow">
                            <table className="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th id='checkboxes'>Task check</th>
                                        <th id='title' onClick={this.props.handleSort}>Title</th>
                                        <th id='taskPriority' onClick={this.props.handleSort}>Priority</th>
                                        <th id='description'>Description</th>
                                        <th id='createdDate' onClick={this.props.handleSort}>Created Date</th>
                                        <th id='dueDate' onClick={this.props.handleSort}>Due Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map((val, ind, stra) => {
                                            return (
                                                <React.Fragment>
                                                    {
                                                        (this.props.groupByStatus !== 'None' &&
                                                            counter !== val[this.props.groupByStatus]) ?
                                                            <tr>
                                                                <td> </td>
                                                                <td colSpan={5}>{val[this.props.groupByStatus]}</td>
                                                                <td className='hiddenElement'>{counter = val[this.props.groupByStatus]}</td>
                                                            </tr> :
                                                            null
                                                    }
                                                    <tr key={val.title} className={val.status}>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                name='checkbox'
                                                                value={val.title}
                                                                disabled={val.status === 'Completed'}
                                                                onClick={this.handleClick}
                                                            />
                                                        </td>
                                                        <td dangerouslySetInnerHTML={{ __html: (this.props.searchKeyword) ? val.visibleTitle : val.title }} />
                                                        <td>{val.taskPriority}</td>
                                                        <td dangerouslySetInnerHTML={{ __html: (this.props.searchKeyword) ? val.visibleDescription : val.description }} />
                                                        <td>{val.createdDate}</td>
                                                        <td>{val.dueDate}</td>
                                                        <td className="btn-group buttonGroup" role="group">
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-success"
                                                                value={val.title}
                                                                name='view'
                                                                onClick={this.handleClick}
                                                            >
                                                                View
                                                        </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-secondary ml-3"
                                                                value={val.title}
                                                                name='edit'
                                                                onClick={this.handleClick}
                                                            >
                                                                Edit
                                                        </button>
                                                            <button
                                                                type="button"
                                                                className={`btn btn-sm ${(val.status === 'Completed') ? 'btn-success' : 'btn-danger'} ml-3`}
                                                                value={val.title}
                                                                name={(val.status === 'Completed') ? 'reopen' : 'delete'}
                                                                onClick={this.handleClick}
                                                            >
                                                                {(val.status === 'Completed') ? 'reopen' : 'delete'}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                            {
                                this.props.checkList.length > 1 ?
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-danger m-3 w-50"
                                        value='deleteSelected'
                                        name='deleteSelected'
                                        onClick={this.handleClick}
                                    >
                                        Delete Selected
                                    </button> : null
                            }
                        </div> :
                        <div>
                            {this.state.showModal ?
                                <ModalComponent
                                    updateTask={this.updateTask}
                                    showModal={this.state.showModal}
                                    toggleModal={this.toggleModal}
                                    escToggle={this.escapeToggle}
                                    hideAdding={this.state.hideAdding}
                                    buttonClicked={this.state.buttonClicked}
                                    previewTask={this.state.previewTask}
                                    prevItsChanged={this.state.prevItsChanged}
                                />
                                :
                                <p className="display-4">Add tasks</p>
                            }
                        </div>
                }
            </div>
        );
    }
}
export default ShowToDo;