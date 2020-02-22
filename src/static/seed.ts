export const seeds = {
  headers: [
    { name: 'Summary', id: 'title', sortable: true },
    { name: 'Priority', id: 'priority', sortable: true },
    { name: 'Created On', id: 'createdAt', sortable: true },
    { name: 'Due Date', id: 'dueDate', sortable: true },
    { name: 'Actions', id: 'actions', sortable: false }
  ],
  body: [
    {
      id: 1,
      currentState: true,
      title: 'Task One',
      description: 'Word One has three digits',
      createdAt: 'Fri Feb 19 2020 14:10:15 GMT+0530 (India Standard Time)',
      dueDate: 'Sat Feb 22 2020 14:10:15 GMT+0530 (India Standard Time)',
      priority: 'Low'
    }, 
    {
      id: 2,
      currentState: true,
      title: 'Task Two',
      description: 'Word Two also has three digits',
      createdAt: 'Fri Feb 20 2020 14:18:00 GMT+0530 (India Standard Time)',
      dueDate: 'Sat Feb 22 2020 14:10:15 GMT+0530 (India Standard Time)',
      priority: 'Medium'
    }, 
    {
      id: 3,
      currentState: false,
      title: 'Task Three',
      description: 'Word Three has five digits',
      createdAt: 'Fri Feb 21 2020 14:10:15 GMT+0530 (India Standard Time)',
      dueDate: 'Sat Feb 22 2020 14:10:15 GMT+0530 (India Standard Time)',
      priority: 'None'
    }, 
    {
      id: 4,
      currentState: true,
      title: 'Task Six',
      description: 'Word Six has three digits',
      createdAt: 'Fri Feb 22 2020 14:18:34 GMT+0530 (India Standard Time)',
      dueDate: 'Sat Feb 25 2020 14:10:15 GMT+0530 (India Standard Time)',
      priority: 'Low'
    }, 
    {
      id: 5,
      currentState: false,
      title: 'Task Seven',
      description: 'Word Seven has five digits',
      createdAt: 'Fri Feb 23 2020 14:18:17 GMT+0530 (India Standard Time)',
      dueDate: 'Sat Feb 28 2020 14:10:15 GMT+0530 (India Standard Time)',
      priority: 'High'
    }, 
    {
      id: 6,
      currentState: false,
      title: 'Task Four',
      description: 'Word Four has four digits',
      createdAt: 'Fri Feb 14 2020 14:10:15 GMT+0530 (India Standard Time)',
      dueDate: 'Sat Feb 27 2020 14:10:15 GMT+0530 (India Standard Time)',
      priority: 'None'
    }, 
    {
      id: 7,
      currentState: false,
      title: 'Task Five',
      description: 'Word Five has four digits',
      createdAt: 'Fri Feb 12 2020 14:18:47 GMT+0530 (India Standard Time)',
      dueDate: 'Sat Feb 22 2020 14:10:15 GMT+0530 (India Standard Time)',
      priority: 'None'
    }, 
    {
      id: 8,
      currentState: false,
      title: 'Task Eight',
      description: 'Word Eight has five digits',
      createdAt: 'Fri Feb 21 2020 14:10:15 GMT+0530 (India Standard Time)',
      dueDate: 'Sat Feb 22 2020 14:10:15 GMT+0530 (India Standard Time)',
      priority: 'None'
    }, 
    {
      id: 9,
      currentState: false,
      title: 'Task Nine',
      description: 'Word Nine has four digits',
      createdAt: 'Fri Feb 21 2020 14:10:15 GMT+0530 (India Standard Time)',
      dueDate: 'Sat Feb 22 2020 14:10:15 GMT+0530 (India Standard Time)',
      priority: 'High'
    }, 
    {
      id: 10,
      currentState: false,
      title: 'Task Ten',
      description: 'Word Ten has three digits',
      createdAt: 'Fri Feb 21 2020 14:18:59 GMT+0530 (India Standard Time)',
      dueDate: 'Sat Feb 22 2020 14:10:15 GMT+0530 (India Standard Time)',
      priority: 'Low'
    }
  ]
}