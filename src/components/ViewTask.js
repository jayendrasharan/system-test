import React from 'react';
import Modal from './Modal';

function ViewTask(props) {
    return (
        <section>
            <Modal visible={props.visible} onClose={props.hide}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Task Details</h4></div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-4">
                                    <label>Summary</label>
                                </div>
                                <div className="col-8">
                                    <span>{props.summary}</span>
                                </div>
                                <div className="col-4">
                                    <label>Description</label>
                                </div>
                                <div className="col-8">
                                    <span>{props.description}</span>
                                </div>
                                <div className="col-4">
                                    <label>Priority</label>
                                </div>
                                <div className="col-8">
                                    <span>{props.priority}</span>
                                </div>
                                <div className="col-4">
                                    <label>Created At</label>
                                </div>
                                <div className="col-8">
                                    <span>{props.createdAt}</span>
                                </div>
                                <div className="col-4">
                                    <label>Due Date</label>
                                </div>
                                <div className="col-8">
                                    <span>{props.dueDate}</span>
                                </div>
                                <div className="col-4">
                                    <label>Current Status</label>
                                </div>
                                <div className="col-8">
                                    <span>{props.currentState}</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={props.hide} type="button" className="btn">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </section>
    );
    // }
};

export default ViewTask;