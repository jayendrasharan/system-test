import { createContext } from 'react';
import columns from '../config/tableColumns';
import config from '../config';
import { TableProps } from '../react-app-env'

const TableContext = createContext<TableProps>({
  columns,
  config,
  data: [],
  id: 12,
  onEdit: () => {},
  onDelete: () => {},
  onStatusChange: () => {},
  onClickSort: () => {}
})

export const TableProvider = TableContext.Provider;

export default TableContext;