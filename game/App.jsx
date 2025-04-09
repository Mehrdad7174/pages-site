import { useState } from 'react';
import Board from './components/Board';
import UpcomingBlock from './components/UpcomingBlock';
import HighScore from './components/HighScore';
import { useTetris } from './hooks/useTetris';

function App() {
  const { board, startGame, isPlaying, score, upcomingBlock, resetGame } = useTetris();
  
  // New state for hiding the game
  const [isGameVisible, setIsGameVisible] = useState(true);

  const handleHideGame = () => {
    setIsGameVisible(false);
  };

  const handleShowGame = () => {
    setIsGameVisible(true);
    resetGame();
    startGame();
  };

  return (
    <div className="app">
      <h1>Tetris</h1>

      {/* Show Home and Tetris buttons when the game is hidden */}
      {!isGameVisible && (
        <div className="home-buttons">
          <button onClick={handleShowGame}>Tetris</button>
        </div>
      )}

      {/* Show the game UI when it's visible */}
      {isGameVisible && (
        <>
          <Board currentBoard={board} />
          <div className="controls">
            <h2>Score: {score}</h2>
            {isPlaying ? (
              <>
                <UpcomingBlock upcomingBlock={upcomingBlock} />
                <button onClick={handleHideGame}>Hide Game</button>
              </>
            ) : (
              <>
                <button onClick={startGame}> New Game</button>
                <button onClick={resetGame}>Reset Game</button>
                <HighScore />
                
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
