import { createStore } from 'redux';

export default function configureStore(initialState, rootReducer) {
  
  return createStore(
    rootReducer,
    initialState,
  );
}
