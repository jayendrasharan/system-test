import * as React from 'react';
import { Task, Priority } from '../../models';
import { InputGroup, ButtonGroup, Dialog, Classes, Checkbox, Toaster } from '@blueprintjs/core';
import { Tooltip, Button, Intent } from '@blueprintjs/core';
import { StoreUtils } from '../../store';
import { Sf } from '../../services';

export interface TaskGridProps {
    rows: Task[];
    onEdit?: (value: Task, index: number) => void;
    onView?: (value: Task) => void;
    statusFilter?: boolean;
}


export interface TaskGridState {
    rows: Task[];
    searchText?: string;
    selectedIndex?: number;
    confirm?: boolean;
    sort?: { column: string, order: "asc" | "desc" };

}

export class TaskGrid extends React.Component<TaskGridProps, TaskGridState>  {

    constructor(props: TaskGridProps) {
        super(props);
        this.state = {
            rows: props.rows,
        }
    }

    public componentWillReceiveProps(nextProps: TaskGridProps) {
        this.setState({ rows: nextProps.rows });
    }


    public render() {
        const state = this.state;
        let rows = state.rows;
        if (rows && rows.length > 0) {
            rows = this.sortRows(rows);
        }

        if (this.props.statusFilter != undefined) {
            rows = rows.filter(x => x.currentState === this.props.statusFilter);
        }

        return (
            <div className='task-grid'>
                <div>
                    <span>
                        <InputGroup
                            onChange={(event: any) => this.handleOnTextChange(event)}
                            placeholder="Search Task..."
                            rightElement={this.searchbtn()}
                            value={state.searchText}
                            type='text'
                            fill={false}
                        />
                    </span>
                    <span>
                        {rows && rows.length > 0 &&
                            < Button icon="delete" onClick={(event: any) => {
                                event.stopPropagation();
                                this.handleOnBulkDelete();
                            }} >
                                Delete
                        </Button>
                        }
                    </span>
                </div>
                <table>
                    <tr>
                        <th>#</th>
                        <th onClick={(event: any) => {
                            event.stopPropagation();
                            this.setState({ sort: { column: 'title', order: this.state.sort?.order ? this.state.sort.order === 'asc' ? 'desc' : 'asc' : 'asc' } })
                        }}>Summary</th>
                        <th onClick={(event: any) => {
                            event.stopPropagation();
                            this.setState({ sort: { column: 'priority', order: this.state.sort?.order ? this.state.sort.order === 'asc' ? 'desc' : 'asc' : 'asc' } })
                        }}>Priority</th>
                        <th onClick={(event: any) => {
                            event.stopPropagation();
                            this.setState({ sort: { column: 'createdAt', order: this.state.sort?.order ? this.state.sort.order === 'asc' ? 'desc' : 'asc' : 'asc' } })
                        }}>Created On</th>
                        <th onClick={(event: any) => {
                            event.stopPropagation();
                            this.setState({ sort: { column: 'dueDate', order: this.state.sort?.order ? this.state.sort.order === 'asc' ? 'desc' : 'asc' : 'asc' } })
                        }}>Due Date</th>
                        <th>Actions</th>
                    </tr>
                    {
                        rows && rows.map((row: Task, index: number) => {

                            if (row.dueDate instanceof Date) {
                                row.dueDate = row.dueDate.toLocaleDateString();
                            }
                            return (
                                <tr
                                    key={index}
                                    style={{ background: row.currentState ? '' : 'green', color: row.currentState ? '' : 'white' }}
                                    onClick={(event: any) => {
                                        this.handleOnView(JSON.parse(JSON.stringify(row)))
                                    }}>
                                    <td onClick={(event: any) => {
                                        event.stopPropagation();
                                    }}>
                                        <Checkbox checked={row.checked} onChange={(event: any) => {
                                            event.stopPropagation();
                                            this.handleOnCheck(JSON.parse(JSON.stringify(row)), index);
                                        }} />
                                    </td>
                                    <td>{row.title}</td>
                                    <td>{Priority.find(x => x.value === row.priority)?.label}</td>
                                    <td>{row.createdAt}</td>
                                    <td>{row.dueDate}</td>
                                    <td className='actions'>

                                        <ButtonGroup minimal={true}>
                                            <Button icon="edit" onClick={(event: any) => {

                                                event.stopPropagation();
                                                this.props.onEdit && this.props.onEdit(JSON.parse(JSON.stringify(row)), index)
                                            }} />
                                            <Button icon="delete" onClick={(event: any) => {
                                                event.stopPropagation();
                                                this.setState({ confirm: true, selectedIndex: index })
                                            }} />

                                            <Button onClick={(event: any) => {
                                                event.stopPropagation();
                                                this.handleOnStatusChange(row, index)
                                            }} >
                                                {row.currentState ? "Done" : "Re-Open"}
                                            </Button>

                                        </ButtonGroup>
                                    </td>
                                </tr>)
                        })
                    }
                </table>
                <Dialog
                    isOpen={this.state.confirm}
                    title=''
                    onClose={() => this.setState({ confirm: false })}
                >
                    <div className={Classes.DIALOG_BODY}>
                        Are you sure, you want to delete the task ??
                    </div>
                    <div className={Classes.DIALOG_FOOTER}>
                        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                            <Button onClick={() => this.setState({ confirm: false })}>No</Button>
                            <Button onClick={() => this.handleOnDelete()} type="button" intent={Intent.PRIMARY} >
                                Yes
                        </Button>
                        </div>
                    </div>
                </Dialog>
            </div >

        );
    }

