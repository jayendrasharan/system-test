import React, { Component } from "react";
import Compose from "./components/compose";
import Viewer from "./components/viewer";

let sample = [
  {
    id: 1,
    title: "create compose",
    description: "create compose botton and models as given in the docs",
    currentState: "open",
    createdAt: "2020-03-19",
    dueDate: "2020-04-04",
    priority: "high"
  },
  {
    id: 2,
    title: "create body",
    description: "create body botton and models as given in the docs",
    currentState: "open",
    createdAt: "2020-03-19",
    dueDate: "2020-04-15",
    priority: "low"
  },
  {
    id: 3,
    title: "create fotter",
    description: "create fotter botton and models as given in the docs",
    currentState: "open",
    createdAt: "2020-03-19",
    dueDate: "2020-04-20",
    priority: "medium"
  },
  {
    id: 4,
    title: "create todo using react",
    description: "create botton and models as given in the docs",
    currentState: "close",
    createdAt: "2020-03-19",
    dueDate: "2020-04-24",
    priority: "medium"
  },
  {
    id: 5,
    title: "attend a seminar",
    description: "Attend the seminar on AI and ML in IIIT Hyderabad",
    currentState: "open",
    createdAt: "2020-03-25",
    dueDate: "2020-04-02",
    priority: "high"
  },
  {
    id: 6,
    title: "lundry",
    description: "get the clothes to the laundry and get it done",
    currentState: "close",
    createdAt: "2020-03-25",
    dueDate: "2020-03-27",
    priority: "none"
  },
  {
    id: 7,
    title: "haircut",
    description: "get your hair and beard done",
    currentState: "open",
    createdAt: "2020-03-27",
    dueDate: "2020-04-07",
    priority: "low"
  },
  {
    id: 8,
    title: "pick up relatives",
    description: "pickup relatives at the airport coming from usa",
    currentState: "open",
    createdAt: "2020-03-27",
    dueDate: "2020-04-08",
    priority: "high"
  },
  {
    id: 9,
    title: "party with friends",
    description: "Attend party with your btech friends in hyderabad",
    currentState: "open",
    createdAt: "2020-03-27",
    dueDate: "2020-04-15",
    priority: "medium"
  },
  {
    id: 10,
    title: "Attend the birthday",
    description: "Attend to the birthday party of your childhood friend",
    currentState: "close",
    createdAt: "2020-03-27",
    dueDate: "2020-04-01",
    priority: "medium"
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sample: sample,
      len: sample.length
    };
  }
  onAddTodo = item => {
    let newSample = [...this.state.sample];
    item.id = this.state.len + 1;
    newSample.push(item);
    this.setState({ sample: newSample, len: item.id });
  };
  onUpdateTodo = item => {
    let newSample = [...this.state.sample];
    let length = this.state.len;
    for (let i = 0; i < length; i++)
      if (newSample[i].id === item.id) newSample[i] = item;
    console.log(newSample);
    this.setState({ sample: newSample, len: length });
  };
  onDeleteTodo = id => {
    let tempSample = [...this.state.sample];
    let length = this.state.len;
    for (let i = 0; i < length; i++)
      if (tempSample[i].id === id) {
        tempSample.splice(i, 1);
        this.setState({ sample: tempSample, len: length - 1 });
        break;
      }
  };
  onChangeStatus = id => {
    let tempSample = [...this.state.sample];
    let length = this.state.len;
    for (let i = 0; i < length; i++)
      if (tempSample[i].id === id) {
        tempSample[i].currentState =
          tempSample[i].currentState === "open" ? "close" : "open";
        this.setState({ sample: tempSample });
        break;
      }
  };
  render() {
    return (
      <div className="App">
        <Compose onAddTodo={this.onAddTodo} />
        <Viewer
          data={this.state.sample}
          onUpdateTodo={this.onUpdateTodo}
          onDeleteTodo={this.onDeleteTodo}
          onChangeStatus={this.onChangeStatus}
          search={this.state.search}
        />
      </div>
    );
  }
}

export default App;
