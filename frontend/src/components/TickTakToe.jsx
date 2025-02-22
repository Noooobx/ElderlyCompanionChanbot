import React, { useState, useEffect } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const winner = calculateWinner(board);

  useEffect(() => {
    if (!isXTurn && !winner) {
      const aiMove = getRandomMove(board);
      if (aiMove !== null) {
        setTimeout(() => {
          const newBoard = [...board];
          newBoard[aiMove] = "O";
          setBoard(newBoard);
          setIsXTurn(true);
        }, 500);
      }
    }
  }, [isXTurn, board, winner]);

  const handleClick = (index) => {
    if (board[index] || winner || !isXTurn) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXTurn(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 tracking-wide">
        Tic-Tac-Toe 
      </h1>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-2 bg-gray-200 p-3 rounded-lg shadow-md">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-20 h-20 flex items-center justify-center text-3xl font-semibold border border-gray-300 bg-white rounded-lg hover:bg-gray-100 transition-all"
            onClick={() => handleClick(index)}
            disabled={cell !== null}
          >
            <span className={`text-${cell === "X" ? "blue" : "red"}-500`}>{cell}</span>
          </button>
        ))}
      </div>

      {/* Status */}
      <p className="text-lg font-medium text-gray-700 mt-4">
        {winner ? `🎉 Winner: ${winner}` : `Next Move: ${isXTurn ? "X (You)" : "O (AI)"}`}
      </p>

      {/* Restart Button */}
      <button
        onClick={resetGame}
        className="mt-4 px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Restart Game
      </button>
    </div>
  );
};

/* Utility Functions */
const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};

const getRandomMove = (board) => {
  const emptyCells = board.map((cell, index) => (cell === null ? index : null)).filter((val) => val !== null);
  return emptyCells.length > 0 ? emptyCells[Math.floor(Math.random() * emptyCells.length)] : null;
};

export default TicTacToe;