    private sortRows = (rows: Task[]) => {
        let sortedRows: Task[] = JSON.parse(JSON.stringify(rows));

        const state = this.state;
        const sort = state.sort;
        if (sort && sort.column) {
            sortedRows.sort((a: Task, b: Task) => {
                const column = sort.column;
                if (a[column].toString().toLowerCase() < b[column].toString().toLowerCase()) {
                    if (sort.order === 'asc') {
                        return -1
                    } else {
                        return 1;
                    }
                } else if (a[column].toString().toLowerCase() > b[column].toString().toLowerCase()) {
                    if (sort.order === 'asc') {
                        return 1;
                    } else {
                        return -1
                    }
                } else {
                    return 0
                }
            })
        }
        return sortedRows;
    }


    private handleOnBulkDelete = () => {
        let moveForward: boolean = false;
        const state = this.state;
        const rows = state.rows;
        const _selectedRows = rows && rows.map((row: Task, index: number) => {
            if (row.checked) {
                moveForward = true;
                return index;
            }

        }).filter(y => y != undefined);
        if (!moveForward) {
            Toaster.create().show({ message: 'Please select atleast one record' });
            return;
        }
        const tasklist = StoreUtils.getNewRecord(Sf.store.getState(), 'tasklist');
        _selectedRows && _selectedRows.forEach((x: number) => {
            tasklist.splice(x, 1);
        })
        Sf.store.dispatch({
            type: 'Service_GetNewRecord_Success',
            object: 'tasklist',
            record: tasklist,
        });


    }

    private handleOnCheck = (row: Task, index: number) => {
        const state = this.state;
        const rows = state.rows;
        row.checked = !row.checked;
        rows.splice(index, 1, row);
        this.setState({ rows: rows });
    }

    private handleOnView = (row: Task) => {
        this.props.onView && this.props.onView(row);
    }

    private handleOnStatusChange = (row: Task, index: number) => {
        const tasklist = StoreUtils.getNewRecord(Sf.store.getState(), 'tasklist') as Task[];
        if (tasklist) {
            row.currentState = !row.currentState;
            tasklist.splice(index, 1, row);
            Sf.store.dispatch({
                type: 'Service_GetNewRecord_Success',
                object: 'tasklist',
                record: tasklist,
            });
        }
    }

    private handleOnDelete = () => {
        const state = this.state;
        const index = state.selectedIndex;
        const tasklist = StoreUtils.getNewRecord(Sf.store.getState(), 'tasklist');
        if (tasklist && tasklist.length > 0 && index != undefined) {
            tasklist.splice(index, 1);
            Sf.store.dispatch({
                type: 'Service_GetNewRecord_Success',
                object: 'tasklist',
                record: tasklist,
            });

        }
        this.setState({ confirm: false, selectedIndex: undefined })
    }

    private handleOnTextChange = (event: any) => {
        if (event.target.value != '' && event.target.value != undefined) {
            this.setState({ searchText: event.target.value });
        } else {
            this.setState({ searchText: undefined, rows: this.props.rows });
        }
    }

    private searchTask = () => {
        const state = this.state;
        const rows = this.state.rows;
        const props = this.props;
        if (state.searchText && state.searchText != '') {
            const filterRows = rows.filter(x => (x.title.includes(state.searchText as string) || x.description.includes(state.searchText as string))).filter(y => y != undefined);
            this.setState({ rows: filterRows });
        } else {
            this.setState({ rows: props.rows });
        }
    }

    private searchbtn = () => {

        return (
            <Tooltip content={`Search`}>
                <Button
                    icon={"search"}
                    intent={Intent.WARNING}
                    minimal={true}
                    onClick={() => this.searchTask()}
                />
            </Tooltip>
        );
    }

}
