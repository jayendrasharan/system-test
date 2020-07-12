const initialState =  {
    tasks: JSON.parse(window.localStorage.getItem('tasks')) || [],
    sortedBy: '',
    sort: ''
}
const sortColumnBy = (field, toDoSort, a , b) => {
    let x = a[field];
    let y = b[field];
    const columnType = typeof (x);
    const factor = toDoSort ? 1 : -1;
    let delta;
    switch (columnType) {
      case 'string':
        x = x.toLowerCase();
        y = y.toLowerCase();
        const minLength = Math.min(x.length, y.length);
        let i = -1;
        do {
          i++;
          if ((i === (minLength - 1)) && (x[i] === y[i])) {
            delta = (x < y) ? 1 : -1;
          } else {
            delta = (x[i] < y[i]) ? 1 : -1;
          }
        }while (x[i] === y[i] && i < minLength);
        break;
      default:
        delta = (x < y) ? 1 : -1;
    }
    return factor * delta;
}
const tasksState = (state = initialState, action) =>{
    switch (action.type) {
        case 'ADD_TASK':
            state.tasks.unshift(action.task)
        break;
        case 'DELETE_TASK':
            state.tasks = state.tasks.filter((each)=> each.id !== action.id)
        break;
        case 'SORT_TASK':
            state.sortedBy = action.field;
            state.sort = action.sort;
            state.tasks = [...state.tasks].sort(sortColumnBy.bind(this, action.field, action.sort))
        break;
        case 'UPDATE_TASK':
            state.tasks = state.tasks.map((eachItem)=>{
                if(eachItem.id === action.id){
                    return action.task
                }
                return eachItem;
            })
        break;
        case 'COMPLETE_TASK':
            state.tasks = state.tasks.map((eachItem)=>{
                if(eachItem.id === action.id){
                    eachItem.status = 'COMPLETED'
                }
                return eachItem;
            })
        break;
        case 'REOPEN_TASK':
            state.tasks = state.tasks.map((eachItem)=>{
                if(eachItem.id === action.id){
                    eachItem.status = 'PENDING'
                }
                return eachItem;
            })
        break;
    }
    window.localStorage.setItem('tasks', JSON.stringify([...state.tasks]))
    return {...state};
}

export default tasksState;