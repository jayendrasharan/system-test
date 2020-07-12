import React, { Component } from 'react';
import cn from "classnames";
import { get, isEmpty, map } from 'lodash';
import PropTypes from 'prop-types';
import { v4 } from "uuid";
import "./task-page.scss";
import NavTabs from './components/nav-tabs/nav-tabs';
import TasksList from './components/tasksList/tasks-list';
import TaskForm from './components/forms/todo-form';
import { CrudActions, routes } from './constants';
import GroupByDropdown from './components/global-search/groupby-dropdown';
import GlobalSearch from './components/global-search/search';
import QuickActions from './components/tasksList/quick-actions';


/*
Renders the main page with all nav tabs and add task button
*/
class TaskPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskList: [],
            showModal: false,
            selectedIndex: 0,
            action: "",
            todo: {},
            selectedTodos: []
        };
    }

    clearSelected = () => {
        this.setState({
            selectedTodos: [],
        })
    }

    toggleModal = (todoTemp = {}, action = "") => {
        let todo = todoTemp;
        if (action === CrudActions.Check) {
            let { selectedTodos } = this.state;
            let existingIndex = -1;
            map(selectedTodos, (todo, todoIndex) => {
                if (todo.id === todoTemp.id) {
                    existingIndex = todoIndex;
                }
            })
            if (existingIndex > -1) {
                selectedTodos.splice(existingIndex, 1);
            } else {
                selectedTodos.push(todoTemp);
            }
            this.setState({
                selectedTodos
            })
            return;
        } else if (action === CrudActions.Add || isEmpty(todo)) {
            todo = {
                id: v4(),
                currentState: 0,
                title: "",
                description: "",
                createdAt: new Date().toLocaleDateString(),
                dueDate: "",
                priority: 0,
            }
        }
        this.setState({
            todo,
            action,
            showModal: !this.state.showModal,
        })
    }

    //Renders Navbar with the given items
    renderNavbar = () => {
        const { location } = this.props;

        const items = routes.map((route) => {
            return {
                selected: get(location, "pathname", "").indexOf(route.url) > -1,
                url: route.url,
                title: route.title,
            };
        });

        return <NavTabs tabs={items} />;
    }

    render() {
        return (
            <React.Fragment>
                <h1 className="todo-header">
                    To Do List App
                </h1>
                <div className="col-lg-12">
                    <GlobalSearch />
                    <GroupByDropdown />
                </div>
                {this.renderNavbar()}
                <QuickActions todosArray={this.state.selectedTodos} clearSelected={this.clearSelected} />
                <TasksList
                    onAction={this.toggleModal}
                    location={this.props.location}
                    selectedTodos={this.state.selectedTodos}
                />
                <div className="add-task-div" title="Add new task" onClick={() => this.toggleModal({}, CrudActions.Add)}>
                    <i className={cn("material-icons", "add-btn")}>add</i>
                </div>
                {/* Add Task Form */}
                {this.state.showModal &&
                    <TaskForm
                        todo={this.state.todo}
                        onCancel={this.toggleModal}
                        action={this.state.action}
                    />
                }
            </React.Fragment>
        );
    }
}

TaskPage.propTypes = {
    location: PropTypes.any
};

export default TaskPage;