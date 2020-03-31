import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  API_CALL_COMPLETED,
  API_CALL_STARTED,
  RETAIN_TODOS
} from "../constants";
import { isEmpty } from "lodash";

const initialState = {
  todos: [
    {
      currentState: "open",
      title: "The standard Lorem Ipsum passage",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      createdAt: new Date(),
      dueDate: new Date(),
      priority: "None"
    },
    {
      currentState: "open",
      title: 'Section 1.10.32 of "de Finibus Bonorum et Malorum"',
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      createdAt: new Date(),
      dueDate: new Date(),
      priority: "Medium"
    },
    {
      currentState: "done",
      title: "1914 translation by H. Rackham",
      description:
        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.",
      createdAt: new Date(),
      dueDate: new Date(),
      priority: "High"
    },
    {
      currentState: "open",
      title: 'Section 1.10.33 of "de Finibus Bonorum et Malorum"',
      description:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident",
      createdAt: new Date(),
      dueDate: new Date(),
      priority: "Low"
    },
    {
      currentState: "done",
      title:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mauris quam, pharetra quis pulvinar et, fermentum vitae diam. Donec ipsum turpis, maximus sed euismod at, tincidunt non nisl. ",
      createdAt: new Date(),
      dueDate: new Date(),
      priority: "Medium"
    },
    {
      currentState: "open",
      title: "Pellentesque ac ultricies sapien",
      description:
        "Phasellus turpis mauris, mollis eu vehicula non, consectetur at diam. Vestibulum viverra nulla urna. Duis ultrices semper velit, quis mattis quam elementum nec.",
      createdAt: new Date(),
      dueDate: new Date(),
      priority: "High"
    },
    {
      currentState: "open",
      title: "Nulla hendrerit libero erat",
      description:
        "Proin tellus augue, bibendum viverra est eu, vestibulum aliquet eros. Donec non euismod lorem. Vestibulum nisl elit, aliquam non libero et, aliquam commodo mauris.",
      createdAt: new Date(),
      dueDate: new Date(),
      priority: "Low"
    }
  ],
  apiInProgress: false,
  configs: {
    allowSort: true,
    allowSearch: true,
    allowGroupBy: true,
    groupBy: {
      createdAt: true,
      dueDate: true,
      priority: true
    }
  }
};

export default function todo(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case EDIT_TODO:
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, action.index),
          action.payload,
          ...state.todos.slice(action.index + 1)
        ]
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((_, index) => index !== action.index)
      };
    case RETAIN_TODOS:
      return {
        ...state,
        todos: isEmpty(action.todos) ? action.todos : state.todos
      };
    case API_CALL_COMPLETED:
      return {
        ...state,
        apiInProgress: false
      };
    case API_CALL_STARTED:
      return {
        ...state,
        apiInProgress: true
      };
    default:
      return state;
  }
}
