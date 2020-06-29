import React from "react";
import { useSelector } from "react-redux";
import sortHelper from "./sortHelper";

const groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const useFilter = (type) => {
  let list = useSelector(({ root }) => root.tasks);
  const searchResult = useSelector(({ root }) => root.searchResult);
  const groupByKey = useSelector(({ root }) => root[type].groupBy);
  const sortByKey = useSelector(({ root }) => root[type].sortBy);
  const sortByOrder = useSelector(({ root }) => root[type].sortOrder);

  list = React.useMemo(() => sortHelper(list, sortByKey, sortByOrder), [
    list,
    sortByKey,
    sortByOrder,
  ]);

  if (type === "pendingTab") {
    list = list.filter((item) => item.currentState);
  }

  if (type === "completedTab") {
    list = list.filter((item) => !item.currentState);
  }

  let groupByList = null;
  if (groupByKey !== null) {
    groupByList = groupBy(list, groupByKey);
  }

  return [list, searchResult, groupByList, groupByKey];
};

export default useFilter;
