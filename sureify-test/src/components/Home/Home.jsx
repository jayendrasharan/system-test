import React from 'react';
import './Home.scss';
import TaskList from '../TaskList/TaskList';
import AddTask from '../Tasks/AddTask';
import { connect } from "react-redux";
import { actions as taskActions } from "../../reducers/actions/tasks";

const Home = (props) => {

    return (
        <>
            <TaskList />
            <AddTask />
        </>
    );
};


const mapDispatchToProps = {
    ...taskActions,
  };
const mapStateToProps = (state) => ({
    tasksList: state.tasks.tasksList,
    configData: state.config.configData,
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);
  