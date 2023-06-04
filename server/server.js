const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let tasks = [];

const readTasks = () => {
  try {
    const fileData = fs.readFileSync("tasks.json", "utf8");
    tasks = JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading tasks file:", error);
  }
};

readTasks();

const writeTasksToFile = () => {
  try {
    const fileData = JSON.stringify(tasks, null, 2);
    fs.writeFileSync("tasks.json", fileData, "utf8");
  } catch (error) {
    console.error("Error writing tasks file:", error);
  }
};

app.get("/", (req, res) => {
  readTasks(); 
  res.send(tasks);
});

app.post("/", (req, res) => {
  readTasks(); 
  const newTask = req.body.task;
  tasks.push(newTask);
  writeTasksToFile();
  res.send(tasks);
});

app.delete("/:id", (req, res) => {
  readTasks(); 
  const taskId = req.params.id;
  tasks.splice(taskId, 1);
  writeTasksToFile();
  res.send(tasks);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
