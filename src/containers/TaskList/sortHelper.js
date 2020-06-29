const useSort = (list, sortColumn, currentState) => {
  if (sortColumn === null) return list;
  let newList = [...list];
  newList.sort((a, b) =>
    currentState === "asc"
      ? a[sortColumn] > b[sortColumn]
        ? 1
        : -1
      : a[sortColumn] > b[sortColumn]
      ? -1
      : 1
  );
  return newList;
};

export default useSort;
