import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function TaskAdd(props) {
    return (
        <React.Fragment>
            <Modal show={props.show} onHide={props.handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Tags</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Summary </label>
                            <div class="col-sm-10">
                                <textarea type="text"
                                    onChange={(e) => props.update_data('summary', e.target.value)}
                                    value={props.data.summary}
                                    class="form-control"
                                    id="staticEmail"
                                    rows="1"
                                    min="10"
                                    max="100"
                                    placeholder="" required />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Description</label>
                            <div class="col-sm-10">
                                <textarea type="text"
                                    onChange={(e) => props.update_data('description', e.target.value)}
                                    value={props.data.description}
                                    class="form-control"
                                    id="staticEmail"
                                    rows="5"
                                    min="10"
                                    max="100"
                                    placeholder="" required />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Priority</label>
                            <div class="col-sm-10">
                                <select
                                    onChange={(e) => props.update_data('priority', e.target.value)}
                                    value={props.data.priority}
                                    className="form-control"
                                    id="priority">
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Due Date</label>
                            <div class="col-sm-10">
                                <input type="date"
                                    onChange={(e) => props.update_data('due_date', e.target.value)}
                                    class="form-control"
                                    value={props.data.due_date}
                                    placeholder="dd/mm/yy" required />
                            </div>
                        </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                    </Button>
                        <Button type="button" variant="primary" onClick={props.onSubmit} >
                            Save
                    </Button>
                    </Modal.Footer>
                </Modal.Body>

            </Modal>
        </React.Fragment>
    );
}

export default TaskAdd