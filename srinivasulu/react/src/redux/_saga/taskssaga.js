import { takeLatest, call, put } from "redux-saga/effects";
import { taskConstants } from "../_constants";
import { history } from "../../_helpers";
import {
  getAllTasksSuccess,
  getAllTasksError,
  newTaskSuccess,
  newTaskError,
} from "../_actions";
import api from "../../services";

function* getAllTasks(action) {
  console.log("Welcome saga", action);
  let uri = "tasks";
  if (action.data) {
    uri = "tasks?status=" + action.data;
  }
  const requestOptions = {
    uri: uri,
    method: "GET",
  };

  try {
    const data = yield call(api, requestOptions);
    console.log(data);
    yield put(getAllTasksSuccess(data));
  } catch (err) {
    yield put(getAllTasksError(err));
  }
}
let today = new Date();

let date =
  today.getFullYear() +
  "-" +
  parseInt(today.getMonth() + 1) +
  "-" +
  today.getDate();

function* createNewTask(action) {
  var request = {
    summary: action.data.summary,
    description: action.data.description,
    priority: action.data.priority,
    dueDate: action.data.duedate,
    createdAt: date,
    currentState: "open",
  };
  console.log("create request object", request);

  const requestOptions = {
    uri: "tasks",
    method: "POST",
    body: request,
  };

  try {
    const data = yield call(api, requestOptions);
    console.log("user saga");
    console.log(data);
    yield put(newTaskSuccess(data));
    yield getAllTasks("all");
    history.push({ pathname: "/dashboard" });
  } catch (err) {
    yield put(newTaskError(err));
  }
}

function* updateTask(action) {
  var request = {
    summary: action.data.summary,
    description: action.data.description,
    priority: action.data.priority,
    dueDate: action.data.dueDate,
    currentState: action.data.currentState,
  };
  console.log("update request object", request);

  const requestOptions = {
    uri: "tasks/" + action.data.id,
    method: "PUT",
    body: request,
  };

  try {
    yield call(api, requestOptions);
    yield getAllTasks("all");
    history.push({ pathname: "/dashboard" });
  } catch (err) {
    //yield put(newTaskError(err));
  }
}

function* deleteTasks(action) {
  let allIds = [];
  action.data.map((d) => {
    return allIds.push(d[0]);
  });
  var request = {
    ids: allIds,
  };
  console.log("delete request object", request);

  const requestOptions = {
    uri: "deleteTasks",
    method: "POST",
    body: request,
  };

  try {
    const data = yield call(api, requestOptions);
    console.log("Taks DELETE saga");
    console.log(data);
    yield getAllTasks("all");
    history.push({ pathname: "/dashboard" });
  } catch (err) {
    yield put(newTaskError(err));
  }
}

export function* taskOperations() {
  yield takeLatest(taskConstants.LOAD_TASK, getAllTasks);
  yield takeLatest(taskConstants.CREATE_TASK, createNewTask);
  yield takeLatest(taskConstants.UPDATE_TASK, updateTask);
  yield takeLatest(taskConstants.DELETE_TASK, deleteTasks);
}
export default taskOperations;
