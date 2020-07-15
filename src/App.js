import React from 'react';
import NavBar from './components/NavBar'
import Todo from './components/Todo'

export class App extends React.Component {

    constructor() {
        super();
        this.state = {
            title: 'All Tasks', listOfTasks: [
                { key: 1, summary: 'PersonalWork', description: 'personalDesc', dueDate: '2020-07-20', priority: 'Low', createdDate: '2020-07-15', status: 'Close' },
                { key: 2, summary: 'OfficeWork', description: 'workDesc', dueDate: '2020-07-20', priority: 'High', createdDate: '2020-07-15', status: 'Open' },
                { key: 3, summary: 'GroceryList', description: 'groceryListDesc', dueDate: '2020-07-20', priority: 'Medium', createdDate: '2020-07-15', status: 'Close' }],
            filteredTasks: [
                { key: 1, summary: 'PersonalWork', description: 'personalDesc', dueDate: '2020-07-20', priority: 'Low', createdDate: '2020-07-15', status: 'Close' },
                { key: 2, summary: 'OfficeWork', description: 'workDesc', dueDate: '2020-07-20', priority: 'High', createdDate: '2020-07-15', status: 'Open' },
                { key: 3, summary: 'GroceryList', description: 'groceryListDesc', dueDate: '2020-07-20', priority: 'Medium', createdDate: '2020-07-15', status: 'Close' }
            ],
            editRow:'',editFlag:false
        };
        this.updateTitle = this.updateTitle.bind(this);
    }

    updateTitle(val) {
        this.setState({ title: val });
        var allTasks = this.state.listOfTasks;
        if (val == 'All Tasks') {
            this.setState({ filteredTasks: allTasks });
        }
        else if (val == 'Pending Tasks') {
            var dummyList=[];
            allTasks.forEach(task => {
                if (task.status === "Open") {
                    dummyList.push(task);
                }
            });
            this.setState({ filteredTasks: dummyList });
        }
        else {
            var dummyList=[];
            allTasks.forEach(task => {
                if (task.status === "Close") {
                    dummyList.push(task);
                }
            });
            this.setState({ filteredTasks: dummyList });
        }
    }

    editTask(task) {
        //var dummyTask = [];
        //dummyTask.push(task);
        this.setState({ editRow: task });
        this.setState({ editFlag: true });
    }

    updateStatus(ptask, status) {
        var allTasks = this.state.listOfTasks;
        var filterTasks = this.state.filteredTasks;
        allTasks.forEach(task => {
            if (task.key === ptask.key) {
                task.status=status;
            }
        });
        this.setState({ listOfTasks: allTasks });
        this.updateTitle(this.state.title);
    }
    

    deleteTasks(x) {
        console.log(x);
        var len = x.length;
        var allTasks = this.state.listOfTasks;
        console.log(allTasks);
        for (var i = 0; i < len; i++) {
            var dummy = [];
            allTasks.forEach(task => {
                
                if (task.key === x[i]) {
                }
                else {
                    dummy.push(task);
                }
            });
            allTasks = dummy;
        }
        
        var val = this.state.title;
        if (val == 'All Tasks') {
            this.setState({ filteredTasks: allTasks });
        }
        else if (val == 'Pending Tasks') {
            var dummyList = [];
            allTasks.forEach(task => {
                if (task.status === "Open") {
                    dummyList.push(task);
                }
            });
            this.setState({ filteredTasks: dummyList });
        }
        else {
            var dummyList = [];
            allTasks.forEach(task => {
                if (task.status === "Close") {
                    dummyList.push(task);
                }
            });
            this.setState({ filteredTasks: dummyList });
        }

        this.setState({ listOfTasks: allTasks });
    }

    addTaskIntoList(sum, des, date, pri) {
        var updatedTasks = this.state.listOfTasks;
        var d = new Date();
        d = d.toISOString().split('T')[0];
        if (date == '')
            date = d;
        if (pri == '')
            pri = "None";
        var newTask = {
            key: Math.random(),
            summary: sum,
            description: des,
            dueDate: date,
            priority: pri,
            createdDate: d,
            status: "Open"
        };
        updatedTasks.unshift(newTask);
        this.setState({ listOfTasks: updatedTasks });
        this.updateTitle(this.state.title);
    }

    editTaskInList(sum, des, date,pri) {
        var dummy = this.state.editRow;
        var allTasks = this.state.listOfTasks;
        var d = new Date();
        d = d.toISOString().split('T')[0];
        if (date == '')
            date = d;
        if (pri == '')
            pri = "None";
        allTasks.forEach(task => {
            if (task.key === dummy.key) {
                task.summary = sum;
                task.description = des;
                task.dueDate = date;
                task.priority = pri;
            }
        });

        var val = this.state.title;
        if (val == 'All Tasks') {
            this.setState({ filteredTasks: allTasks });
        }
        else if (val == 'Pending Tasks') {
            var dummyList = [];
            allTasks.forEach(task => {
                if (task.status === "Open") {
                    dummyList.push(task);
                }
            });
            this.setState({ filteredTasks: dummyList });
        }
        else {
            var dummyList = [];
            allTasks.forEach(task => {
                if (task.status === "Close") {
                    dummyList.push(task);
                }
            });
            this.setState({ filteredTasks: dummyList });
        }

        this.setState({ listOfTasks: allTasks });
        this.setState({ editRow: '' });
        this.setState({editFlag : false})
    }
    

    updateSearch(event) {
        console.log(event.target.value);
        var searchKey = event.target.value.substr(0, 20);
        var allTasks = this.state.listOfTasks;
        var val = this.state.title;

        allTasks.forEach(task => {

            if (val == 'All Tasks') {
                var dummyList = [];
                allTasks.forEach(task => {
                    if (searchKey.length === 0 ? true : task.summary.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1) {
                        dummyList.push(task);
                    }
                    });

                this.setState({ filteredTasks: dummyList });
            }
            else if (val == 'Pending Tasks') {
                var dummyList = [];
                allTasks.forEach(task => {
                    if (task.status === "Open" && (searchKey.length === 0 ? true : task.summary.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1)) {
                        dummyList.push(task);
                    }
                });
                this.setState({ filteredTasks: dummyList });
            }
            else {
                var dummyList = [];
                allTasks.forEach(task => {
                    if (task.status === "Close" && (searchKey.length === 0 ? true : task.summary.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1)) {
                        dummyList.push(task);
                    }
                });
                this.setState({ filteredTasks: dummyList });
            }
        });
    }

    handleEditFlag() {
        this.setState({ editFlag: false });
    }

    render() {
        return (<div className="App">
            <NavBar
                changeTitle={this.updateTitle}
                editRow={this.state.editRow}
                editFlag={this.state.editFlag}
                submit={this.addTaskIntoList.bind(this)}
                edit={this.editTaskInList.bind(this)}
                updateSearch={this.updateSearch.bind(this)}
                handleEditFlag={this.handleEditFlag.bind(this)}
            />
            <Todo
                title={this.state.title}
                listOfTasks={this.state.filteredTasks}
                updateStatus={this.updateStatus.bind(this)}
                editTask={this.editTask.bind(this)}
                deleteTasks={this.deleteTasks.bind(this)}
            />
        </div>);
    }
}

export default App;
