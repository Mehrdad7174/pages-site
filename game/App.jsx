import React, { useState } from "react";
import Tetris from "./Tetris";

const App = () => {
    const [showGame, setShowGame] = useState(false);

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>Welcome to the Game Page</h1>

            <div style={{ marginBottom: "20px" }}>
                {/* Navigation Buttons */}
                <button
                    onClick={() => window.location.href = "../index.html"}
                    style={{ marginRight: "10px", padding: "10px 20px", fontSize: "16px", backgroundColor: "0056b3" }}
                >
                    Home
                </button>

                <button onClick={() => setShowGame(!showGame)} style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "0056b3" }}>
                    {showGame ? "Hide Tetris" : "Tetris"}
                </button>
            </div>

            {/* Show Tetris Game Below When Button Clicked */}
            {showGame && <Tetris />}
        </div>
    );
};

export default App;
