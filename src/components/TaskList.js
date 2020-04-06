import React from 'react'
import Task from './Task'

const TaskList = (tasks) => (
  tasks&&<table>
      {Object.keys(tasks)
        .map(task => <Task {...task} key={task.taskid}/>)
        }
  </table>
)

export default TaskList
