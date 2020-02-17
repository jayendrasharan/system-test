const GetSortOrder = (prop, direction) => {
  return function(a, b) {
    if (direction === 'asc') {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
    } else {
      if (a[prop] > b[prop]) {
        return -1;
      } else if (a[prop] < b[prop]) {
        return 1;
      }
    }
    return 0;
  };
};

export default function(state, action) {
  switch (action.type) {
    case 'getSelectedTabTasks': {
      const selectedTab = action.payload;
      const allTasks = state.allTasks;
      let selectedTabTasks = [];
      if (selectedTab === 'allTasks') {
        selectedTabTasks = allTasks;
      } else if (allTasks) {
        allTasks.forEach(task => {
          if (task.status === selectedTab) {
            selectedTabTasks.push(task);
          }
        });
      }
      return { ...state, selectedTabTasks };
    }
    case 'addTask': {
      const { task, selectedTab } = action.payload;
      let allTasks = [...state.allTasks];
      allTasks.push(task);
      let selectedTabTasks = [...state.selectedTabTasks];
      if (selectedTab === 'allTasks') {
        selectedTabTasks = allTasks;
      } else if (selectedTab === task.status) {
        selectedTabTasks.push(task);
      }
      return { ...state, allTasks, selectedTabTasks };
    }
    case 'editTask': {
      const { task, selectedTab } = action.payload;
      let allTasks = [...state.allTasks];
      let selectedTabTasks = [...state.selectedTabTasks];
      allTasks = allTasks.map(data => {
        if (data.id === task.id) {
          return task;
        }
        return data;
      });
      let taskIndex = -1;
      selectedTabTasks = selectedTabTasks.map((data, index) => {
        if (data.id === task.id) {
          taskIndex = index;
          return task;
        }
        return data;
      });
      if (selectedTab !== 'allTasks') {
        if (
          taskIndex > -1 &&
          selectedTab !== selectedTabTasks[taskIndex].status
        ) {
          selectedTabTasks.splice(taskIndex, 1);
        }
      }
      return { ...state, allTasks, selectedTabTasks };
    }
    case 'deleteTask': {
      const { task } = action.payload;
      let allTasks = [...state.allTasks];
      let selectedTabTasks = [...state.selectedTabTasks];
      allTasks.forEach((data, index) => {
        if (data.id === task.id) {
          allTasks.splice(index, 1);
        }
      });
      selectedTabTasks.forEach((data, index) => {
        if (data.id === task.id) {
          selectedTabTasks.splice(index, 1);
        }
      });
      return { ...state, allTasks, selectedTabTasks };
    }
    case 'changeTaskStatus': {
      const { task, selectedTab, status } = action.payload;
      let allTasks = [...state.allTasks];
      let selectedTabTasks = [...state.selectedTabTasks];
      allTasks.forEach((data, index) => {
        if (data.id === task.id) {
          allTasks[index].status = status;
        }
      });
      if (selectedTab !== 'allTasks' && selectedTab !== status) {
        selectedTabTasks.forEach((data, index) => {
          if (data.id === task.id) {
            selectedTabTasks.splice(index, 1);
          }
        });
      }
      return { ...state, selectedTabTasks, allTasks };
    }
    case 'searchTasks': {
      const searchText = action.payload;
      let filteredData = [];
      const selectedTabTasks = [...state.selectedTabTasks];
      filteredData = selectedTabTasks.filter(task => {
        const summary = task.summary.toLowerCase();
        const value = summary.search(searchText.toLowerCase());
        if (value > -1) {
          return true;
        } else {
          return false;
        }
      });
      return { ...state, searchText, filteredData };
    }
    case 'sortTasks': {
      const { sortColumn, sortDirection } = action.payload;
      let selectedTabTasks = [...state.selectedTabTasks];
      let allTasks = [...state.allTasks];
      allTasks.sort(GetSortOrder(sortColumn, sortDirection));
      selectedTabTasks.sort(GetSortOrder(sortColumn, sortDirection));
      if (sortColumn === 'desc') {
        allTasks = allTasks.reverse();
        selectedTabTasks = selectedTabTasks.reverse();
      }
      return {
        ...state,
        sortColumn,
        sortDirection,
        selectedTabTasks,
        allTasks
      };
    }
    default: {
      return state;
    }
  }
}
