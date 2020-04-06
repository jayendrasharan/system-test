import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import AddtaskModal from '../components/AddtaskModal'

const mapStateToProps = state => ({
  task: state.task
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddtaskModal)














/*
import React from 'react'
import { connect } from 'react-redux'
//import { addTask } from '../actions'
import Popup from "reactjs-popup";
import AddtaskModal from "../components/AddtaskModal";
const AddTask = ({ dispatch }) => {
  //let input
  return (
    
      <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTask(input.value))
        input.value = ''
      }}>
        <input ref={node => input = node} />
        
        <Popup modal trigger={<button className="myStyle" />}>
          {close => <AddtaskModal close={close} />}
        </Popup>
      </form>
    </div>
  )
}

export default connect()(AddTask)*/
