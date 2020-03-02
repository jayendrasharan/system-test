import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { taskStatusUpdate, sortColumn } from '../../actions/todoActions'
import EditTask from '../EditTask';
import ViewTask from '../ViewTask';
import DeleteTask from '../DeleteTask';


class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleView: false,
      visibleEdit: false,
      visibleDelete: false,
      summary: '',
      description: '',
      currentState: '',
      priority: '',
      dueDate: '',
      createdAt: '',
      index: '',
      toggle: false,
      activeColumn: 0,
      lastActiveColumn: 0,
      groupByValues: [],
      taskId : ''
    }
  }

  showViewModal = (i) => {
    this.setState({
      visibleView: true,
      summary: i.summary,
      description: i.description,
      currentState: i.currentState ? 'Closed' : 'Open',
      priority: i.priority,
      dueDate: i.dueDate,
      createdAt: i.createdAt
    });
  }
  showEditModal = (e, i, ind) => {
    e.stopPropagation()
    this.setState({
      visibleEdit: true,
      summary: i.summary,
      description: i.description,
      currentState: i.currentState,
      priority: i.priority,
      dueDate: i.dueDate,
      createdAt: i.createdAt,
      index: ind,
      taskId : i.id
    });
  }
  showDeleteModal = (e, i, ind) => {
    e.stopPropagation()
    this.setState({
      visibleDelete: true,
      summary: i.summary,
      index: ind,
      taskId : i.id
    });
  }
  hideModal = () => {
    this.setState({ visibleView: false, visibleEdit: false, visibleDelete: false });
  }

  handleTaskState = (e, i, ind) => {
    e.stopPropagation()
    const data = {
      currentState: !i.currentState,
      index: ind,
      id:i.id
    };
    this.props.taskStatusUpdate(data)
  }

  sortTable = () => {

  }

  sortByColumn = (a, colIndex, reverse) => {
    let col = (colIndex == 'Summary' && 'summary')
      || (colIndex == 'Priority' && 'priority')
      || (colIndex == 'Created On' && 'createdAt')
      || (colIndex == 'Due Date' && 'dueDate');

    let sortFunction = (a, b) => {
      if (a[col] === b[col]) {
        return 0;
      } else {
        return (a[col] < b[col]) ? -1 : 1;
      }
    }
    if (reverse == true) {
      a.sort(sortFunction).reverse();
    } else {
      a.sort(sortFunction);
    }
    return a;
  }

  handleClick = (title, key) => {
    if (this.state.activeColumn === key) {
      let toggle = !this.state.toggle
      this.setState({
        toggle: toggle,
        activeColumn: key,
      })
      this.sortByColumn(this.props.todo, title, toggle)
      this.sortByColumn(this.props.searchedItem, title, toggle)
    } else {
      this.setState({
        activeColumn: key,
      })
      this.sortByColumn(this.props.todo, title, true)
      this.sortByColumn(this.props.searchedItem, title, true)
    }
  }

  // componentDidMount() {
  //   const objData = this.props.groupBy && Object.values(this.props.groupBy), newarr = []
  //   objData && objData.map(item => { return item.map(i => { return newarr.push(i) }) })
  //   this.setState({ groupByValues: newarr })
  // }

  render() {
    let tableHeader = ['Summary', 'Priority', 'Created On', 'Due Date', 'Actions']
    let dashboardContent =
      (<table className='table'>
        <thead>
          <tr>
            {tableHeader.map((item, ind) => {
              return (
                <th key={ind} onClick={item!="Actions" ? (() => this.props.sortColumn(item)):undefined} style={{cursor:item!="Actions"&&'pointer'}}>{item}
                  {(this.props.sortBy === item) ? (this.props.sortOrder=="DESC") ? " ↓" : " ↑" : ""}
                </th>
              )
            })}
          </tr>
        </thead>

        {!this.props.searchedTerm.length && this.props.groupBy && Object.entries(this.props.groupBy).map(([key, value], ind) => {
          return (
            <tbody key={ind}>
              <tr key={ind}>{tableHeader.map((item, ind) => {
                return (
                  <td key={ind}>
                    {item == 'Summary' && key}
                  </td>
                )
              })}</tr>
              {value.map((i, index) => {
                return (
                  <tr key={index} onClick={() => this.showViewModal(i)} style={{ background: i.currentState && 'green' }}>
                    {tableHeader.map((header, ind) => {
                      return (
                        <td key={ind}>
                          {i[header == 'Summary' && 'summary']}
                          {i[header == 'Priority' && 'priority']}
                          {i[header == 'Created On' && 'createdAt']}
                          {i[header == 'Due Date' && 'dueDate']}
                          {header == 'Actions' &&
                            (<span><i className="fa fa-edit" onClick={(event) => this.showEditModal(event, i, index)}></i>
                              <span style={{ padding: '2px' }}></span>
                              <i className="fa fa-trash" onClick={(event) => this.showDeleteModal(event, i, index)}></i>
                              <span style={{ padding: '2px' }}></span>
                              {i.currentState
                                ? <i className="fa fa-times" onClick={(event) => this.handleTaskState(event, i, index)} /> :
                                <i className="fa fa-check" onClick={(event) => this.handleTaskState(event, i, index)} />}
                            </span>)}
                        </td>
                      )
                    })}</tr>
                )
              })}</tbody>)
        }
        )}

        {!Object.keys(this.props.groupBy).length && !this.props.searchedTerm.length && !this.props.searchedItem.length && this.props.todo && this.props.todo.map((i, index) => {
          return (
            <tbody key={index}>
              <tr key={index} onClick={() => this.showViewModal(i)} style={{ background: i.currentState && 'green' }}>
                {tableHeader.map((header, ind) => {
                  return (
                    <td key={ind}>
                      {i[header == 'Summary' && 'summary']}
                      {i[header == 'Priority' && 'priority']}
                      {i[header == 'Created On' && 'createdAt']}
                      {i[header == 'Due Date' && 'dueDate']}
                      {header == 'Actions' &&
                        (<span><i className="fa fa-edit" onClick={(event) => this.showEditModal(event, i, index)}></i>
                          <span style={{ padding: '2px' }}></span>
                          <i className="fa fa-trash" onClick={(event) => this.showDeleteModal(event, i, index)}></i>
                          <span style={{ padding: '2px' }}></span>
                          {i.currentState
                            ? <i className="fa fa-times" onClick={(event) => this.handleTaskState(event, i, index)} /> :
                            <i className="fa fa-check" onClick={(event) => this.handleTaskState(event, i, index)} />}
                        </span>)}
                    </td>
                  )
                })}
              </tr>
            </tbody>
          )
        })}

        {this.props.searchedItem && this.props.searchedItem.map((i, index) => {
          return (
            <tbody key={index}>
              <tr key={index} onClick={() => this.showViewModal(i)} style={{ background: i.currentState && 'green' }}>
                {tableHeader.map((header, ind) => {
                  return (
                    <td key={ind}>
                      {i[header == 'Summary' && 'summary']}
                      {i[header == 'Priority' && 'priority']}
                      {i[header == 'Created On' && 'createdAt']}
                      {i[header == 'Due Date' && 'dueDate']}
                      {header == 'Actions' &&
                        (<span><i className="fa fa-edit" onClick={(event) => this.showEditModal(event, i, index)}></i>
                          <span style={{ padding: '2px' }}></span>
                          <i className="fa fa-trash" onClick={(event) => this.showDeleteModal(event, i, index)}></i>
                          <span style={{ padding: '2px' }}></span>
                          {i.currentState
                            ? <i className="fa fa-times" onClick={(event) => this.handleTaskState(event, i, index)} /> :
                            <i className="fa fa-check" onClick={(event) => this.handleTaskState(event, i, index)} />}
                        </span>)}
                    </td>
                  )
                })}
              </tr>
            </tbody>
          )
        })}

      </table>)


    return (
      <div className='dashboard'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              {dashboardContent}
            </div>
          </div>
          {this.state.visibleView &&
            <ViewTask
              visible={this.state.visibleView}
              hide={this.hideModal}
              summary={this.state.summary}
              description={this.state.description}
              currentState={this.state.currentState}
              priority={this.state.priority}
              dueDate={this.state.dueDate}
              createdAt={this.state.createdAt}
            />}

          {this.state.visibleEdit &&
            <EditTask
              visible={this.state.visibleEdit}
              hide={this.hideModal}
              summary={this.state.summary}
              description={this.state.description}
              priority={this.state.priority}
              dueDate={this.state.dueDate}
              createdAt={this.state.createdAt}
              index={this.state.index}
              taskId={this.state.taskId}
            />}
          {this.state.visibleDelete &&
            <DeleteTask
              visible={this.state.visibleDelete}
              hide={this.hideModal}
              summary={this.state.summary}
              index={this.state.index}
              taskId={this.state.taskId}
            />}
        </div>
      </div>
    )
  }
}

export default connect(null, { taskStatusUpdate, sortColumn })(Container);
