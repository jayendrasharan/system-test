import { render } from "react-dom";
import provider from "./provider";
import configureStore from './store';
import createRoutes from './routes';
import rootReducer from "./reducers";

const initialState = {};
const store = configureStore(initialState, rootReducer);

render(
  provider(store, createRoutes()), document.getElementById('root')
);
