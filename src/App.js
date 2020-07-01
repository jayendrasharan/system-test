import React from "react";

import Header from "./components/Header";
import Tabs from "./components/Tabs";
import Table from "./components/Table";
import AddTodo from "./components/AddTodo";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Tabs />
      <Table />
      <AddTodo />
    </div>
  );
}

export default App;
