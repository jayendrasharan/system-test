async function getTaskListApi(apiOptions) {
  return [
    {
      currentState: 'closed',
      title: 'Make Regular Commits',
      description: 'Make Regular Git Commits',
      createdAt: new Date().toDateString(),
      dueDate: new Date().toDateString(),
      priority: 'high'
    },
    {
      currentState: 'open',
      title: 'Check your mails',
      description: 'Check your mails',
      createdAt: new Date().toDateString(),
      dueDate: new Date().toDateString(),
      priority: 'low'
    },
    {
      currentState: 'open',
      title: 'Log time against your ticket',
      description: 'Log time against your ticket',
      createdAt: new Date().toDateString(),
      dueDate: new Date().toDateString(),
      priority: 'medium'
    },
    {
      currentState: 'open',
      title: 'Shut Down system at EOD',
      description: 'Shut Down system at EOD',
      createdAt: new Date().toDateString(),
      dueDate: new Date().toDateString(),
      priority: 'none'
    }
  ];
}
export { getTaskListApi };
