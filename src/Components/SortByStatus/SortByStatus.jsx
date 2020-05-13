import React, {Component} from "react";
import './SortByStatus.css';
class SortByStatus extends Component {
    render() {
        return(
            <div className='container search'>
                <div className='row'>
                    <ul className="nav nav-tabs col-6">
                        <li className="nav-item">
                            <a name='All' className={`nav-link ${(this.props.tasksByStatus === 'All') ? 'active' : ''}`} onClick={this.props.handleStatus} href="#">All</a>
                        </li>
                        <li className="nav-item">
                            <a name='Completed' className={`nav-link ${(this.props.tasksByStatus === 'Completed') ? 'active' : ''}`} onClick={this.props.handleStatus} href="#">Completed</a>
                        </li>
                        <li className="nav-item">
                            <a name='Pending' className={`nav-link ${(this.props.tasksByStatus === 'Pending') ? 'active' : ''}`} onClick={this.props.handleStatus} href="#">Pending</a>
                        </li>
                    </ul>
                    {/*<div className="btn-group col-md-6" role="group" aria-label="Basic example">
                        <button
                            type="button"
                            className={`btn ${(this.props.tasksByStatus === 'All') ? 'btn-secondary': 'btn-outline-secondary'}`}
                            name="All"
                            value="All"
                            onClick={this.props.handleStatus}
                        >
                            All
                        </button>
                        <button
                            type="button"
                            className={`btn ${(this.props.tasksByStatus === 'Completed') ? 'btn-secondary': 'btn-outline-secondary'}`}
                            name="Completed"
                            value="Completed"
                            onClick={this.props.handleStatus}
                        >
                            Completed
                        </button>
                        <button
                            type="button"
                            className={`btn ${(this.props.tasksByStatus === 'Pending') ? 'btn-secondary': 'btn-outline-secondary'}`}
                            name="Pending"
                            value="Pending"
                            onClick={this.props.handleStatus}
                        >
                            Pending
                        </button>
                    </div>*/}
                    <div className="btn-group col-6" role="group" aria-label="Basic example">
                        <button
                            type="button"
                            className={`btn ${(this.props.groupByStatus === 'None') ? 'btn-secondary': 'btn-outline-secondary'}`}
                            name="None"
                            value="None"
                            onClick={this.props.handleGroupBy}
                        >
                            None
                        </button>
                        <button
                            type="button"
                            className={`btn ${(this.props.groupByStatus === 'createdDate') ? 'btn-secondary': 'btn-outline-secondary'}`}
                            name="createdDate"
                            value="createdDate"
                            onClick={this.props.handleGroupBy}
                        >
                            Created At
                        </button>
                        <button
                            type="button"
                            className={`btn ${(this.props.groupByStatus === 'dueDate') ? 'btn-secondary': 'btn-outline-secondary'}`}
                            name="dueDate"
                            value="dueDate"
                            onClick={this.props.handleGroupBy}
                        >
                            Due Date
                        </button>
                        <button
                            type="button"
                            className={`btn ${(this.props.groupByStatus === 'taskPriority') ? 'btn-secondary': 'btn-outline-secondary'}`}
                            name="taskPriority"
                            value="taskPriority"
                            onClick={this.props.handleGroupBy}
                        >
                            Priority
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SortByStatus;