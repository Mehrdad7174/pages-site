import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Load tasks from Local Storage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  // Save tasks to Local Storage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  }

  function removeTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function editTask(index) {
    setEditIndex(index);
    setEditText(tasks[index]);
  }

  function saveEdit(index) {
    if (editText.trim()) {
      const updatedTasks = [...tasks];
      updatedTasks[index] = editText;
      setTasks(updatedTasks);
      setEditIndex(null);
    }
  }

  function clearTasks() {
    setTasks([]);
  }

  function downloadTasks() {
    const markdownContent = tasks.map((task) => `- ${task}`).join("\n");
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "todo-list.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h1 className="text-center">To-Do List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          aria-label="Task input"
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {editIndex === index ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => saveEdit(index)}
                autoFocus
              />
            ) : (
              <span>{task}</span>
            )}
            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => editTask(index)}>
                Edit
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => removeTask(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 d-flex justify-content-between">
        <button className="btn btn-danger" onClick={clearTasks}>
          Clear All
        </button>
        <button className="btn btn-secondary" onClick={downloadTasks}>
          Download
        </button>
      </div>
      <p className="mt-3 text-muted" style={{ fontSize: "0.9em" }}>
        <strong>Security Notice:</strong> Data is stored in Local Storage, which is vulnerable to XSS attacks. Avoid entering sensitive information.
      </p>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
