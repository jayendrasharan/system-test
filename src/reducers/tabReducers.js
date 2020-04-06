import { SHOW_ALLTASKS, SHOW_COMPLETED, SHOW_PENDING} from '../actions/taskTypes'

const tabReducers = (state = {}, action) => {
  switch (action.type) {
    case SHOW_ALLTASKS:
      return {taskids: action.taskids}
      
    case SHOW_COMPLETED:
      return {
        taskids: 
          action.taskids.filter(task =>
            (task.isCompleted === true))
          }
    case SHOW_PENDING:
            return {
              taskids: action.taskids.filter(task =>
                  (task.isCompleted === false))
                }
  default:
      return state
  }
}

export default tabReducers