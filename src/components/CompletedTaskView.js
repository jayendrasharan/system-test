import React, { Component } from 'react';
import { connect } from 'react-redux';
import spinner from '../components/spinner.gif';
import Container from './layout/Container';

class CompletedTaskView extends Component {
  
  render(){
      const completedTask = this.props.currentState.todo.filter(item=>{
          return item.currentState
      });
      const searchedCompletedTask = this.props.currentState.searchedItem.filter(item=>{
        return item.currentState
      });
      let completedTaskGroup={}; 
      this.props.currentState.groupBy&& Object.entries(this.props.currentState.groupBy).map(
        ([key, value])=>{
          return completedTaskGroup[key]=value.filter(i=>{
            return i.currentState
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
        <Container todo={completedTask} 
        sortBy={this.props.currentState.sortBy}
                    sortOrder = {this.props.currentState.sortOrder} groupBy = {completedTaskGroup} searchedItem={searchedCompletedTask} searchedTerm={this.props.currentState.searchedTerm}/>
       )
    }
    
  }
}

const mapStateToProps = (state) => {
  return {
    currentState : state.todoData,
  }
}

export default connect(mapStateToProps, null)(CompletedTaskView);
