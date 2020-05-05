const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        {
          id: action.id,
          text: action.text,
          completed: false
        },
        ...state
      ];

    case 'EDIT_TODO':
      return [
        ...state,
      ];

    case 'UPDATE_TODO':
      return state.map((todo) => 
      (todo.id === action.id) ? {
          id: action.id,
          text: action.todo,
          completed: false
        }: todo
      );

    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id) ? { ...todo, completed: !todo.completed } : todo
      );

    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);

    case 'VIEW_TODO': 
        return state

    default:
      return state
  }
}

export default todos