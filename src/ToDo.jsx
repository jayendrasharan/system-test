import React, {Component} from 'react';
import SearchToDo from "./Components/SearchToDo/SearchToDo";
import AddToDo from "./Components/AddToDo/AddToDo";
import ShowToDo from "./Components/ShowToDo/ShowToDo";
import SortByStatus from "./Components/SortByStatus/SortByStatus";
import './ToDo.css';
class ToDo extends Component {
    constructor() {
        super();
        this.state = {
            searchKeyword: null,
            showToDo: null,
            tasks: [],
            showModal: false,
            tasksByStatus: 'All',
            groupByStatus: 'None',
            checkList: [],
            sortDirections: {
                title: 'ascending',
                taskPriority:  'ascending',
                createdDate:  'ascending',
                dueDate:  'ascending'
            }
        }
        this.searchList = this.searchList.bind(this);
        this.addTask = this.addTask.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleGroupBy = this.handleGroupBy.bind(this);
        this.handleTaskCompleted = this.handleTaskCompleted.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleKeyBoardEvent = this.handleKeyBoardEvent.bind(this);
        this.handleTaskReopen = this.handleTaskReopen.bind(this);
        this.handleCheckList = this.handleCheckList.bind(this);
    }

    addTask = (newTask) => {
        let updatedTask = this.state.tasks;
        updatedTask.push({
            'title': newTask[0],
            'description': newTask[1],
            'createdDate': newTask[2],
            'dueDate': newTask[3],
            'taskPriority': newTask[4],
            'status': 'Pending'
        });
        this.setState({
            tasks: updatedTask
        })
    }

    updateTask = (updatedValues) => {
        let tasks = this.state.tasks;
        tasks.map((val) => {
            if (val.title === updatedValues[0]) {
                val.title = updatedValues[1];
                val.description = updatedValues[2];
                val.createdDate = updatedValues[3];
                val.dueDate = updatedValues[4];
                val.taskPriority = updatedValues[5];
                val.status = updatedValues[6];
            }
            return true;
        });
        this.setState({
            tasks: tasks
        })
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    searchList = (searchKeywordEvent) => {
        let searchKeyword = searchKeywordEvent.target.value;
        this.setState({
            searchKeyword: searchKeyword
        })
    }

    handleStatus = (requiredStatus) => {
        this.setState({
            tasksByStatus: requiredStatus.target.name
        });
    }

    handleCheckList = (checkedVal, checkedCheck) => {
        let checklist = this.state.checkList;
        if (checkedCheck) {
            if(checklist.indexOf(checkedVal)<0) {
                checklist.push(checkedVal)
                checklist = [...new Set(checklist)];
                this.setState({checkList: checklist});
            }
        } else if (!checkedCheck) {
            let removeElem = checkedVal;
            this.setState({
                checkList: this.state.checkList.filter(val=> val !== removeElem)
            });
        }
    }

    handleTaskCompleted = (completedTask) => {
        let tasks = this.state.tasks;
        tasks.map((val) => {
            completedTask.map((taskName) => {
                if (val.title === taskName) {
                    val.status = 'Completed';
                }
                return true;
            })
            return true;
        });
        this.setState({
            tasks: tasks,
            checkList: []
        })
    }

    handleSort = (sortHeadEvent) => {
        let tasks = this.state.tasks;
        let sortHead = sortHeadEvent.target.id;
        if (this.state.sortDirections[sortHead] === 'ascending') {
            tasks.sort((a, b) => b[sortHead] < a[sortHead] ? 1 :
                b[sortHead] > a[sortHead] ? -1 : 0);
        } else {
            tasks.sort((a, b) => b[sortHead] > a[sortHead] ? 1 :
                b[sortHead] < a[sortHead] ? -1 : 0);
        }
        this.setState({
            tasks: tasks,
            sortDirections: {
                ...this.state.sortDirections,
                [sortHead]: (this.state.sortDirections[sortHead] === 'ascending') ? 'descending' : 'ascending'
            }
        });
    }

    handleGroupBy = (requiredGroup) => {
        let tasks = this.state.tasks;
        let groupName = requiredGroup.target.name;
        tasks.sort((a, b) => b[groupName] < a[groupName] ? 1 :
            b[groupName] > a[groupName] ? -1 : 0);
        this.setState({
            groupByStatus: groupName,
            tasks: tasks
        });
    }

    handleTaskReopen = (reopenTask) => {
        let tasks = this.state.tasks;
        tasks.map((val) => {
            if (val.title === reopenTask) {
                val.status = 'Pending';
            }
            return true;
        });
        this.setState({
            tasks: tasks
        })
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyBoardEvent, true);
    }

    handleKeyBoardEvent = (event) => {
        if (event.ctrlKey && (event.key === 'F' || event.key === 'f') && event.shiftKey) {
            document.querySelector("#searchBox").focus();
        }
    }

    render() {
        return(
            <div className='container'>
                <p className='display-4'>To do application</p>
                {
                    this.state.tasks.length > 0 ?
                        <React.Fragment>
                            <SearchToDo searchList={this.searchList}/>
                            <AddToDo
                                showModal={this.state.showModal}
                                toggleModal={this.toggleModal}
                                addTask={this.addTask}
                            />
                            <SortByStatus
                                handleStatus={this.handleStatus}
                                handleGroupBy={this.handleGroupBy}
                                tasksByStatus={this.state.tasksByStatus}
                                groupByStatus={this.state.groupByStatus}
                            />
                            <ShowToDo
                                searchKeyword={this.state.searchKeyword}
                                tasks={this.state.tasks}
                                updateTask={this.updateTask}
                                tasksByStatus={this.state.tasksByStatus}
                                groupByStatus={this.state.groupByStatus}
                                handleTaskCompleted={this.handleTaskCompleted}
                                handleTaskReopen={this.handleTaskReopen}
                                handleSort = {this.handleSort}
                                checkList={this.state.checkList}
                                handleCheckList={this.handleCheckList}
                            />
                        </React.Fragment>:
                        <AddToDo
                            showModal={this.state.showModal}
                            toggleModal={this.toggleModal}
                            addTask={this.addTask}
                        />
                }

            </div>
        );
    }
}

export default ToDo;