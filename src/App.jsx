import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("http://localhost:3000")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addTask = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000", {
        task: newTask,
      })
      .then((response) => {
        setTasks(response.data);
        setNewTask("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:3000/${id}`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="app">
      <div class="big-text">todos</div>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button class="li-button" onClick={() => deleteTask(index)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
