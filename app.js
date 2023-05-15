const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const TaskRouter = require("./routes/taskRoute");
const LocalFileTaskRepository = require("./repository/localFileTaskRepository");
const MongoFiileTaskRepository = require("./repository/mongoTaskRepository");

// global variable
const PORT = process.env.PORT;

const app = express();

// Local File Task Repository
const localFileTaskRepository = new LocalFileTaskRepository();

// Need Implementation
// const mongoFileTaskRepository = new MongoFiileTaskRepository();

app.use(cors());
app.use(bodyParser.json());

// Setup Routers
app.use(
  "/task",
  async (req, res, next) => {
    // validate for user authorization if needed
    // attach taskRepository, can be switch from LocalFile with MongoDB
    req.taskRepository = localFileTaskRepository;
    next();
  },
  TaskRouter
);

app.listen(PORT, () => console.log("application started at port:", PORT));
