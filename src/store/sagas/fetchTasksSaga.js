import createFetchSaga from './createFetchSaga';
import { fetchTaskListActions } from '../actions/toDoActions';
import { getTaskListApi } from '../../api/getTaskListApi';

function* getCarrierGroupsSaga() {
  const fetchTasksSaga = createFetchSaga(fetchTaskListActions, getTaskListApi);
  yield* fetchTasksSaga();
}

export default getCarrierGroupsSaga;
