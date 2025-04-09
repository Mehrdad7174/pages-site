import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";

const initialItems = [
    { id: 1, name: "Capable", description: "Able to do something effectively and skillfully." },
    { id: 2, name: "Competent", description: "Having the necessary ability, knowledge, or skill to do something successfully." },
    { id: 3, name: "Skilled", description: "Having or showing the knowledge, ability, or training to perform a certain activity or task well." },
    { id: 4, name: "Talented", description: "Having a natural aptitude or skill for something." },
    { id: 5, name: "Gifted", description: "Having exceptional talent or natural ability." },
    { id: 6, name: "Proficient", description: "Competent or skilled in doing or using something." },
    { id: 7, name: "Expert", description: "A person who is very knowledgeable about or skillful in a particular area." },
];

function ListComponent({ items }) {
    return (
        <div>
            <h1>Words to Describe People</h1>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <strong>{item.name}</strong>: {item.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

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

const [showDescription, setShowDescription] = useState(false);

function handleShowDescription() {
    setShowDescription(!showDescription);
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
        <hr />
        <h1>Word List</h1>
        <button onClick={handleShowDescription} style={{ marginLeft: "10px" }}>
            {showDescription ? "Hide Descriptions" : "Show Descriptions"}
        </button>
        {showDescription ? (
            <ListComponent items={initialItems} />
        ) : (
            <ul>
                {initialItems.map((item) => (
                    <li key={item.id}>
                        <strong>{item.name}</strong>
                    </li>
                ))}
            </ul>
        )}
    </div>
) : (
    <h1 style={{ textAlign: "center", marginTop: "50px" }}>
        Hello from React!
    </h1>
);
}

const root = createRoot(document.querySelector("root"));
root.render(<App />);
