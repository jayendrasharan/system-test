import React, { useState } from "react"
import "./view-edit-task.scss"
import Modal from "../modal/modal"
import TaskForm from "../task-form/task-forms"
import { TASK_TO_EDIT_OR_VIEW_OBJECT } from "../app-constants"

function ViewEditTask(props) {
  const {
    taskToEditOrView,
    readOnly,
    initialModalState,
    setTaskToEditOrView,
  } = props

  const [modalState, setModalState] = useState(initialModalState)
  if (modalState === "modal-close") {
    setTaskToEditOrView(TASK_TO_EDIT_OR_VIEW_OBJECT);
  }
  
  return (
    <div className="view-edit-task">
      <Modal modalState={modalState} setModalState={setModalState}>
        <TaskForm readOnly={readOnly} taskToEditOrView={taskToEditOrView} />
      </Modal>
    </div>
  )
}

export default ViewEditTask
