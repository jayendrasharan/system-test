import { filterHandler } from "../../utils/utils";

export const sortDataByColumn = (data, column) => {
  if (column) {
    return data.sort(filterHandler(column.key, !column.asc));
  }
  return data;
};
