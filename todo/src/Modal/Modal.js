import React from 'react';
import moment from 'moment';
import set from 'lodash/set';
import './Modal.css'
// import PropTypes from 'prop-types'

class Modal extends React.Component {
    constructor() {
        super();
        this.state = {
            titleError: true,
            descriptionError: true,
            currentStateError: false,
            priorityError: true,
            dueDateError: false,
            showErrorMessage: false,
            modalData: {
                title: '',
                description: '',
                currentState: 'Open',
                priority: '',
                dueDate: ''
            }
        };
    }

    saveChanges = () => {
        if (this.state.descriptionError || this.state.currentStateError || this.state.priorityError || this.state.titleError ) {
            this.setState({
                showErrorMessage: true
            })
        } else {
            this.setState({
                showErrorMessage: false
            });
            console.log('done');
            this.props.onEvent('saveModal', this.state.modalData);
        }
    }

    handleTitle(e) {
        let value = e.target.value;
        if (value !== '' && value.length > 10 && value.length < 140) {
            const dataObj = this.state.modalData;
            set(dataObj, 'title', value);
            this.setState({
                modalData: dataObj, titleError: false
            });
        } else {
            this.setState({
                titleError: true
            });
        }
    }
    handleCurrentState(e) {
        let value = e.target.value;
        const dataObj = this.state.modalData;
        set(dataObj, 'currentState', value);
        this.setState({
            modalData: dataObj, currentStateError: false
        });

    }
    handleDueDate(e) {
        let value = e.target.value;
        const dataObj = this.state.modalData;
        set(dataObj, 'dueDate', value);
        this.setState({
            modalData: dataObj, dueDateError: false
        });
    }

    handlePriority(e) {
        let value = e.target.value;
        if(value !== 'None') {
            const dataObj = this.state.modalData;
            set(dataObj, 'priority', value);
            this.setState({
                priority: value, priorityError: false
            });
        } else {
            this.setState({
                priorityError: true
            });
        }

    }

    handleDescription(e) {
        let value = e.target.value;
        if (value !== '' && value.length > 10 && value.length < 500) {
            const dataObj = this.state.modalData;
            set(dataObj, 'description', value);
            this.setState({
                modalData: dataObj, descriptionError: false
            });
        } else {
            this.setState({
                descriptionError: true
            });
        }
    }

    render() {
        return (
            <div id="openModal" class="modalDialog">
                <div>
                <button title="Close" class="close" onClick={()=> this.props.onEvent('exitModal', '')}>X</button>
                    <h2><b>Enter you Task Details</b></h2>
                    <div class="error"> 
                        {this.state.showErrorMessage ? 'Please fill all the details' : ''}
                    </div>
                    <div class="CurrentState">
                        <label >Current State: </label>
                        <select id="modalState" onChange={e => this.handleCurrentState(e)}>
                            <option value="Open">Open</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div class="Title">

                        <label>Title: </label>
                        <div class="Answer1">
                        <input type="text" onChange={e => this.handleTitle(e)}></input>
                        </div>
                    </div>
                    <div class="Description">
                        <label>Description: </label>
                        <div class="Answer2">
                            <textarea type="text" onChange={e => this.handleDescription(e)}></textarea>
                        </div>
                    </div>
                    <div class="CreatedAt">
                        <label>Created At: {moment().format('DD/MM/YY HH:MM')}</label>
                    </div>
                    <div class="DueDate">
                        <label>Due Date: </label>
                        <div class="Answer4">
                            <input type="date" id="dueDate" name="dueDate" onChange={(e)=>this.handleDueDate(e)}></input>
                        </div>
                    </div>
                    <div class="Priority">
                        <label>Priority: </label>
                        <div class="Answer5">
                            <select id="priority" onClick={date=>this.handlePriority(date)}>
                                <option value="None">None</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                    <div class="Buttons">
                        <button onClick={this.saveChanges}>Save</button>
                        <button onClick={(e, value) => this.props.onEvent('exitModal', '')}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal

