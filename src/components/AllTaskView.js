import React, { Component } from 'react';
import { connect } from 'react-redux';
import spinner from '../components/spinner.gif';
import Container from './layout/Container';

class AllTaskView extends Component {
  
  render(){
    const allTask = this.props.currentState.todo.map(item=> item);
    if(this.props.currentState.loading){
      return (
        <div>
      <img src={spinner} alt="Loading..." style={{width: '200px', margin: 'auto', display: 'block'}}/>
    </div>
      )
    } else {
      return (
        <Container 
                  todo={this.props.currentState.todo}
                  groupBy = {this.props.currentState.groupBy}
                  searchedItem={this.props.currentState.searchedItem}
                    searchedTerm={this.props.currentState.searchedTerm}
                    sortBy={this.props.currentState.sortBy}
                    sortOrder = {this.props.currentState.sortOrder}
                  />
       )
    }
    
  }
}

const mapStateToProps = (state) => {
  return {
    currentState : state.todoData
  }
}

export default connect(mapStateToProps, null)(AllTaskView);
