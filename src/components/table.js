import React from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux'
import { togglePopup } from '../Store/actions/actions'
import ActionBox from './actionBox'



const TasksTable = (props) => {

    const allTasks = props.fetchTasks;


    //onClick handler for getting task details
    const taskDetails = (id) => {
        const reqTask = allTasks.find(element => element.id === id);
        const reqObj = {
            type: 'view',
            data: reqTask
        }
        props.togglePopup(reqObj)
    }

    //filter tasks based on view type
    const RequiredTasks = () => {
        const ReqObj = allTasks.filter(item => {
            if (props.currWindow === 'all') {
                return true
            } else if (props.currWindow === 'completed' && item.currentState === true) {
                return true;
            } else if (props.currWindow === 'incomplete' && item.currentState === false) {
                return true;
            } else {
                return false;
            }
        });

        return ReqObj;
    }

    //generate table rows
    const tableData = (item, index) => {
        let dateConv = (new Date(item.dueDate)).toLocaleDateString();

        return (
            <tr key={item.id} style={item.currentState ? ({ 'background': '#6fda44de' }) : ({ 'background': '#ffffff' })} >
                <th scope="row">{index + 1}</th>
                <td onClick={(event) => taskDetails(item.id)} style={{ cursor: 'pointer' }}>{item.summary}</td>
                <td>{item.priority}</td>
                <td>{item.createdAt}</td>
                <td>{dateConv}</td>
                <td><ActionBox isCompleted={item.currentState} itemId={item.id} taskObject={item} /></td>
            </tr>
        )

    }


    return (
        <Table responsive size="lg" hover bordered style={{ 'width': '100%' }}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Summary</th>
                    <th>Priority</th>
                    <th>Created On</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {RequiredTasks().map((item, index) => tableData(item, index))}
            </tbody>
        </Table>
    );
}

const mapStateToProps = state => ({
    fetchTasks: state.crud.allTasks,
    currWindow: state.crud.currWindow
})

const mapDispatchToProps = dispatch => ({
    togglePopup: (contentType) => dispatch(togglePopup(contentType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksTable);