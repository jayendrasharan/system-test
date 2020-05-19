/* eslint-disable no-fallthrough */
const todos = (state = [
  {
    "title": "Sample todo 1",
    "description": "should be completed within due date",
    "priority": "2",
    "createdAt": new Date().getTime() - 115534598,
    "dueDate": new Date().getTime() + 553459854,
    id: "121212",
    completed: false
  },
  {
    "title": "Sample todo 2",
    "description": "should be completed within due date",
    "priority": "1",
    "createdAt": new Date().getTime() - 55345985,
    "dueDate": new Date().getTime() + 5534598543,
    id: "856754232",
    completed: true
  }
], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      if (state.some(todo => todo.id === action.text.id)) {
        let todos = state.map(e => {
          if(e.id === action.text.id) {
            return {...e, ...action.text}
          }
          return e;
        });
        return [...todos];
      } else {
        return [
          ...state,
          {
            ...action.text,
            completed: false
          }
        ]
      }
    case 'MARK_AS_COMPLETED': 
      return [...state.map(e => {
          if (e.id !== action.id) {
            return e;
          } else {
            return {...e, ...{completed: true}};
          }
        })];
    case 'MARK_AS_NOTCOMPLETED':
      return [...state.map(e => {
        if (e.id !== action.id) {
          return e;
        } else {
          return {...e, ...{completed: false}};
        }
      })];
    case 'DELETE_TODO':
       return [...state.filter(e =>e.id !== action.id)];
      // let todos = state.map(e => {
      //   if (e.id !== action.id) {
      //     return e;
      //   } else {
      //     return {...e, ...{completed: true}};
      //   }
      // });
      // return [...todos];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    default:
      return state
  }
}

export default todos
