import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { groupBy, searchItem } from '../../actions/todoActions'
import { connect } from 'react-redux';

class Header extends Component {
constructor(){
  super();
  this.state={
    groupByTerm : '',
    searchTerm:''
  }
}
groupBySelection = (e) => {
  this.setState({groupByTerm:e.target.value})
  this.props.groupBy(e.target.value);
}  
searchItem=(e)=>{
  this.setState({searchTerm:e.target.value})
  this.props.searchItem(e.target.value)
}
componentDidMount(){
  this.setState({searchTerm:this.props&&this.props.currentState.searchedTerm,
    groupByTerm : this.props&&this.props.currentState.groupByTerm})
}
render() {
  return (
      <nav className="navbar navbar-expand-sm mb-4">
        <div className="container">
          <label>Search</label>
          <input type="text" placeholder="Search task" style={{marginRight:'80px'}} onChange={this.searchItem} value={this.state.searchTerm}></input>
          <Link className="navbar-brand" to="/">All Tasks</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to="/pending">Pending Tasks</Link>
          <Link className="navbar-brand" to="/completed">Completed Tasks</Link>
          <label style={{marginLeft:'80px'}}>Group by</label>
          <select value={this.state.groupByTerm} onChange={this.groupBySelection}>
            <option>None</option>
            <option>Created On</option>
            <option>Pending On</option>
            <option>Priority</option>
          </select>          
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentState : state.todoData,
  }
}
export default connect(mapStateToProps, { groupBy, searchItem })(Header);