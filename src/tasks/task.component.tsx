import React from 'react'
import { connect } from 'react-redux'

import { Button } from '../components/button'
import { Footer } from '../components/footer'
import { Form } from '../components/form'
import { Header } from '../components/header'
import { Loader } from '../components/loader'
import { Modal } from '../components/modal'
import { Table } from '../components/table'

import { taskStyles } from './styles'
import { clearTask, deleteTask, getSortedTasks, getTasks, init, saveTasks, viewEditTasks } from './task.action'

class Tasks extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state = {
      showModal: false
    }
    this.init()
  }

  // Populates Intial Data to Redux Store
  init = () => {
    this.props.init()
  }

  // Filter based on status of the task
  updateTable = async (status: string) => {
    await this.props.getTasks(status)
  }

  // Sort by Table Column
  handleSort = async (id: string) => {
    const sortPriority = {
      high: 3,
      medium: 2,
      low: 1,
      none: 0
    }
    if (id === 'title' || id === 'createdAt' || id === 'dueDate') {
      await this.props.getSortedTasks(id, {})
    } else {
      await this.props.getSortedTasks(id, sortPriority)
    }
  }

  handleModal = async (mode?: string, id?: any) => {
    if (mode && mode === 'cancel' && this.props.tasks.currentTask) {
      await this.props.clearTask()
    } else if (mode && id && mode === 'view' || mode === 'edit') {
      await this.props.viewEditTasks(mode, id)
    }
    this.setState({
      showModal: !this.state.showModal
    })
  }

  handleSave = (task: any, statusUpdate?: boolean) => {
    const { status } = this.props.tasks
    this.props.saveTasks(task, status)
    if (!statusUpdate) {
      this.setState({
        showModal: !this.state.showModal
      })
    }
  }

  handleDelete = async (mode: any, id: any) => {
    await this.props.deleteTask(mode, id)
  }

  // To populate actions for each row
  getActions = () => {
    return [
      {
        class: 'fa fa-pencil-square-o',
        handler: this.handleModal,
        name: 'edit'
      },
      {
        class: 'fa fa-trash',
        handler: this.handleDelete,
        name: 'delete'
      },
      {
        class: 'fa fa-eye',
        handler: this.handleModal,
        name: 'view'
      },
      {
        class: (pending: boolean) => pending ? 'fa fa-check' : 'fa fa-repeat',
        handler: this.handleSave,
        name: (pending: boolean) => pending ? 'complete' : 'reopen'
      }
    ]
  }

  render() {
    const { showModal } = this.state
    const { data, currentTask, mode, status, loading } = this.props.tasks
    return <React.Fragment>
      <Header />
      <div {...taskStyles}>
        <div className='tabs'>
          <Button id={'all'} name={'All'} onClick={() => this.updateTable('all')} selected={status === 'all'}/>
          <Button id={'pending'} name={'Pending'} onClick={() => this.updateTable('pending')} selected={status === 'pending'}/>
          <Button id={'completed'} name={'Completed'} onClick={() => this.updateTable('completed')} selected={status === 'completed'}/>
        </div>
        <div className='dataList'>
        {loading ? <Loader /> : <React.Fragment />}
          <Table data={data} onSortChange={this.handleSort} actions={this.getActions()} />
        </div>
        <div className='add'><i className='fa fa-plus' title={'Add Task'} onClick={() => this.handleModal('add')} aria-hidden='true' /></div>
      </div>
      <Footer />
      {showModal ? <Modal onClose={this.handleModal}><Form task={currentTask} handleModalClose={this.handleModal} mode={mode} onSave={this.handleSave} /></Modal> : <React.Fragment />}
    </React.Fragment>
  }
}

const mapStateToProps = (state: any) => {
  return {
    tasks: state.tasks
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    init: () => {
      return dispatch(init())
    },
    getTasks: (status: string) => {
      return dispatch(getTasks(status))
    },
    getSortedTasks: (id: string, sortPriority: any) => {
      return dispatch(getSortedTasks(id, sortPriority))
    },
    viewEditTasks: (mode: string, id: any) => {
      return dispatch(viewEditTasks(mode, id))
    },
    saveTasks: (task: any, status?: string) => {
      return dispatch(saveTasks(task, status))
    },
    clearTask: () => {
      return dispatch(clearTask())
    },
    deleteTask: (mode: any, id: any) => {
      return dispatch(deleteTask(mode, id))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks);
