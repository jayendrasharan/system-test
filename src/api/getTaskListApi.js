async function getTaskListApi(apiOptions) {
  return [
    {
      currentState: 'closed',
      title: 'Make Regular Commits',
      description: 'Make Regular Git Commits. The commits should be made against individual tasks. The reviewer should be able to easily review code.',
      createdAt: new Date().toDateString(),
      dueDate: new Date().toDateString(),
      priority: 'high'
    },
    {
      currentState: 'open',
      title: 'Check your mails',
      description: 'Check your mails regularly. Be quick to respond always. Maintain proper communincation between your colleages.',
      createdAt: new Date().toDateString(),
      dueDate: new Date().toDateString(),
      priority: 'low'
    },
    {
      currentState: 'open',
      title: 'Log time against your ticket',
      description: 'Log time against your ticket. As soon as you are done working on any of the task, make sure to log time. ',
      createdAt: new Date().toDateString(),
      dueDate: new Date().toDateString(),
      priority: 'medium'
    },
    {
      currentState: 'open',
      title: 'Shut Down system at EOD',
      description: 'Shut Down system at EOD. Help the company to mangage infra better. Save Electricity',
      createdAt: new Date().toDateString(),
      dueDate: new Date().toDateString(),
      priority: 'none'
    }
  ];
}
export { getTaskListApi };
