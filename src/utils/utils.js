const filterHandler = (prop, asc) => (i1 = {}, i2 = {}) => {
  if (i1[prop] > i2[prop]) {
    return asc ? 1 : -1;
  } else if (i1[prop] < i2[prop]) {
    return asc ? -1 : 1;
  } else {
    return 0;
  }
};

export { filterHandler };
