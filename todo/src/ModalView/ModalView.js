import React from 'react';
import moment from 'moment';
// import set from 'lodash/set';
import './ModalView.css'
// import PropTypes from 'prop-types'

class ModalView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalData: {
                title: this.props.task.title? this.props.task.title: '',
                description: this.props.task.description? this.props.task.description: '',
                currentState: this.props.task.currentState? this.props.task.currentState : '',
                priority: this.props.task.priority? this.props.task.priority: '',
                dueDate: this.props.task.dueDate? this.props.task.dueDate: ''
            }
        };
    }

    render() {
        console.log('modal edit props', this.props.task)
        return (
            <div id="openModal" class="modalDialog">
                <div>
                    <button title="Close" class="close" onClick={()=> this.props.onEvent('exitModal', '')}>X</button>
                    <h2><b>Here are your Task Details</b></h2>
                    <div class="CurrentState">
                        <label >Current State: </label>
                        <input id="modalState"  value={this.state.modalData.currentState}>
                        </input>
                    </div>
                    <div class="Title">
                        <label>Title: </label>
                        <div class="Answer1">
                        <input type="text" value={this.state.modalData.title} disabled={true}></input>
                        </div>
                    </div>
                    <div class="Description">
                        <label>Description: </label>
                        <div class="Answer2">
                            <textarea type="text" value={this.state.modalData.description}></textarea>
                        </div>
                    </div>
                    <div class="CreatedAt">
                        <label>Created At: {moment().format('DD/MM/YY HH:MM')}</label>
                    </div>
                    <div class="DueDate">
                        <label>Due Date: </label>
                        <div class="Answer4">
                            <input type="date" id="dueDate" name="dueDate" value={this.state.modalData.dueDate}></input>
                        </div>
                    </div>
                    <div class="Priority">
                        <label>Priority: </label>
                        <div class="Answer5">
                            <input id="priority" value={this.state.modalData.priority}>
                            </input>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalView

