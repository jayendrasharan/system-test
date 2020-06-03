import React, {createRef, useContext, useEffect, useState} from "react";
import MaterialTable from "material-table";
import tableIcons, {tableOptions} from "../../components/table_attributes";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {TodoDataContext} from "../../lib/contexts/todo_action_context";
import TodoActions from "../../actions/todo_actions";
import TickIcon from "@material-ui/icons/DoneOutline";
import UnDoIcon from "@material-ui/icons/History";
import {ToastMessageContext} from "../../lib/contexts/message_context";
import config from "../../lib/config";

function TaskList(props) {

    const TodoProvider = useContext(TodoDataContext);
    const message = useContext(ToastMessageContext);
    const tableRef = createRef();
    const {todoState, dispatch} = TodoProvider;
    const {loading, tasks,searchText,groupBy,sortDirection} = todoState;
    const {status} = props;
    const [taskList, setTaskList] = useState([]);

    //API call be based on the status not reliant on single array with all states. For time being handled all in single array and used filter
    useEffect(() => {
        if (status === 'all_tasks') {
            setTaskList(tasks);
        } else if (status === 'pending') {
            const pendingTaskList = tasks.filter(task => task.currentState === false);
            setTaskList(pendingTaskList);
        } else if (status === 'completed') {
            const completedTaskList = tasks.filter(task => task.currentState === true);
            setTaskList(completedTaskList);
        }
    }, [tasks, status]);

    const columns = [
        {
            title: '',
            field: 'id',
            width: '2%',
            render: rowData => <span>&nbsp;</span>
        },
        {
            title: 'Summary',
            field: 'title',
            width: '40%',
            sorting: config.sorting.indexOf('title') > -1,
            searchable: config.search.indexOf('title') > -1,
            grouping: config.groupBy.indexOf('title') > -1,
            headerStyle: {
                textAlign: 'left'
            },
            cellStyle: {
                textAlign: 'left'
            },
        },
        {
            title: 'Priority',
            field: 'priority',
            sorting: config.sorting.indexOf('priority') > -1,
            searchable: config.search.indexOf('priority') > -1,
            grouping: config.groupBy.indexOf('priority') > -1,
        },
        {
            title: 'Created On',
            field: 'createdAt',
            sorting: config.sorting.indexOf('createdAt') > -1,
            searchable: config.search.indexOf('createdAt') > -1,
            grouping: config.groupBy.indexOf('createdAt') > -1,
        },
        {
            title: 'Due Date',
            field: 'dueDate',
            sorting: config.sorting.indexOf('dueDate') > -1,
            searchable: config.search.indexOf('dueDate') > -1,
            grouping: config.groupBy.indexOf('dueDate') > -1,
        },

    ];

    return (
        <div>
            <MaterialTable
                style={{boxShadow: 'unset'}}
                icons={tableIcons}
                tableRef={tableRef}
                columns={columns}
                data={taskList}
                isLoading={loading}
                options={{
                    ...tableOptions,
                    rowStyle: rowData => ({
                        textDecoration: (rowData.currentState) ? 'line-through' : 'unset',
                        opacity: (rowData.currentState) ? '0.5' : '1'
                    }),
                    grouping:true,
                    // searchText:searchText // persisted search text across tab
                }}
                localization={{
                    toolbar: {
                        searchPlaceholder: 'Search Task'
                    },
                    body: {
                        emptyDataSourceMessage: 'No Tasks Found',
                        filterRow: {
                            filterTooltip: 'Filter'
                        },
                    },
                    header: {
                        actions: "Actions"
                    }
                }}
                onRowClick={(event, rowData)=>{
                    TodoActions.setCurrentSelection(dispatch, rowData);
                    TodoActions.setAction(dispatch, 'view')
                }}
                onSearchChange={searchText => TodoActions.setSearchText(dispatch,searchText)}
                actions={[
                    {
                        icon: () => <EditIcon fontSize="small"/>,
                        tooltip: 'Edit',
                        onClick: (event, rowData) => {
                            TodoActions.setCurrentSelection(dispatch, rowData);
                            TodoActions.setAction(dispatch, 'update')
                        }
                    },
                    {
                        icon: () => <DeleteIcon fontSize="small"/>,
                        tooltip: 'Delete',
                        onClick: (event, rowData) => {
                            TodoActions.setCurrentSelection(dispatch, rowData);
                            TodoActions.setAction(dispatch, 'delete')
                        }
                    },
                    rowData => (rowData.currentState === false ? {
                        icon: () => <TickIcon fontSize="small"/>,
                        tooltip: 'Mark as Complete',
                        onClick: (event, rowData) => {
                            TodoActions.changeTaskStatus(dispatch, message, rowData, true)
                        }
                    } : {
                        icon: () => <UnDoIcon fontSize="small"/>,
                        tooltip: 'Reopen Task',
                        onClick: (event, rowData) => {
                            TodoActions.changeTaskStatus(dispatch, message, rowData, false)
                        }
                    })
                ]}
            />
        </div>
    )
}

export default TaskList;