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
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = new Date(dateStr);
  return (
    months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
  );
};

export { filterHandler, formatDate };
