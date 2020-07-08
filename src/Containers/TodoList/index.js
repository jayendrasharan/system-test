import React from 'react';

import Dropdown from '../../Components/Dropdown';
import { connect } from 'react-redux';
// import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import Table from './Table';
const groupByFields = ['none', "createdAt", "dueDate", "priority"].map(item => ({ value: item, label: item }));

const TodoList = props => {
    //Summary | Priority | Created On | Due Date | Actions
    const [columns, setColumns] = React.useState([
        { title: 'Summary', field: 'summary' },
        { title: 'Priority', field: 'priority' },
        { title: 'Created On', field: 'createdOn', type: 'datetime' },
        {
            title: 'Due Date',
            field: 'dueDate',
            type: 'datetime'
        }
    ]);
    const [currentGrouping, setCurrentGrouping] = React.useState('none');
    const tabView = props.tabView;
    const [tableComp, setTableComp] = React.useState(null);

    React.useEffect(() => {
        let viewData = null;
        if(tabView === "all"){
            viewData = props.todoData;
            
        }else if(tabView === "completed"){
            viewData = props.todoData.filter(record => record.status === "completed");
            
        }else if(tabView === "pending"){
            viewData = props.todoData.filter(record => record.status === "pending"); 
        }
        console.log("data ::", viewData);
        setTableComp(<Table 
            columns={columns}
            data={viewData}
        />);
    }, [tabView, props.todoData.length, columns])

    const handleGrouping = (e) => {
        const value = e.target.value;
        setCurrentGrouping(value);
        const updatedColumns = columns.map(col => {
            if (col.field === value) {
                col.tableData.groupOrder = 0;
            } else {
                delete col.tableData.groupOrder;
            }
            return col;
        });
        setColumns(updatedColumns);
    }

    return (
        <React.Fragment>
            <br />
            <Dropdown
                isDisabled={false}
                data={groupByFields}
                selectedValue={currentGrouping}
                valueColumn="value"
                displayColumn="label"
                displayLabel="Group By"
                handleChange={handleGrouping}
            />
            {tableComp}
        </React.Fragment>
    );
};


const mapStatetoProps = state => {
    return {
        todoData: state.todos.data
    }
}
const options = {
    areOwnPropsEqual: () => false
}

export default connect(mapStatetoProps, undefined, undefined, options)(TodoList);