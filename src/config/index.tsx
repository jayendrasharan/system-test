import { ConfigType } from '../react-app-env';

const config: ConfigType[] = [
  {
    name: 'currentState',
    allowSearch: false,
    allowGroupBy: false,
    allowSortBy: true
  },
  {
    name: 'title',
    allowSearch: true,
    allowGroupBy: false,
    allowSortBy: true
  },
  {
    name: 'description',
    allowSearch: true,
    allowGroupBy: false,
    allowSortBy: false
  },
  {
    name: 'createdAt',
    allowSearch: false,
    allowGroupBy: true,
    allowSortBy: true
  },
  {
    name: 'dueDate',
    allowSearch: false,
    allowGroupBy: true,
    allowSortBy: true
  },
  {
    name: 'priority',
    allowSearch: false,
    allowGroupBy: true,
    allowSortBy: true
  }
]

export default config;