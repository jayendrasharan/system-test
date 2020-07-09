import * as React from 'react';
import { Dialog, Classes, Button, Intent } from '@blueprintjs/core';
import { FormGroup, InputGroup, TextArea } from '@blueprintjs/core';
import { DateInput, IDateFormatProps } from "@blueprintjs/datetime";
import { Task } from '../../models';
import { StoreUtils } from '../../store';
import { Sf } from '../../services';
export interface AddTaskFormProps {
    openModal?: boolean;
    onClose?: (value?: any) => any;
    taskRecord?: Task;
    mode?: 'add' | 'edit' | 'view';
}

export interface AddTaskFormState {
    openModal?: boolean;
    taskRecord?: Task;
    mode?: 'add' | 'edit' | 'view';
}

export class AddTaskForm extends React.Component<AddTaskFormProps, AddTaskFormState>
{


    constructor(props: AddTaskFormProps) {
        super(props);
        this.state = {
            openModal: props.openModal,
            taskRecord: props.taskRecord || new Task(),
            mode: props.taskRecord ? 'edit' : 'add'
        }
    }

    public componentWillReceiveProps(nextProps: AddTaskFormProps) {
        if (nextProps.taskRecord) {
            const taskRecord = JSON.parse(JSON.stringify(nextProps.taskRecord));
            taskRecord.dueDate = new Date(taskRecord.dueDate);
            this.setState({ openModal: nextProps.openModal, taskRecord: nextProps.taskRecord, mode: nextProps.mode ? nextProps.mode : 'edit' })
        } else {
            this.setState({ openModal: nextProps.openModal, taskRecord: undefined, mode: 'add' })
        }
    }


    public render() {
        const state = this.state;
        const jsDateFormatter: IDateFormatProps = {
            // note that the native implementation of Date functions differs between browsers
            formatDate: date => date.toLocaleDateString(),
            parseDate: str => new Date(str),
            placeholder: "MM/DD/YYYY",
        };
        const taskRecord = state.taskRecord ? JSON.parse(JSON.stringify(state.taskRecord)) : state.taskRecord;
        const dueDate = taskRecord && taskRecord.dueDate && new Date(taskRecord.dueDate);
        return (
            <Dialog
                isOpen={this.state.openModal}
                icon={state.mode === 'add' ? 'add' : state.mode === 'view' ? 'eye-open' : 'edit'}
                onClose={this.handleClose}
                title={`${state.mode === 'add' ? 'Add' : state.mode === 'view' ? 'View' : 'Edit'} Task`}
                {...this.state}
            >
                <div className={Classes.DIALOG_BODY}>
                    <FormGroup

                        label={'Summary'}
                        labelFor="text-summary"

                    >
                        <InputGroup disabled={this.state.mode === 'view'} value={taskRecord ? taskRecord.title : undefined} onChange={(e: any) => this.handleOnChange('title', e.target.value)} type='text' id="text-summary" />
                    </FormGroup>
                    <FormGroup

                        label={'Description'}
                        labelFor="text-description"

                    >
                        <TextArea
                            disabled={this.state.mode === 'view'}
                            fill
                            value={taskRecord ? taskRecord.description : undefined}
                            growVertically={true}
                            large={true}
                            id='text-description'
                            onChange={(e: any) => this.handleOnChange('description', e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup

                        label={'Priority'}
                        labelFor="text-priority"
                    >
                        <select disabled={this.state.mode === 'view'} onChange={(event: any) => this.handleOnChange('priority', event.target.value)}>
                            {Priority.map((x: UIOption, index: number) => {
                                return (
                                    <option selected={taskRecord ? x.value === taskRecord.priority : false} value={x.value}>{x.label}</option>
                                )
                            })}
                        </select>
                    </FormGroup>
                    <FormGroup

                        label={'Due Date'}
                        labelFor="text-duedate"
                    >
                        <DateInput disabled={this.state.mode === 'view'} value={dueDate} onChange={this.onDateChange} fill {...jsDateFormatter} />
                    </FormGroup>
                    {this.state.mode === 'view' &&

                        <FormGroup label={'Status'} >
                            <InputGroup disabled={this.state.mode === 'view'} value={taskRecord ? taskRecord.currentState === true ? 'Open' : 'Closed' : undefined} type='text' />
                        </FormGroup>
                    }
                    {this.state.mode === 'view' &&
                        <FormGroup label={'Created On'} >
                            <InputGroup disabled={this.state.mode === 'view'} value={taskRecord ? taskRecord.createdAt : undefined} type='text' />
                        </FormGroup>
                    }
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button disabled={this.state.mode === 'view'} onClick={this.handleOnSave} type="button" intent={Intent.PRIMARY} >
                            {this.state.mode === 'edit' ? 'Update' : 'Save'}
                        </Button>
                    </div>
                </div>
            </Dialog>
        );
    }

    private handleOnSave = () => {
        const state = this.state;
        const taskRecord = state.taskRecord;
        if (taskRecord && taskRecord.dueDate && taskRecord.dueDate instanceof Date) {
            taskRecord.dueDate = (taskRecord?.dueDate as Date).toLocaleDateString();
        }
        const taskIndex = taskRecord && taskRecord.index;
        const taskslist = StoreUtils.getNewRecord(Sf.store.getState(), 'tasklist');
        if (!taskslist) {
            const _tasklist: Task[] = [];

            _tasklist.unshift(taskRecord as Task);
            Sf.store.dispatch({
                type: 'Service_GetNewRecord_Success',
                object: 'tasklist',
                record: _tasklist,
            });
        } else {
            if (taskIndex != undefined) {
                taskslist.splice(taskIndex, 1, taskRecord);
            } else {
                taskslist.unshift(taskRecord);
            }
            Sf.store.dispatch({
                type: 'Service_GetNewRecord_Success',
                object: 'tasklist',
                record: taskslist,
            });

        }
        console.log(Sf.store.getState());
        this.props.onClose && this.props.onClose();
    }

    private handleOnChange = (key: string, value: any) => {
        const state = this.state;
        let taskRecord = state.taskRecord;
        if (!taskRecord) {
            taskRecord = new Task();
        }
        taskRecord[key] = value;
        this.setState({ taskRecord });
    }

    private onDateChange = (selectedDate: Date, isUserChange: boolean) => {
        this.handleOnChange('dueDate', selectedDate);
    }

    private handleClose = () => {
        this.setState({ openModal: false, taskRecord: undefined, mode: undefined });
        this.props.onClose && this.props.onClose();
    }


   
}



export type UIOption =
    {
        label?: string;
        value?: string;
    }

export const Priority: UIOption[] = [
    { label: 'None', value: 'none' },
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
]