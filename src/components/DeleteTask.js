import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';
import { deleteTask } from '../actions/todoActions'
// Modal
class DeleteTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: this.props.visible,
            summary: this.props.summary,
            index: this.props.index
        }

    }

    onDelete = () => {
        this.props.deleteTask(this.state.index, this.props.taskId);
        this.props.hide();
        this.setState({
            visible: false,
            summary: '',
            index: ''
        })
    }

    render() {
        return (
            <section>
                <Modal visible={this.state.visible} onClose={this.props.hide}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h6 className="modal-title">Do you want to delete this task?</h6></div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-4">
                                        <label>Summary</label></div>
                                    <div className="col-8">
                                        <span>{this.state.summary}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.props.hide} type="button" className="btn">
                                    No
                                </button>
                                <button onClick={this.onDelete} type="button" className="btn">
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </section>
        );
    }
};

export default connect(null, { deleteTask })(DeleteTask);