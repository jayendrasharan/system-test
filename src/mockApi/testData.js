const { TODO_STATUS, TODO_PRIORITY } = require("../constants");

const sampleDate = [
  {
    id: 1,
    currentState: TODO_STATUS.OPEN,
    title: "Workout",
    description: "I have to do gym workout today.",
    createdAt: new Date(),
    dueDate: new Date(),
    priority: TODO_PRIORITY.HIGH,
  },
  {
    id: 2,
    currentState: TODO_STATUS.OPEN,
    title: "Lunch",
    description: "Don't forget lunch.",
    createdAt: new Date(),
    dueDate: new Date(),
    priority: TODO_PRIORITY.HIGH,
  },
  {
    id: 3,
    currentState: TODO_STATUS.COMPLETED,
    title: "Metting",
    description: "I have to attend client meeting today.",
    createdAt: new Date(),
    dueDate: new Date(),
    priority: TODO_PRIORITY.HIGH,
  },
];

export default sampleDate;
