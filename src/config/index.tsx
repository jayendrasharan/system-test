import { ConfigType } from '../react-app-env';

const config: ConfigType[] = [
  {
    name: 'currentState',
    allowSearch: false,
    allowGroupBy: false,
    allowSortBy: true,
    id: 'currentState',
    label: 'Status'
  },
  {
    name: 'title',
    allowSearch: true,
    allowGroupBy: false,
    allowSortBy: true,
    id: 'title',
    label: 'Summary'
  },
  {
    name: 'description',
    allowSearch: true,
    allowGroupBy: false,
    allowSortBy: false,
    id: 'description',
    label: 'Description'
  },
  {
    name: 'createdAt',
    allowSearch: false,
    allowGroupBy: true,
    allowSortBy: true,
    id: 'createdAt',
    label: 'Created At'
  },
  {
    name: 'dueDate',
    allowSearch: false,
    allowGroupBy: true,
    allowSortBy: true,
    id: 'dueDate',
    label: 'Due On'
  },
  {
    name: 'priority',
    allowSearch: false,
    allowGroupBy: true,
    allowSortBy: true,
    id: 'priority',
    label: 'Priority'
  }
]

export default config;