import React, { useState, useEffect } from "react";

const Tetris = () => {
    const ROWS = 20;
    const COLS = 10;
    const EMPTY_GRID = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));

    const [grid, setGrid] = useState(EMPTY_GRID());
    const [score, setScore] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [currentBlock, setCurrentBlock] = useState({ x: 4, y: 0 });

    // Function to start the game
    const startGame = () => {
        if (!isRunning) {
            setIsRunning(true);
            setGrid(EMPTY_GRID());
            setScore(0);
            setCurrentBlock({ x: 4, y: 0 });

            const id = setInterval(() => {
                movePieceDown();
            }, 500);
            setIntervalId(id);
        }
    };

    // Function to stop the game
    const stopGame = () => {
        setIsRunning(false);
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    // Function to move the block down
    const movePieceDown = () => {
        setCurrentBlock(prev => {
            const newY = prev.y + 1;
            if (newY < ROWS) {
                return { ...prev, y: newY };
            } else {
                placeBlock(prev);
                return { x: 4, y: 0 };
            }
        });
        setScore(prev => prev + 10);
    };

    // Function to move left and right
    const movePiece = (direction) => {
        setCurrentBlock(prev => {
            const newX = prev.x + direction;
            if (newX >= 0 && newX < COLS) {
                return { ...prev, x: newX };
            }
            return prev;
        });
    };

    // Function to place block permanently on the grid
    const placeBlock = (block) => {
        setGrid(prevGrid => {
            const newGrid = prevGrid.map(row => [...row]);
            newGrid[block.y][block.x] = 1; // Mark block position
            return newGrid;
        });
    };

    // Handle key press events
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === "ArrowLeft") movePiece(-1);
            if (e.key === "ArrowRight") movePiece(1);
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    // Cleanup interval when component unmounts
    useEffect(() => {
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [intervalId]);

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>Tetris</h1>
            <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${COLS}, 20px)`,
                gap: "1px",
                justifyContent: "center",
                background: "black",
                padding: "5px"
            }}>
                {grid.map((row, rowIndex) =>
                    row.map((cell, cellIndex) => {
                        const isCurrentBlock = rowIndex === currentBlock.y && cellIndex === currentBlock.x;
                        return (
                            <div key={`${rowIndex}-${cellIndex}`} style={{
                                width: 20,
                                height: 20,
                                backgroundColor: isCurrentBlock ? "red" : cell ? "blue" : "white",
                                border: "1px solid black"
                            }}></div>
                        );
                    })
                )}
            </div>
            <h2>Score: {score}</h2>
            
            {/* Start and Stop Buttons */}
            <button onClick={startGame} disabled={isRunning} style={{ margin: "10px", padding: "10px 20px" }}>
                Start
            </button>
            <button onClick={stopGame} disabled={!isRunning} style={{ padding: "10px 20px" }}>
                Stop
            </button>
        </div>
    );
};

export default Tetris;
