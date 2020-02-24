import React, { Component } from 'react';
import { connect } from 'react-redux'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Modal from '../ui/Modal/Modal';
import Buttons from '../ui/Button/Button'
import { togglePopup, addTask, updateTask } from '../Store/actions/actions'
import './style.css'

class PopupModal extends Component {


    state = {
        currID: '',
        task: {
            id: '',
            status: false,
            summary: '',
            description: '',
            createdAt: '',
            dueDate: '',
            priority: 'none'
        },
        validation: {
            summary: {
                minLength: 10,
                maxLength: 140,
                required: true,
                touched: false,
                isValid: false,
                validationMessage: 'Min lenght: 10 | Max length: 140'
            },
            description: {
                minLength: 10,
                maxLength: 500,
                required: true,
                touched: false,
                isValid: false,
                validationMessage: 'Min lenght: 10 | Max length: 500'
            },
            priority: {
                isValid: true,
            }
        },
        formIsValid: false
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }


    handleChange(event) {
        const updatedTask = {
            ...this.state.task
        }

        const eventIdentifier = event.target.id;

        updatedTask[eventIdentifier] = event.target.value

        const updatedErrors = {
            ...this.state.validation
        }

        updatedErrors[eventIdentifier].isValid = this.checkValidity(event.target.value, updatedErrors[eventIdentifier])
        updatedErrors[eventIdentifier].touched = true

        let formIsValid = true;
        for (let eventIdentifier in updatedErrors) {
            formIsValid = updatedErrors[eventIdentifier].isValid && formIsValid;
        }


        this.setState({ task: updatedTask, formIsValid: formIsValid })
    }

    setDueDate(date) {
        const updatedTask = {
            ...this.state.task,
        }

        let updDate = new Date(date);
        updatedTask.dueDate = updDate.getTime();
        this.setState({ task: updatedTask })
    }


    clearState() {
        const resetedTask = {
            status: false,
            summary: '',
            description: '',
            createdAt: '',
            dueDate: '',
            priority: 'none'
        }

        const resetedValidation = {
            summary: {
                minLength: 10,
                maxLength: 140,
                required: true,
                touched: false,
                isValid: false,
                validationMessage: 'Min lenght: 10 | Max length: 140'
            },
            description: {
                minLength: 10,
                maxLength: 500,
                required: true,
                touched: false,
                isValid: false,
                validationMessage: 'Min lenght: 10 | Max length: 500'
            },
            priority: {
                isValid: true,
            }
        }

        this.setState({ task: resetedTask, validation: resetedValidation, formIsValid: false, currID: '' })
    }

    handleCancel() {
        this.props.togglePopup({ type: this.props.contentType })
        this.clearState()
    }

    handleSubmit() {
        let reqObj = { ...this.state.task };

        if (this.props.contentType === 'new') {
            const date = new Date();
            reqObj.createdAt = date.toLocaleDateString();
            this.clearState();
            this.props.addTask(reqObj)
            this.props.togglePopup({ type: 'new' })
        } else {
            this.clearState();
            this.props.updateTask(reqObj)
            this.props.togglePopup({ type: 'new' })
        }

    }

    static getDerivedStateFromProps(props, state) {
        if (props.contentFromProps.id !== state.currID && props.contentType === 'edit') {
            return {
                task: props.contentFromProps,
                currID: props.contentFromProps.id,
                formIsValid: true
            };
        } else if (props.contentFromProps.id !== state.currID) {
            return {
                task: props.contentFromProps,
                currID: props.contentFromProps.id,
                formIsValid: false
            };
        }
        return null;
    }


    render() {
        let modalContent = '';
        let valObjRef = this.state.validation;
        const allTasks = this.props.contentFromProps;

        if (this.props.contentType === 'view') {
            const ddate = new Date(allTasks.dueDate);
            modalContent = (
                <React.Fragment>
                    <h3>View a task</h3>
                    <p><strong>Summary: </strong>{allTasks.summary}</p>
                    <p><strong>Description: </strong>{allTasks.description}</p>
                    <p><strong>Status: </strong>{allTasks.status ? 'Completed Task' : 'Incomplete Task'}</p>
                    <p><strong>Created At: </strong>{allTasks.createdAt}</p>
                    <p><strong>Due Date: </strong>{ddate.toLocaleDateString()}</p>
                    <p><strong>Priority: </strong>{allTasks.priority}</p>
                </React.Fragment>
            )
        } else {
            modalContent = (
                <React.Fragment>
                    {this.props.contentType === 'new' ? (<h3>Add a task</h3>) : (<h3>Edit a task</h3>)}
                    <form onSubmit={(event) => event.preventDefault()}>
                        <div className="form-group">
                            <label>Summary:</label>
                            <input
                                className={(!valObjRef.summary.isValid && valObjRef.summary.touched) ? 'invalidInput' : ''}
                                type="text"
                                id="summary"
                                value={this.state.task.summary}
                                onChange={(event) => this.handleChange(event)}
                            />
                            {(!valObjRef.summary.isValid && valObjRef.summary.touched) && (<span className="error-msg">{valObjRef.summary.validationMessage}</span>)}
                        </div>

                        <div className="form-group">
                            <label>Description:</label>
                            <textarea
                                className={(!valObjRef.description.isValid && valObjRef.description.touched) ? 'invalidInput' : ''}
                                id="description"
                                value={this.state.task.description}
                                onChange={(event) => this.handleChange(event)} />
                            {(!valObjRef.description.isValid && valObjRef.description.touched) && (<span className="error-msg">{valObjRef.description.validationMessage}</span>)}
                        </div>

                        <div className="form-group">
                            <label>Priority:</label>
                            <select id="priority" onChange={(event) => this.handleChange(event)}>
                                <option value="none" selected={this.state.task.priority === 'none' ? true : false}>None</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Due Date:</label>
                            <DatePicker
                                id="dueDate"
                                //selected={this.state.task.dueDate}
                                onChange={date => this.setDueDate(date)}
                            />
                        </div>

                        <div className="form-group text-center">
                            <Buttons btnType="general" clicked={() => this.handleCancel()} >Cancel</Buttons>
                            <Buttons disabled={!this.state.formIsValid} btnType="success" clicked={() => this.handleSubmit()} >{this.props.contentType === 'new' ? 'ADD' : 'Update'}</Buttons>
                        </div>
                    </form>
                </React.Fragment>
            )
        }


        return (
            <Modal show={this.props.modalIsOpen} modalClosed={() => this.props.togglePopup({ type: this.props.contentType })}>
                {modalContent}
            </Modal>
        )
    }

}

const mapStateToProps = state => ({
    modalIsOpen: state.popup.modalIsOpen,
    contentType: state.popup.contentType,
    contentFromProps: state.popup.contentFromProps,
    initialFormState: state.popup.initialFormState,
    fetchTasks: state.crud.allTasks,
})

const mapDispatchToProps = (dispatch) => ({
    togglePopup: (payload) => dispatch(togglePopup(payload)),
    addTask: (task) => dispatch(addTask(task)),
    updateTask: task => dispatch(updateTask(task))
})

export default connect(mapStateToProps, mapDispatchToProps)(PopupModal)