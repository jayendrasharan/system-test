import {ADD_TASK, OPEN_TASK, SHOW_COMPLETED, SHOW_PENDING} from '../actions/taskTypes'

const tasks = (state = [], action) => {
    switch (action.type) {
      case ADD_TASK:
        return {
          ...state,
            taskid: action.taskid,
            text: action.text,
            isCompleted: false
          }
      case OPEN_TASK:
        return (       
               "Open Task"
              //action.taskid
          )
      case SHOW_COMPLETED:
        return (
            "Completed Task"
            //action.taskids.filter(task => (task.isCompleted === true))
            )
      case SHOW_PENDING:
              return (
                  action.taskids.filter(task =>
                    (task.isCompleted === false))
                  )
      default: return state
    }
  }
  
  export default tasks