import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import middleware, { sagaMiddleware } from './middleware';
import { task } from './reducers';
import rootSaga from './sagas';

//========================================
// reducer & PersistentReducer
//========================================
const reducer = persistReducer(
    {
        key: 'todo-app', // key is required
        storage, // storage is now required (using localStorage)
        whitelist: [], // only this list will be persisted
        blacklist: [], // list will not be persisted
        stateReconciler: autoMergeLevel2
    },
    task
);

// ======================================================
// Store Enhancers
// ======================================================
const enhancers = []
let composeEnhancers = compose
const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
if (typeof composeWithDevToolsExtension === 'function') {
    composeEnhancers = composeWithDevToolsExtension
}

// ======================================================
// Store Instantiation and React-todo app Setup
// ======================================================
const configStore = (initialState = {}) => {
    const store = createStore(reducer,
        initialState,
        composeEnhancers(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );
    sagaMiddleware.run(rootSaga);
    return {
        persistor: persistStore(store),
        store,
    };
};

const { store, persistor } = configStore();
global.store = store;

export { store, persistor };