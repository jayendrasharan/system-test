import React from "react"
import "./table-body.scss"
import Icon from "../icon/icon"
import { AVAILABLE_ICONS_CLASS } from "../icon/icon-constants"
import { APP_DATA } from "../app-constants"

function TableBody(props) {
  const {
    toDoList,
    doneTaskMethod,
    undoTaskMethod,
    deleteTaskMethod,
    editTaskMethod,
    activeTab,
  } = props
  const { APP_TASK_STATES } = APP_DATA

  const openModal = (count) => {
    console.log("OPEN MODAL", count)
  }
  const editTask = (count) => {
    editTaskMethod(count)
  }

  const deleteTask = (count) => {
    deleteTaskMethod(count)
  }

  const doneTask = (count) => {
    doneTaskMethod(count)
  }

  const undoTask = (count) => {
    undoTaskMethod(count)
  }

  const toDoListToDisplay =
    activeTab.toLowerCase() === "all"
      ? toDoList
      : toDoList.filter(
          (toDoTask) => toDoTask.currentState === activeTab.toLowerCase()
        )
  const tableBody = toDoListToDisplay.map((toDoListItem) => {
    return (
      <tr
        key={toDoListItem.count}
        onClick={() => openModal(toDoListItem.count)}
        className={`${
          toDoListItem.currentState === APP_TASK_STATES.PENDING
            ? ""
            : "task-completed"
        }`}
      >
        <td>{toDoListItem.title}</td>
        <td>{toDoListItem.priority.slice(1)}</td>
        <td>{toDoListItem.createdDate}</td>
        <td>{toDoListItem.dueDate}</td>
        <td>
          <button
            onClick={(e) => {
              editTask(toDoListItem.count)
              e.stopPropagation()
            }}
          >
            <Icon className={AVAILABLE_ICONS_CLASS.EDIT_ICON} fontSize="14px" />
          </button>
          <button
            onClick={(e) => {
              deleteTask(toDoListItem.count)
              e.stopPropagation()
            }}
          >
            <Icon className={AVAILABLE_ICONS_CLASS.DELETE_ICON} fontSize="14px" />
          </button>
          {toDoListItem.currentState === APP_TASK_STATES.PENDING ? (
            <button
              onClick={(e) => {
                doneTask(toDoListItem.count)
                e.stopPropagation()
              }}
            >
              <Icon className={AVAILABLE_ICONS_CLASS.DONE_ICON} fontSize="14px" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                undoTask(toDoListItem.count)
                e.stopPropagation()
              }}
            >
              <Icon className={AVAILABLE_ICONS_CLASS.UNDO_ICON} fontSize="14px" />
            </button>
          )}
        </td>
      </tr>
    )
  })
  return <>{tableBody}</>
}

export default TableBody
