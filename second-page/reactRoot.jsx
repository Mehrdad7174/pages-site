import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";

function App() {
  const [showApp, setShowApp] = useState(false); // State to control what to display
  const [count, setCount] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    // Show the App after 2 seconds
    const timer = setTimeout(() => {
      setShowApp(true);
    }, 1500);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  function handleIncrement() {
    setCount(count + 1);
    setTotalClicks(totalClicks + 1);
  }

  function handleDecrement() {
    setCount(count - 1);
    setTotalClicks(totalClicks + 1);
  }

  return showApp ? (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Click Counter</h1>
      <p>You clicked {count} times</p>
      <p><strong>Total Clicks:</strong> {totalClicks}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement} style={{ marginLeft: "10px" }}>
        Decrement
      </button>
    </div>
  ) : (
    <h1 style={{ textAlign: "center", marginTop: "50px" }}>
      Hello from React!
    </h1>
  );
}

const root = createRoot(document.querySelector("root"));
root.render(<App />);
