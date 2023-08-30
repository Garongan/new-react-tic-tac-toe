/* eslint-disable react/prop-types */
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let index = 0; index < lines.length; index++) {
    const [rule1, rule2, rule3] = lines[index]; //cek aturan index ke 1 dengan destructuring
    if (squares[rule1] === squares[rule2] && squares[rule1] === squares[rule3])
      return squares[rule1];
  }
  return false;
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      <div className={value}>{value}</div>
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status = "";

  if (winner) status = "Winner: " + winner;
  else status = "Next Player: " + (xIsNext ? "X" : "O");

  function handleClick(index) {
    if (squares[index] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();

    nextSquares[index] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((square, index) => (
          <Square
            key={index}
            value={squares[index]}
            onSquareClick={() => handleClick(index)}
          />
        ))}
      </div>
    </>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function undo() {
    if (currentMove == 0) return;
    setCurrentMove(currentMove - 1);
  }

  function redo() {
    if (currentMove == history.length - 1) return;
    setCurrentMove(currentMove + 1);
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="undoRedo">
          <Tooltip title={<h3>Undo</h3>}>
            <button className="undo" onClick={undo}>
              <span>&#9100;</span>
            </button>
          </Tooltip>
          <Tooltip title={<h3>Redo</h3>}>
            <button className="redo" onClick={redo}>
              <span>&#9100;</span>
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

export default Game;
