import React from 'react';
import MaterialTable from "material-table";
import Dropdown from '../../Components/Dropdown';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
const groupByFields = ["createdAt", "dueDate", "priority"].map(item => ({value: item, label: item}));

const TodoList = props => {
    //Summary | Priority | Created On | Due Date | Actions
    const [state, setState] = React.useState({
        columns: [
            { title: 'Summary', field: 'summary' },
            { title: 'Priority', field: 'priority' },
            { title: 'Created On', field: 'createdOn', type: 'datetime' },
            {
                title: 'Due Date',
                field: 'dueDate',
                type: 'datetime'
            }
        ],
        data: [{
            summary: "test 1",
            priority: "High",
            createdOn: new Date(),
            dueDate: new Date() + 12
        }],
    });

    return (
        <React.Fragment>
            <br/>
            <Dropdown 
                isDisabled={false}
                data={groupByFields}
                selectedValue={groupByFields[0].value}
                valueColumn="value"
                displayColumn="label"
                displayLabel="Group By"
            />
            <MaterialTable
                title=""
                columns={state.columns}
                data={state.data}
                options={{
                    search: false,
                    paging: false,
                    showTitle: false,
                    toolbar: false,
                    actionsColumnIndex: Infinity
                }}
                actions={[
                    {
                        icon: 'assignment_turned_in',
                        tooltip: 'Mark as complete',
                        onClick: (e, rowData) => alert("Done")
                    },{
                      icon: 'edit',
                      tooltip: 'Edit User',
                      onClick: (event, rowData) => alert('You are editing ' + rowData.name)
                    },
                    {
                      icon: 'delete',
                      tooltip: 'Delete User',
                      onClick: (event, rowData) => confirm('You want to delete ' + rowData.name)
                    }
                  ]}
            />
        </React.Fragment>
    );
};

export default TodoList;