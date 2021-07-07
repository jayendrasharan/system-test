export const INIT_ADD_TODO = 'INIT_ADD_TODO';
export const INIT_REMOVE_TODO = 'INIT_REMOVE_TODO';
export const INIT_EDIT_TODO = 'INIT_EDIT_TODO';
export const INIT_GROUP_BY = 'INIT_GROUP_BY';
export const INIT_SORT_BY = 'INIT_SORT_BY';
export const INIT_SEARCH_BY = 'INIT_SEARCH_BY';
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const GROUP_BY = 'GROUP_BY';
export const SORT_BY = 'SORT_BY';
export const SEARCH_BY = 'SEARCH_BY';
export const SWITCH_STATUS = 'SWITCH_STATUS';

export const initAddTodo = payload => ({ type: INIT_ADD_TODO, payload });

export const addTodo = payload => ({ type: ADD_TODO, payload });

export const initRemoveTodo = payload => ({ type: INIT_REMOVE_TODO, payload });

export const removeTodo = payload => ({ type: REMOVE_TODO, payload });

export const initEditTodo = payload => ({ type: INIT_EDIT_TODO, payload });

export const editTodo = payload => ({ type: EDIT_TODO, payload });

export const initGroupBy = payload => ({ type: INIT_GROUP_BY, payload });

export const groupBy = payload => ({ type: GROUP_BY, payload });

export const initSortBy = payload => ({ type: INIT_SORT_BY, payload });

export const sortBy = payload => ({ type: SORT_BY, payload });

export const initSearchBy = payload => ({ type: INIT_SEARCH_BY, payload });

export const searchBy = payload => ({ type: SEARCH_BY, payload });

export const switchStatus = payload => ({ type: SWITCH_STATUS, payload });
