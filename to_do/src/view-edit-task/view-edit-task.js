import React, { useState } from "react"
import "./view-edit-task.scss"
import Modal from "../modal/modal"
import TaskForm from "../task-form/task-forms"

function ViewEditTask(props) {
  const {
    taskToEditOrView,
    readOnly,
    initialModalState,
    setTaskToEditOrView,
  } = props
  const [modalState, setModalState] = useState(initialModalState)
  if (modalState === "modal-close") {
    setTaskToEditOrView({})
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
