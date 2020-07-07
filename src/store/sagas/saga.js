import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import getCarrierGroupsSaga from './fetchTasksSaga';

const sagaMiddleware = createSagaMiddleware();

const configureSaga = () => {
  function* rootSaga() {
    yield all([authSaga(), getCarrierGroupsSaga()]);
  }

  sagaMiddleware.run(rootSaga);
};

export { sagaMiddleware, configureSaga };
