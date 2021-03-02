import React, { Component } from 'react'
import TaskListView from './components/tasklist/TaskListView'
import TaskListTabs from './components/tasklist/TaskListTabs'
import AddTaskModal from './components/AddTaskModal'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "tasks" : [
                {
                    "id": 0,
                    "title": "helo",
                    "description": "hello world",
                    "priority": "none",
                    "createdDate": new Date(),
                    "dueDate": new Date(),
                    "isDone": false
                }
            ],
            "actualTasks": [
                {
                    "id": 0,
                    "title": "helo",
                    "description": "hello world",
                    "priority": "none",
                    "createdDate": new Date(),
                    "dueDate": new Date(),
                    "isDone": false
                }
            ],
            "currentTabIndex": 0,
            "openModal": false
        }
    }

    insertTask(taskObj) {
        let actualTasks = this.state.actualTasks.slice();
        let id = Math.random() + 1;
        let newTask = {
            "id": id,
            "title": taskObj.title,
            "priority": taskObj.priority || "none",
            "createdDate": new Date(),
            "dueDate": taskObj.dueDate || "optional",
            "isDone": taskObj.isDone,
            "description": taskObj.description
        };
        let result = [];
        result.push(newTask);
        for(let i=0; i<actualTasks.length; i++) {
            result.push(actualTasks[i]);
        }
        let tabIndex = this.state.currentTabIndex;
        let currentTabTasks = [];
        let isDone = tabIndex === 2;
        for(let i=0; i<result.length; i++) {
            if (tabIndex === 0 || result[i].isDone === isDone) {
                currentTabTasks.push(result[i]);
            }
        }
        this.setState({
            tasks: currentTabTasks,
            actualTasks: result
        });
    }

    handleEdit(id) {
        console.log("Edit invoked on ", id);
    }

    handleDelete(id) {
       let actualTasks = this.state.actualTasks.slice();
       let result = [];
       for (let i=0; i<actualTasks.length; i++) {
           if (actualTasks[i].id !== id) {
               result.push(actualTasks[i]);
           }
       }
       let tabIndex = this.state.currentTabIndex;
       let currentTabTasks = [];
       let isDone = tabIndex === 2;
       for(let i=0; i<result.length; i++) {
           if (tabIndex === 0 || result[i].isDone === isDone) {
               currentTabTasks.push(result[i]);
           }
       }
       this.setState({
           tasks: currentTabTasks,
           actualTasks: result
       });      
    }

    handleDoneOrReopen(id) {
        let actualTasks = this.state.actualTasks.slice();
        let result = [];
        for (let i=0; i<actualTasks.length; i++) {
            if (actualTasks[i].id === id) {
                actualTasks[i].isDone = !actualTasks[i].isDone;
                result.push(actualTasks[i]);
            } else {
                result.push(actualTasks[i]);
            }
        }
        let tabIndex = this.state.currentTabIndex;
        let currentTabTasks = [];
        let isDone = tabIndex === 2;
        for(let i=0; i<result.length; i++) {
            if (tabIndex === 0 || result[i].isDone === isDone) {
                currentTabTasks.push(result[i]);
            }
        }
        this.setState({
            tasks: currentTabTasks,
            actualTasks: result
        });   
    }

    handleTabChange(tabIndex){
        this.setState({
            currentTabIndex: tabIndex
        });
        console.log('tab is changed'+tabIndex);
        // 1 indicates pending
        // 2 indicates completed
        let actualTasks = this.state.actualTasks.slice();
        let currentTabTasks = [];
        let isDone = tabIndex === 2;
        for(let i=0; i<actualTasks.length; i++) {
            if (tabIndex === 0 || actualTasks[i].isDone === isDone) {
                currentTabTasks.push(actualTasks[i]);
            }
        }
        this.setState({
            tasks: currentTabTasks
        });
    }



    handleSaveTask(taskObj) {
        this.insertTask(taskObj);
    }

    handleRowClick(id) {
        console.log(id);
        this.setState({
            openModal: true
        });
    }

    render() {
        const tasks = this.state.tasks;
        return (
            <div style={{width: "90%"}}>
                <TaskListTabs 
                    handleTabChange={(tabIndex) => {this.handleTabChange(tabIndex)}}
                />
                <TaskListView 
                    tasks={tasks} 
                    handleEdit={(id) =>{this.handleEdit(id);}}
                    handleDelete={(id) => {this.handleDelete(id);}}
                    handleDoneOrReopen={(id) => {this.handleDoneOrReopen(id);}}
                    handleRowClick={(id) => {this.handleRowClick(id);}}
                />
                <AddTaskModal handleSave={(task) => {this.handleSaveTask(task)}} />
            </div>
        );
    }
}

export default App;
