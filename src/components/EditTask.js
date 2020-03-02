import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';
import { editTask, errorSum, errorDes } from '../actions/todoActions'
// Modal
class EditTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: this.props.visible,
            summary: this.props.summary,
            description: this.props.description,
            priority: this.props.priority,
            dueDate: this.props.dueDate,
            createdAt: this.props.createdAt,
            index: this.props.index
        }

    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            this.state.summary.length < 10 ? this.props.errorSum("Minimum 10 chars required") :
                this.state.summary.length > 140 ? this.props.errorSum("Max length(140 chars) exceeded") : this.props.errorSum("")
            this.state.description.length < 10 ? this.props.errorDes("Minimum 10 chars required") :
                this.state.description.length > 500 ? this.props.errorDes("Max length(500 chars) exceeded. ") : this.props.errorDes("");
        });
    }

    onSubmit = () => {
        if (!this.props.errorMsgSum && !this.props.errorMsgDes) {
            let conf = window.confirm("Do you want to save this task?")
            if (conf) {
                const data = {
                    // currentState: this.state.isCompleted,
                    summary: this.state.summary,
                    description: this.state.description,
                    priority: this.state.priority,
                    dueDate: this.state.dueDate,
                    // createdAt: this.state.createdAt,
                    index: this.state.index,
                    id: this.props.taskId
                };
                this.props.editTask(data);
                this.props.hide();
                this.setState({
                    visible: false,
                    summary: '',
                    description: '',
                    priority: '',
                    dueDate: '',
                    index: ''
                })
            } else {
                this.hideModal()
                this.setState({
                    visible: false,
                    summary: '',
                    description: '',
                    priority: '',
                    dueDate: ''
                })
            }
        }
    }

    render() {
        return (
            <section>
                <Modal visible={this.state.visible} onClose={this.props.hide}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Edit Task</h4></div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-4">
                                        <label>Summary</label></div>
                                    <div className="col-8">
                                        <input type="text" name="summary" onChange={this.handleChange} value={this.state.summary} />
                                    </div>
                                    <div className="col-4">
                                        <label>Description</label></div>
                                    <div className="col-8">
                                        <textarea type="text" name="description" rows='3' cols="23" onChange={this.handleChange} value={this.state.description} />
                                    </div>
                                    <div className="col-4">
                                        <label>Priority</label>
                                    </div>
                                    <div className="col-8">
                                        <select name="priority" onChange={this.handleChange} value={this.state.priority}>
                                            <option>None</option>
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                        </select></div>
                                    <div className="col-4">
                                        <label>Due Date</label>
                                    </div>
                                    <div className="col-8">
                                        <input type="date" name="dueDate" onChange={this.handleChange} value={this.state.dueDate}></input>
                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button onClick={this.props.hide} type="button" className="btn">
                                    Cancel
                                </button>
                                <button onClick={this.onSubmit} type="button" className="btn">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </section>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        errorMsgSum: state.todoData.errorSum,
        errorMsgDes: state.todoData.errorDes,
    }
}

export default connect(mapStateToProps, { editTask, errorSum, errorDes })(EditTask);