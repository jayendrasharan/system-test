const filterHandler = (prop, asc) => (i1 = {}, i2 = {}) => {
  if (i1[prop] > i2[prop]) {
    return asc ? 1 : -1;
  } else if (i1[prop] < i2[prop]) {
    return asc ? -1 : 1;
  } else {
    return 0;
  }
};

const formatDate = (dateStr) => {
  let date = new Date(dateStr);
  let getFormatedNum = (num) => {
    return num < 10 ? "0" + num : num;
  };
  return (
    date.getFullYear() +
    "-" +
    getFormatedNum(date.getMonth() + 1) +
    "-" +
    getFormatedNum(date.getDate())
  );
};

export { filterHandler, formatDate };
