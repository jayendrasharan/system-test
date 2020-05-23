import React, { useState } from "react"
import TableHeading from "./table-heading/table-heading"
import AddTask from "./add-task/add-task"
import "./App.scss"
import Tabs from "./tabs/tabs"
import { APP_DATA, TASK_TO_EDIT_OR_VIEW_OBJECT } from "./app-constants"
import ToDoContext from "./to-do-context"
import TableBody from "./table-body/table-body"
import ViewEditTask from "./view-edit-task/view-edit-task"

function App() {
  const { APP_TABS_LABELS, APP_TITLE, APP_TASK_STATES } = APP_DATA

  const [activeTab, setActiveTab] = useState("All")
  const [toDoList, setToDoList] = useState([])
  const [count, setCount] = useState(0)
  const [taskToEditOrView, setTaskToEditOrView] = useState(
    TASK_TO_EDIT_OR_VIEW_OBJECT
  )
  const [readOnly, setReadOnly] = useState(false)

  const addTaskToToDoList = (toDoTask) => {
    setToDoList([...toDoList, toDoTask])
    const { count } = toDoTask
    setCount(count)
  }

  const doneTaskMethod = (count) => {
    const toDoListToEdit = [...toDoList]
    let indexOfEditItem = 0
    const [toDoListToEditItem] = toDoListToEdit.filter((item, index) => {
      if (item.count === count) {
        indexOfEditItem = index
        return true
      }
      return false
    })
    toDoListToEditItem.currentState = APP_TASK_STATES.COMPLETED
    toDoListToEdit.splice(indexOfEditItem, 1, toDoListToEditItem)
    setToDoList(toDoListToEdit)
  }

  const undoTaskMethod = (count) => {
    const toDoListToEdit = [...toDoList]
    let indexOfEditItem = 0
    const [toDoListToEditItem] = toDoListToEdit.filter((item, index) => {
      if (item.count === count) {
        indexOfEditItem = index
        return true
      }
      return false
    })
    toDoListToEditItem.currentState = APP_TASK_STATES.PENDING
    toDoListToEdit.splice(indexOfEditItem, 1, toDoListToEditItem)
    setToDoList(toDoListToEdit)
  }

  const deleteTaskMethod = (count) => {
    const toDoListToEdit = [...toDoList]
    const toDoListToEditRestItems = toDoListToEdit.filter(
      (item) => item.count !== count
    )
    setToDoList([...toDoListToEditRestItems])
  }

  const editTaskMethod = (count) => {
    const toDoListToEdit = [...toDoList]
    const taskTOEdit = toDoListToEdit.filter((item) => item.count === count)
    setTaskToEditOrView(taskTOEdit)
    setReadOnly(false)
  }

  const onClickTab = (tab) => {
    setActiveTab(tab)
  }

  const sortTable = (valueToSort) => {
    let sortedToDoList = [...toDoList]
    sortedToDoList = sortedToDoList.sort((taskToDo1, taskToDo2) => {
      if (taskToDo1[valueToSort] > taskToDo2[valueToSort]) return 1
      if (taskToDo1[valueToSort] < taskToDo2[valueToSort]) return -1
      return 0
    })
    setToDoList(sortedToDoList)
  }

  return (
    <div className="App">
      <header>
        <h1>{APP_TITLE}</h1>
        <nav>
          <Tabs
            activeTab={activeTab}
            setActiveTab={onClickTab}
            tabs={APP_TABS_LABELS}
          />
        </nav>
      </header>
      <table>
        <thead>
          <TableHeading sortTable={sortTable} />
        </thead>
        <tbody>
          <TableBody
            toDoList={toDoList}
            doneTaskMethod={doneTaskMethod}
            undoTaskMethod={undoTaskMethod}
            deleteTaskMethod={deleteTaskMethod}
            editTaskMethod={editTaskMethod}
            activeTab={activeTab}
          />
        </tbody>
      </table>
      <ToDoContext.Provider
        value={{ addTaskToToDoList, setTaskToEditOrView, count }}
      >
        <AddTask />
        {/*taskTOEdit && (
          <ViewEditTask
            initialModalState="modal-open"
            setTaskToEditOrView={setTaskToEditOrView}
            taskToEditOrView={taskToEditOrView}
            readOnly={readOnly}
          />
        )*/}
      </ToDoContext.Provider>
    </div>
  )
}

export default App
