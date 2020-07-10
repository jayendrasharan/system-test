import React, { useState } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import Home from "./pages/Home";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const onSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <div>
      <Header searchText={searchText} onSearchTextChange={onSearchTextChange} />
      <Home searchText={searchText} />
    </div>
  );
};

export default App;
