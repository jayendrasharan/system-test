import React from 'react';
import Dropdown from '../../Components/Dropdown';
import { connect } from 'react-redux';
import Table from './Table';
import * as todoActionreators from '../../store/actionCreators/todoActions';
import { groupByFields, gridColumns } from '../../config';
import { Button, Tooltip } from '@material-ui/core';

const TodoList = props => {
    const [columns, setColumns] = React.useState(gridColumns);
    const [currentGrouping, setCurrentGrouping] = React.useState('none');
    const tabView = props.tabView;
    const [tableComp, setTableComp] = React.useState(null);
    const [selectedRows, setSelectedRows] = React.useState([]);

    const handleDeleteTodo = (event, rowData) => {
        props.toggleAlertBox({
            title: rowData.summary,
            alertMessage: "Do you want to delete this task?",
            yesAction: () => {
                props.deleteTodo(rowData.id);
                props.toggleAlertBox();
            },
            noAction: () => {
                props.toggleAlertBox();
            }
        });
    }

    const handleRowClick = (e, rowData) => {
        props.openTodoForm(rowData.id, false);
    };

    const handleEditTodo = (e, rowData) => {
        props.openTodoForm(rowData.id, true);
    }

    const toggleCompleteTask = (e, rowData) => {
        props.toggleTaskStatus(rowData.id);
    }

    const onSelectionChange = (rows) => {
        setSelectedRows(rows.map(row => row.id));
    }

    React.useEffect(() => {
        let viewData = null;
        if(tabView === "all"){
            viewData = props.todoData;
            
        }else if(tabView === "completed"){
            viewData = props.todoData.filter(record => record.status === "completed");
            
        }else if(tabView === "pending"){
            viewData = props.todoData.filter(record => record.status === "pending"); 
        }
        // console.log("data ::", viewData);
        setTableComp(
            <Table 
                columns={columns}
                data={viewData}
                handleDeleteTodo={handleDeleteTodo}
                handleRowClick={handleRowClick}
                handleEditTodo={handleEditTodo}
                toggleCompleteTask={toggleCompleteTask}
                onSelectionChange={onSelectionChange}
            />
        );
    }, [props.todoData.length, props.lastEditTimestamp, columns])

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
            
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 20px"
            }}>
            
            <div>
            <Dropdown
                isDisabled={false}
                data={groupByFields}
                selectedValue={currentGrouping}
                valueColumn="value"
                displayColumn="label"
                displayLabel="Group By"
                handleChange={handleGrouping}
            />
            </div>

            <div>
                <Tooltip title="Mark selected tasks pending">
                    <span>
                    <Button disabled={selectedRows.length === 0 ? true : false} onClick={() => {
                        props.markListAsPending(selectedRows);
                    }}>
                        Pending
                    </Button>
                    </span>
                </Tooltip>

                <Tooltip title="Mark selected tasks Done">
                    <span>
                        <Button disabled={selectedRows.length === 0 ? true : false} onClick={() => {
                            props.markListAsDone(selectedRows);
                        }}>
                            Done
                        </Button>
                    </span>
                </Tooltip>

                <Tooltip title="Delete Selected">
                    <span>
                    <Button disabled={selectedRows.length === 0 ? true : false} onClick={() => {
                        props.toggleAlertBox({
                            title: `Delete ${selectedRows.length} record(s)`,
                            alertMessage: "Do you want to delete this task?",
                            yesAction: () => {
                                selectedRows.forEach(row => props.deleteTodo(row))
                                props.toggleAlertBox();
                            },
                            noAction: () => {
                                props.toggleAlertBox();
                            }
                        });
                    }}>
                        Delete
                    </Button>
                    </span>
                </Tooltip>
            </div>
            </div>

            {tableComp}
        </React.Fragment>
    );
};


const mapStatetoProps = state => {
    return {
        todoData: state.todos.filteredData,
        lastEditTimestamp: state.todos.lastEditTimestamp,
        isAlertBoxOpen: state.ui.isAlertOpen
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteTodo: (todoId) => dispatch(todoActionreators.deleteTodo(todoId)),
        toggleAlertBox: (info) => dispatch(todoActionreators.toggleAlertBox(info)),
        openTodoForm: (id, isEditable) => dispatch(todoActionreators.openTodoForm(id, isEditable)),
        toggleTaskStatus: (id) => dispatch(todoActionreators.toggleTaskStatus(id)),
        markListAsDone: (ids) => dispatch(todoActionreators.markListAsDone(ids)),
        markListAsPending: ids => dispatch(todoActionreators.markListAsPending(ids))
    }
}
const options = {
    areOwnPropsEqual: () => false
}

export default connect(mapStatetoProps, mapDispatchToProps, undefined, options)(TodoList);