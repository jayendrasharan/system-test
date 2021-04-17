
import React from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Popup from '../components/Popup';
import TodoList from '../components/TodoList';

class TodoHome extends React.Component {
  constructor(props){  
    super(props);  
    this.state = { 
        showPopup: false,
        allTask: [],
        completedTask: [],
        pendingTask: [],
        populateTask: [],
        eventKeyProps: this.props.eventKeyProps
    };  
  }  


  componentWillMount() {
    let storeAll = window.localStorage.getItem('storeAll');
    let storeCompleted = window.localStorage.getItem('storeCompleted');
    let storePending = window.localStorage.getItem('storePending');
    this.setState({
      allTask: !storeAll ? [] : JSON.parse(storeAll),
      completedTask: !storeCompleted ? [] : JSON.parse(storeCompleted),
      pendingTask: !storePending ? [] : JSON.parse(storePending),
    });
  }

  togglePopup($this, index) {
    if(index) this.state.allTask[index].index = index;
    this.setState({  
        showPopup: !this.state.showPopup,
        populateTask: this.state.allTask[index]
   }); 
  }

  toggleTab() {
    this.setState({
      completedTask:this.state.completedTask,
      pendingTask:this.state.pendingTask,
      allTask:this.state.allTask
    });
  }
  
  render() {
    return (
      <React.Fragment>
        <div className="row" style={{marginBottom:'40px'}}>
          <div className="col-md-6 justify-content-end">
            <button onClick={() => this.togglePopup()} ><i className="fa fa-plus" aria-hidden="true"></i></button>
          </div>
        </div>       
        
        <div className="row">
            <div className="col-md-12">
              <Tabs defaultActiveKey="allTasks" id="uncontrolled-tab-example" onClick={() => this.toggleTab()}>
                <Tab eventKey="allTasks" title="All tasks">
                  <TodoList eventKey="allTasks" 
                              loading= {this.state.loading}
                              allTask={this.state.allTask} 
                              completedTask={this.state.completedTask}
                              pendingTask={this.state.pendingTask}
                              editPopup={($this, index) => this.togglePopup($this, index)}
                               /> 
                </Tab>
                <Tab eventKey="completed" title="Completed">
                  <TodoList eventKey="completed" completedTask={this.state.completedTask}/>
                </Tab>
                <Tab eventKey="pending" title="Pending">
                  <TodoList eventKey="pending" pendingTask={this.state.pendingTask}/>
                </Tab>
              </Tabs>
            </div>
        </div>
        {this.state.showPopup ?  
          <Popup closePopup={() => this.togglePopup()} 
                 allTask={this.state.allTask} 
                 pendingTask={this.state.pendingTask}
                 populateTask={this.state.populateTask}
                 loading= {this.state.loading}/>  
          : null  
        } 
      </React.Fragment>
    );
  }
}

export default TodoHome;
