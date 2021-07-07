export const todosData = [
  {
    id: 1,
    checked: false,
    title: 'cat',
    description: 'this is first description',
    createdAt: new Date().getTime(),
    dueDate: new Date().getTime(),
    priority: { value: 'high', status: 3 }
  },
  {
    id: 2,
    checked: true,
    title: 'ele',
    description: 'this is second description 2',
    createdAt: new Date().getTime(),
    dueDate: new Date().getTime(),
    priority: { value: 'low', status: 1 }
  },
  {
    id: 3,
    checked: false,
    title: 'zeek',
    description: 'this is third description 3',
    createdAt: new Date().getTime(),
    dueDate: new Date().getTime(),
    priority: { value: 'medium', status: 2 }
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
