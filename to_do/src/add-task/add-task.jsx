import React, { useState } from "react"
import Icon from "../icon/icon"
import { AVAILABLE_ICONS_CLASS } from "../icon/icon-constants"
import "./add-task.scss"
import Modal from "../modal/modal"
import TaskForm from "../task-form/task-forms"
import { TASK_TO_EDIT_OR_VIEW_OBJECT } from "../app-constants"

function AddTask(props) {
  const { ADD_ICON } = AVAILABLE_ICONS_CLASS

  const [modalState, setModalState] = useState("modal-close")
  return (
    <div className="add-task-container">
      <button
        className="add-task-button"
        id="add-task-button"
        onClick={() => setModalState("modal-open")}
      >
        <Icon className={ADD_ICON} fontSize="24px" />
      </button>
      {
        <Modal modalState={modalState} setModalState={setModalState}>
          <TaskForm readOnly={false} taskToEditOrViewtask={TASK_TO_EDIT_OR_VIEW_OBJECT} />
        </Modal>
      }
    </div>
  )
}

export default AddTask
