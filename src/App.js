import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router";
import "./css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

const title = "Todo App";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <h4 id="app-title" data-testid="app-title" className="app-title">{title}</h4>
        </div>
        <BrowserRouter>
            <Router/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
