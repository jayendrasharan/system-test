import * as React from 'react';
import { Tab, Tabs, Button } from "@blueprintjs/core";
import './Task.scss';
import { TaskGrid } from './TaskGrid';
import { Task } from '../../models';
import { AddTaskForm } from './AddTaskForm';
import { connect } from 'react-redux';
import { StoreUtils } from '../../store';
import { Sf } from '../../services';

export interface TaskListState {
    selectedTab: string;
    openModal?: boolean;
    taskRecord?: Task;
    mode?: 'view' | 'add' | 'edit'
}

@connect((state: any) => { return { state }; })
export class TaskList extends React.Component<{}, TaskListState>
{
    constructor(props: any) {
        super(props);
        this.state = {
            selectedTab: 'all',
            openModal: false
        }
    }


    public render() {
        console.log('render', Date.now());
        return (
            <>
                <Tabs className='main-tabs' id="TaskList" onChange={this.handleTabChange} renderActiveTabPanelOnly selectedTabId={this.state.selectedTab}>
                    <Tab id="all" title="All Tasks" panel={
                    <TaskGrid rows={this.getTaskList()}
                        onEdit={(row: Task, index: number) => this.handleOnEditTask(row, index)}
                        onView={(row: Task) => this.handleOnEditTask(row, undefined, 'view')}
                    />} />
                    <Tab id="completed" title="Completed" panel={<div>Tab2</div>} />
                    <Tab id="pending" title="Pending" panel={<div>Tab3</div>} />
                </Tabs>
                <Button icon="add" onClick={() => this.setState({ openModal: true })} intent="warning" large id='btndisclaimer' />
                <AddTaskForm mode={this.state.mode} taskRecord={this.state.taskRecord} openModal={this.state.openModal} onClose={() => this.setState({ openModal: false, taskRecord: undefined, mode: undefined })} />
            </>
        );
    }

    public componentDidUpdate() {
        // Just to check what is present in store on console.
        window.store = Sf.store.getState();
    }


    private handleOnEditTask = (row: Task, index?: number, mode?: 'view' | 'add' | 'edit') => {
        row.index = index;
        if (mode === 'view') {
            this.setState({ taskRecord: row, openModal: true, mode: 'view' })
        } else {
            this.setState({ taskRecord: row, openModal: true })
        }
    }

    private getTaskList = (): Task[] => {
        return StoreUtils.getNewRecord(Sf.store.getState(), 'tasklist') as Task[] || [];
    }

    private handleTabChange = (selectedTab: string) => {
        this.setState({ selectedTab })
    }
}