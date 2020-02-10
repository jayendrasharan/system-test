export function compareValues(key, order = "asc") {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
}

export const getFilteredList = (todos, filterBy) => {
  const { showAll, showPending, showCompleted } = filterBy;
  if (showAll) return todos;
  else if (showPending)
    return todos.filter(todo => todo.currentState === false);
  else if (showCompleted)
    return todos.filter(todo => todo.currentState === true);
};

export const prioritySort = (a, b) => {
  let t = {
    high: 4,
    medium: 3,
    low: 2,
    none: 1
  };
  return t[a.priority] > t[b.priority]
    ? 1
    : t[a.priority] === t[b.priority]
    ? 0
    : -1;
};

export const timeSortDueDate = (a, b) => {
  const t1 = new Date(a.dueDate);
  const t2 = new Date(b.dueDate);
  return t1.getTime() - t2.getTime();
};

export const timeSortCreatedOn = (a, b) => {
  const t1 = new Date(a.createdAt);
  const t2 = new Date(b.createdAt);
  return t1.getTime() - t2.getTime();
};

export const actionSort = (a, b) => {
  const t1 = Number(a.currentState);
  const t2 = Number(b.currentState);
  return t1 - t2;
};
