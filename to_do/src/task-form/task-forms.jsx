import React, { useState, useContext } from "react"
import { FORM_CONSTANTS } from "./task-form-constants"
import ToDoContext from "../to-do-context"
import "./task-form.scss"
import { APP_DATA, TASK_TO_EDIT_OR_VIEW_OBJECT } from "../app-constants"

function TaskForm(props) {
  const { FORM_LABELS, FORM_PRIORITY_DROPDOWN_LABELS } = FORM_CONSTANTS
  const { APP_TASK_STATES } = APP_DATA
  const { readOnly, taskToEditOrView } = props
  const {
    title: summaryOfTask,
    description: descriptionOfTask,
    dueDate: dueDateOfTask,
    priority: priorityOfTask,
  } = taskToEditOrView ? taskToEditOrView : TASK_TO_EDIT_OR_VIEW_OBJECT

  const [summary, setSummary] = useState(() => {
    return summaryOfTask ? summaryOfTask : ""
  })
  const [description, setDescription] = useState(() => {
    return descriptionOfTask ? descriptionOfTask : ""
  })
  const [priority, setPriority] = useState(() => {
    return dueDateOfTask ? dueDateOfTask : ""
  })
  const [dueDate, setDueDate] = useState(() => {
    return priorityOfTask ? priorityOfTask : ""
  })
  const [error, setError] = useState({
    summaryError: "",
    descriptionError: "",
    priorityError: "",
  })

  const { addTaskToToDoList, count } = useContext(ToDoContext)

  const priorityOptions = FORM_PRIORITY_DROPDOWN_LABELS.map(
    (priorityOption, index) => {
      return (
        <option value={priorityOption.toLowerCase()} key={index}>
          {priorityOption.slice(1)}
        </option>
      )
    }
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    let formError = { ...error }
    summary.length < 10 || summary.length > 150
      ? (formError.summaryError = "error")
      : (formError.summaryError = "")
    description.length < 10 || description.length > 500
      ? (formError.descriptionError = "error")
      : (formError.descriptionError = "")
    !priority.length
      ? (formError.priorityError = "error")
      : (formError.priorityError = "")
    setError(formError)
    if (Object.values(formError).every((error) => !error.length)) {
      const date = new Date()
      const task = {
        currentState: APP_TASK_STATES.PENDING,
        title: summary,
        description: description,
        dueDate: dueDate,
        createdDate: `${date.getUTCFullYear()}-${
          date.getUTCMonth() + 1
        }-${date.getUTCDate()}`,
        priority: priority,
        count: parseInt(count) + 1,
      }
      addTaskToToDoList(task)
      clearFormValues()
    }
  }

  const clearFormValues = () => {
    setSummary("")
    setDescription("")
    setPriority("")
    setDueDate("")
    setError({
      summaryError: "",
      descriptionError: "",
      priorityError: "",
    })
  }

  return (
    <form className="add-task-form" onSubmit={(e) => e.preventDefault()}>
      <span>*Required Fields</span>
      <div className="field">
        <label htmlFor="summary">{FORM_LABELS.SUMMARY_LABEL}* :</label>
        <input
          type="text"
          className={error.summaryError}
          id="summary"
          onChange={(e) => setSummary(e.target.value)}
          value={summary}
          readOnly={readOnly}
        />
      </div>

      <div className="field">
        <label htmlFor="description">{FORM_LABELS.DESCRIPTION_LABEL}* :</label>
        <textarea
          className={error.descriptionError}
          id="description"
          onChange={(e) => {
            setDescription(e.target.value)
          }}
          value={description}
          readOnly={readOnly}
        />
      </div>

      <div className="field">
        <label htmlFor="priority">{FORM_LABELS.PRIORITY_LABEL}* :</label>
        <select
          className={error.priorityError}
          id="priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          readOnly={readOnly}
        >
          <option value="" disabled>
            none
          </option>
          {priorityOptions}
        </select>
      </div>

      <div className="field">
        <label htmlFor="date-picker">{FORM_LABELS.DUE_DATE_LABEL} :</label>
        <input
          type="date"
          id="date-picker"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          readOnly={readOnly}
        />
      </div>
      {!readOnly && (
        <>
          <button onClick={clearFormValues}>Cancel</button>
          <button type="submit" onClick={handleSubmit}>
            Save Task
          </button>
        </>
      )}
    </form>
  )
}

export default TaskForm
