import React, { useState, useEffect } from "react";

const GRID_SIZE = 4;

const getEmptyBoard = () =>
  Array(GRID_SIZE)
    .fill()
    .map(() => Array(GRID_SIZE).fill(null));

const getRandomEmptyCell = (board) => {
  const emptyCells = [];
  board.forEach((row, rIdx) => {
    row.forEach((cell, cIdx) => {
      if (!cell) emptyCells.push({ rIdx, cIdx });
    });
  });

  if (emptyCells.length === 0) return null;
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};

const addRandomTile = (board) => {
  const newBoard = board.map((row) => [...row]);
  const emptyCell = getRandomEmptyCell(newBoard);
  if (emptyCell) newBoard[emptyCell.rIdx][emptyCell.cIdx] = Math.random() > 0.1 ? 2 : 4;
  return newBoard;
};

const boardsAreEqual = (board1, board2) =>
  JSON.stringify(board1) === JSON.stringify(board2);

const moveLeft = (board) => {
  let newBoard = board.map((row) => {
    let newRow = row.filter((val) => val !== null);
    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2;
        newRow[i + 1] = null;
      }
    }
    newRow = newRow.filter((val) => val !== null);
    while (newRow.length < GRID_SIZE) newRow.push(null);
    return newRow;
  });
  return newBoard;
};

const rotateBoard = (board) =>
  board[0].map((_, i) => board.map((row) => row[i])).reverse();

const moveRight = (board) => rotateBoard(rotateBoard(moveLeft(rotateBoard(rotateBoard(board)))));
const moveUp = (board) => rotateBoard(moveLeft(rotateBoard(rotateBoard(rotateBoard(board)))));
const moveDown = (board) => rotateBoard(rotateBoard(rotateBoard(moveLeft(rotateBoard(board)))));

const Game2048 = () => {
  const [board, setBoard] = useState(addRandomTile(getEmptyBoard()));
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e) => {
      let newBoard = [...board];
      if (["ArrowLeft", "a"].includes(e.key)) newBoard = moveLeft(board);
      if (["ArrowRight", "d"].includes(e.key)) newBoard = moveRight(board);
      if (["ArrowUp", "w"].includes(e.key)) newBoard = moveUp(board);
      if (["ArrowDown", "s"].includes(e.key)) newBoard = moveDown(board);

      if (!boardsAreEqual(newBoard, board)) {
        setBoard(addRandomTile(newBoard));
        setScore((prev) => prev + 10);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [board]);

  const restartGame = () => {
    setBoard(addRandomTile(getEmptyBoard()));
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">2048 Game</h1>
      <p className="text-lg font-semibold mb-2">Score: {score}</p>

      <div className="grid grid-cols-4 gap-2 bg-gray-300 p-4 rounded-lg shadow-lg">
        {board.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={`w-16 h-16 flex items-center justify-center text-2xl font-bold bg-${cell ? "yellow-400" : "gray-200"} rounded-lg shadow-md`}
            >
              {cell || ""}
            </div>
          ))
        )}
      </div>

      <button
        onClick={restartGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        Restart Game
      </button>
    </div>
  );
};

export default Game2048;
