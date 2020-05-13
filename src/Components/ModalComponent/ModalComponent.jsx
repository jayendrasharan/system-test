import React, {Component} from 'react';
import './ModalComponent.css';
import moment from 'moment';
class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = (!props.previewTask) ? {
            "title": "",
            "desciption": "",
            "createdDate": "",
            "dueDate": "",
            "taskPriority": "",
            "errorTitle": null,
            "errorDescription": null,
            "errorPriority": null,
            "errordueDate": null
        } : props.previewTask;
        this.titleRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.createdDateRef = React.createRef();
        this.dueDateRef = React.createRef();
        this.taskPriority = React.createRef();
        this.returnError = this.returnError.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let title = this.titleRef.value;
        let description = this.descriptionRef.value;
        let createdDate = this.createdDateRef.value;
        let dueDate = this.dueDateRef.value;
        let taskPriority = this.taskPriority.value;
        let errorDueDateCheck = ((moment(dueDate) < moment().subtract(1,'day') || !moment(dueDate).isValid()));
        let errorTitleCheck = (title.length > 140 || title.length <10);
        let errorDescriptionCheck = (description.length > 500 || description.length <10);
        this.setState({
            errorTitle: errorTitleCheck,
            errorDescription: errorDescriptionCheck,
            errordueDate: errorDueDateCheck
        });
        if (!(errorTitleCheck || errorDescriptionCheck || errorDueDateCheck)) {
            if (this.props.buttonClicked === 'edit') {
                this.props.updateTask(this.props.prevItsChanged, title, description, createdDate, dueDate, taskPriority, 'Pending');
            } else {
                this.props.addTask(title, description, moment().format('YYYY-MM-DD'), dueDate, taskPriority, 'Pending');
            }
        }
    }

    returnError = (errorField) => {
        return(
            <div className="alert alert-warning mt-2" role="alert">
                Please enter valid {errorField}
            </div>
        );
    }

    render() {
        return (
            <div className={`modal ${(this.props.showModal ? 'show' : '')}`} id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content fixHeight">
                        <div className="modal-header">
                            <h4 className="modal-title">Add new task to do</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={this.props.toggleModal}>&times;</button>
                        </div>

                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title" className="textHead">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        placeholder="Enter title of your new task"
                                        onChange={this.handleChange}
                                        value={this.state.title}
                                        ref = {title => this.titleRef = title}
                                    />
                                    {this.state.errorTitle ? this.returnError("title"):null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description" className="textHead">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        placeholder="Enter description of your new task"
                                        onChange={this.handleChange}
                                        value={this.state.description}
                                        ref = {description => this.descriptionRef = description}
                                    />
                                    {this.state.errorDescription ? this.returnError("description"):null}
                                </div>
                                {
                                    this.props.buttonClicked === 'view' ?
                                        <div className="form-group">
                                            <label htmlFor="createdDate" className="textHead">Created Date</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="createdDate"
                                                name="createdDate"
                                                disabled={true}
                                                onChange={this.handleChange}
                                                value={this.state.createdDate}
                                                ref = {date => this.createdDateRef = date}
                                            />
                                        </div>: null
                                }
                                <div className="form-group">
                                    <label htmlFor="dueDate" className="textHead">Due Date:</label>
                                    <input
                                        type="date"
                                        id="dueDate"
                                        name="dueDate"
                                        className="form-control"
                                        onChange={this.handleChange}
                                        value={this.state.dueDate}
                                        ref = {date => this.dueDateRef = date}
                                    />
                                    {this.state.errordueDate ? this.returnError("due date"):null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="taskPriority" className="textHead">Example multiple select</label>
                                    <select
                                        className="form-control"
                                        id="taskPriority"
                                        name="taskPriority"
                                        onChange={this.handleChange}
                                        value={this.state.taskPriority}
                                        ref = {priorityType => this.taskPriority = priorityType}
                                    >
                                        <option>High</option>
                                        <option>Medium</option>
                                        <option>Low</option>
                                        <option>None</option>
                                    </select>
                                    {this.state.errorPriority ? this.returnError("priority"):null}
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            {
                                !this.props.hideAdding ?
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        data-dismiss="modal"
                                        onClick={this.handleSubmit}
                                    >
                                        Add
                                    </button> :
                                    ''
                            }
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={this.props.toggleModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalComponent;