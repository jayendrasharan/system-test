import React, { Component } from 'react';
import { connect } from 'react-redux';
import spinner from '../components/spinner.gif';
import Container from './layout/Container';

class PendingTaskView extends Component {
  
  render(){
      const pendingTask = this.props.currentState.todo.filter(item=>{
          return !item.currentState
      });
      const searchedPendingTask = this.props.currentState.searchedItem.filter(item=>{
        return !item.currentState
      });
      let pendingTaskGroup={}; 
      this.props.currentState.groupBy&& Object.entries(this.props.currentState.groupBy).map(
        ([key, value])=>{
          return pendingTaskGroup[key]=value.filter(i=>{
            return !i.currentState
          })
        }
      )
    if(this.props.currentState.loading){
      return (
        <div>
      <img src={spinner} alt="Loading..." style={{width: '200px', margin: 'auto', display: 'block'}}/>
    </div>
      )
    } else {
      return (
        <Container todo={pendingTask} sortBy={this.props.currentState.sortBy}
        sortOrder = {this.props.currentState.sortOrder} groupBy = {pendingTaskGroup} searchedItem={searchedPendingTask} searchedTerm={this.props.currentState.searchedTerm} />
       )
    }
    
  }
}

const mapStateToProps = (state) => {
  return {
    currentState : state.todoData,
  }
}

export default connect(mapStateToProps, null)(PendingTaskView);
