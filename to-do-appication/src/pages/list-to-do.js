import React from 'react';
import LocalStorageService from './utils/localstorageservice';

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toDoList: []
        }
        this.localStorageService = new LocalStorageService();
    }

    componentDidMount() {
        let toDoList = this.localStorageService.retrieveDataItem('toDoList');
        if (toDoList === null) {
            this.setState({ toDoList: [] });
        }
        else {
            this.setState({ toDoList: toDoList });
        }
    }

    render() {
        return <div style={{ padding: '4%' }}>
            <table class='table table-bordered'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Priority</th>
                        <th>Created On</th>
                        <th>Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.toDoList.map(toDo => {
                        return <tr>
                            <td>{toDo.title}</td>
                            <td>{toDo.priority}</td>
                            <td>{toDo.createdAt}</td>
                            <td>{toDo.dueDate}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    }
}

export default ToDoList;