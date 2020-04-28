import React, { Component } from 'react'

let sortBy = {
    priority : true,
    dueDate:true,
    createdDate:true
}
class TaskListView extends Component {
    
    render() {
        const task_list = this.props.data;
        const list = task_list.map((item, index) => {
           let status = item.currentStatus === 'Completed'?'Re-Open':'Mark as Complete';
            if(item.priority === 'none'){
                item.priorityNumber = 4;
            }else if(item.priority === 'low'){
                item.priorityNumber = 3;
            }else if(item.priority === 'medium'){
                item.priorityNumber = 2;
            }else if(item.priority === 'high'){
                item.priorityNumber = 1;
            }
            return (
          
                <tr key={index}>
                    <td >{item.summary}</td>
                    <td>{item.priority}</td>
                    <td>{item.createdOn}</td>
                    <td>{item.dueDate }</td>
                    <td> <div>
                            {status !== 'Re-Open' && <button name='edit' onClick={this.props.onClickAction} value={item.id}>Edit</button>}
                            <button name={status} onClick={this.props.onClickAction} value={item.id}>{status}</button>
                            <button name='delete' onClick={this.props.onClickAction} value={item.id}>Delete</button>
                        </div> 
                    </td>
                </tr>
            )
        });
        return (
            <div>
                <table className="table">
                        <thead>
                            <tr>
                                <th >Summary</th>
                                <th className='sort' onClick={()=>{this.props.sorting('priorityNumber',sortBy.priority); sortBy.priority= !sortBy.priority} }>Priority<i className="down"></i></th>
                                <th className='sort' onClick={()=>{this.props.sorting('createdOn',sortBy.createdDate);sortBy.createdDate= !sortBy.createdDate}}>Created On<i className="down"></i></th>
                                <th className='sort' onClick={()=>{this.props.sorting('dueDate',sortBy.dueDate);sortBy.dueDate= !sortBy.dueDate}}>Due Date<i className="down"></i></th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>
                    </table>
            </div>
        )
    }
}

export default TaskListView
