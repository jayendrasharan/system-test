export const todosData = [
  {
    id: 1,
    checked: true,
    title: '1',
    description: '1',
    createdAt: new Date().toLocaleString(),
    dueDate: new Date().toLocaleDateString(),
    priority: 'low'
  },
  {
    id: 2,
    checked: false,
    title: '2',
    description: '2',
    createdAt: new Date().toLocaleString(),
    dueDate: new Date().toLocaleDateString(),
    priority: 'high'
  },
  {
    id: 3,
    checked: false,
    title: '3',
    description: '3',
    createdAt: new Date().toLocaleString(),
    dueDate: new Date().toLocaleDateString(),
    priority: 'medium'
  }
];

export const sortValues = [
  'completed',
  'title',
  'createdAt',
  'dueDate',
  'priority'
];
export const searchValues = ['title', 'description'];
export const groupValues = ['createdAt', 'dueDate', 'priority'];
export const priorityValues = ['high', 'medium', 'low'];
