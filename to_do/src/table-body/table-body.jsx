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
    editOrViewTaskMethod,
    activeTab,
    searchValue,
  } = props
  const { APP_TASK_STATES } = APP_DATA

  const openModal = (count) => {
    editOrViewTaskMethod(count)
  }
  const editTask = (count) => {
    editOrViewTaskMethod(count, "readOnly")
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

  const filteredToDoListBasedOnSearchValue = searchValue.length
    ? toDoListToDisplay.filter((toDoList) => {
      let searchValueRegex = new RegExp(searchValue.toLowerCase())
      return searchValueRegex.test(toDoList.title.toLowerCase())
    })
    : toDoListToDisplay

  const tableBody = filteredToDoListBasedOnSearchValue.map((toDoListItem) => {
    return (
      <tr
        key={toDoListItem.count}
        onClick={(e) => {
          openModal(toDoListItem.count)
          e.stopPropagation();
        }}
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
