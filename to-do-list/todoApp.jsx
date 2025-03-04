import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function addTask() {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  }

  function removeTask() {
    setTasks([]);
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Enter a task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <button onClick={removeTask} style={{marginLeft:"10px", backgroundColor:"red", color:"white"}}>Clear Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

const root = createRoot(document.querySelector("root"));
root.render(<App />);
