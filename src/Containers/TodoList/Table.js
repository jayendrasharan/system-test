import React from 'react';
import MaterialTable from "material-table";


const Table = props => {
    const { columns, data} = props;
    return (
        <div key={"react-material-table-" + Math.floor(Math.random() * 100)}>
        <MaterialTable
                title=""
                columns={columns}
                data={data}
                options={{
                    search: false,
                    paging: false,
                    showTitle: false,
                    toolbar: false,
                    actionsColumnIndex: Infinity,
                    grouping: true
                }}
                actions={[
                    {
                        icon: 'assignment_turned_in',
                        tooltip: 'Mark as complete',
                        onClick: (e, rowData) => alert("Done")
                    }, {
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
            </div>
    )
};

export default Table;