    import React from 'react';

    import { Modal, Button } from 'react-bootstrap';

    const FormModal = ({show, handleOnClose,todoState=[], handleSubmit, onChangeValue,btnText}) => {
        
        return (
                <React.Fragment>

            <Modal show={show} onHide={handleOnClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group row">
                        <label htmlFor="summaryVal" className="col-sm-2 col-form-label">Summary </label>
                        <div className="col-sm-10">
                            <textarea type="text"
                                onChange={(e) => onChangeValue('summary', e.target.value)}
                                value={todoState.summary}
                                className="form-control"
                                id="summaryVal"
                                rows="1"
                                min="10"
                                max="100"
                                placeholder="Please enter Summary" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <textarea type="text"
                                onChange={(e) => onChangeValue('description', e.target.value)}
                                value={todoState.description}
                                className="form-control"
                                id="description"
                                rows="5"
                                min="10"
                                max="100"
                                placeholder="Please Enter Description" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="priority" className="col-sm-2 col-form-label">Priority</label>
                        <div className="col-sm-10">
                            <select
                                onChange={(e) => onChangeValue('priority', e.target.value)}
                                value={todoState.priority}
                                className="form-control"
                                id="priority">
                                <option value="None">None</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Due Date</label>
                        <div className="col-sm-10">
                            <input type="date"
                                onChange={(e) => onChangeValue('dueDate', e.target.value)}
                                className="form-control"
                                value={todoState.dueDate}
                                placeholder="dd/mm/yy" required />
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleOnClose}>
                            Close
                    </Button>
                        <Button type="button" variant="primary" onClick={handleSubmit} >
                            {btnText}
                    </Button>
                    </Modal.Footer>
                </Modal.Body>

            </Modal>
            </React.Fragment>
            
        )
    }

    export default FormModal;
