import React from "react";
import Main from "./containers/Main";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Main />
      </Provider>
      ,
    </div>
  );
}

export default App;
