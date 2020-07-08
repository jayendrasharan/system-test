import React from 'react';
import MaterialTable, { MTableBodyRow } from "material-table";


const Table = props => {
    const { columns, data, handleDeleteTodo, handleRowClick,
        handleEditTodo,
        toggleCompleteTask,
        onSelectionChange
    } = props;
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
                    grouping: true,
                    selection: true,
                    rowStyle: (row, index) => {
                        if(row.status === "completed"){
                            return {
                                "textDecoration" : "line-through"
                            }
                        }else{
                            return {
                                "textDecoration" : "none"
                            }
                        }
                    }
                }}
                onRowClick={handleRowClick}
                components={{
                    Groupbar: props => {
                        return null
                    },
                    Row: props => {
                        if(props.data.status === "pending"){
                            props.actions[0].tooltip = "Mark as complete";
                            props.actions[0].icon = "check_circle_outline";
                        }else {
                            props.actions[0].tooltip = "Re Open";
                            props.actions[0].icon = "check_circle";
                        }
                        return <MTableBodyRow {...props} />
                    }
                }}
                actions={[
                    {
                        icon: 'assignment_turned_in',
                        tooltip: 'Mark as complete',
                        onClick: toggleCompleteTask,
                        position: "row"
                    }, {
                        icon: 'edit',
                        tooltip: 'Edit User',
                        onClick: handleEditTodo,
                        position: "row"
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: handleDeleteTodo,
                        position: "row"
                    }
                ]}
                onSelectionChange={onSelectionChange}
            />
            </div>
    )
};

export default Table;