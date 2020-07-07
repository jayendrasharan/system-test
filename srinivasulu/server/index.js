const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3015;

//To parse the json data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Allowing the request from all resources
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

let data = [
  {
    id: 1,
    summary: "1",
    description: "summary1",
    priority: "high",
    dueDate: "2020-07-17",
    createdAt: "2020-07-17",
    currentState: "open",
  },
  {
    id: 2,
    summary: "2",
    description: "summary2",
    priority: "low",
    dueDate: "2020-07-17",
    createdAt: "2020-07-17",
    currentState: "completed",
  },
];

app.get("/", (req, res) => {
  res.send("Rest api url");
});

app.get("/tasks", (req, res) => {
  const { status } = req.query;
  let filterData = [];
  if (status !== undefined) {
    if (status === "all") {
      filterData = data;
    } else {
      data.map((dt) => {
        if (dt.currentState === status) {
          filterData.push(dt);
        }
      });
    }
  } else {
    filterData = data;
  }
  const responseData = {
    responseCode: "1",
    status: "succcess",
    data: filterData,
  };

  res.status(200).json(responseData);
});

app.post("/tasks", (req, res) => {
  console.log(req.body);
  const {
    summary,
    description,
    priority,
    dueDate,
    currentState,
    createdAt,
  } = req.body;
  const createTaks = {
    id: data.length + 1,
    summary,
    description,
    priority,
    dueDate,
    currentState,
    createdAt,
  };
  console.log(createTaks);
  data.unshift(createTaks);

  res.status(200).json({
    responseCode: 1,
    status: "succcess",
    message: "New Task added succesfull",
  });
});

app.put("/tasks/:id", (req, res) => {
  console.log(req.param);
  const { id } = req.params;
  const { summary, description, priority, dueDate, currentState } = req.body;

  objIndex = data.findIndex((obj) => obj.id == id);

  data[objIndex].summary = summary;
  data[objIndex].description = description;
  data[objIndex].priority = priority;
  data[objIndex].dueDate = dueDate;
  data[objIndex].currentState = currentState;

  res.status(200).json({
    responseCode: 1,
    status: "succcess",
    message: "update Task  succesfull",
  });
});

app.post("/deleteTasks", (req, res) => {
  let { ids } = req.body;
  for (var i = 0; i < ids.length; i++) {
    data = data.filter(function (obj) {
      return obj.id !== ids[i];
    });
  }

  res.status(200).json({
    responseCode: 1,
    status: "succcess",
    message: "Tasks deleted successfully",
  });
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
