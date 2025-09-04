import React, { useState } from "react";

function solveNQueens(n) {
  const result = [];
  const board = Array(n).fill().map(() => Array(n).fill("."));

  function isValid(row, col) {
    for (let i = 0; i < row; i++) if (board[i][col] === "Q") return false;
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--)
      if (board[i][j] === "Q") return false;
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++)
      if (board[i][j] === "Q") return false;
    return true;
  }

  function backtrack(row) {
    if (row === n) {
      result.push(board.map((row) => row.join("")));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = "Q";
        backtrack(row + 1);
        board[row][col] = ".";
      }
    }
  }

  backtrack(0);
  return result;
}

// ✅ CommonJS export for tests
module.exports = solveNQueens;

// ✅ Still allow App.js to import NQueensApp
export function NQueensApp() {
  const [n, setN] = useState(4);
  const [solutions, setSolutions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSolution, setCurrentSolution] = useState(0);

  const handleSolve = () => {
    if (n < 1 || n > 9) return;
    setIsLoading(true);
    setTimeout(() => {
      const result = solveNQueens(n);
      setSolutions(result);
      setCurrentSolution(0);
      setIsLoading(false);
    }, 100);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        N-Queens Problem Solver
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <label htmlFor="n-input" className="font-semibold">
            Board Size (n):
          </label>
          <input
            id="n-input"
            data-testid="n-input"
            type="number"
            min="1"
            max="9"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value) || 1)}
            className="border border-gray-300 rounded px-3 py-1 w-20"
          />
          <button
            data-testid="solve-button"
            onClick={handleSolve}
            disabled={isLoading || n < 1 || n > 9}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? "Solving..." : "Solve"}
          </button>
        </div>
        {solutions.length > 0 && (
          <div className="mb-4">
            <p className="text-lg font-semibold mb-2" data-testid="solution-count">
              Found {solutions.length} solution{solutions.length !== 1 ? "s" : ""}
            </p>
            {solutions.length > 1 && (
              <div className="flex items-center gap-2">
                <button
                  data-testid="prev-solution"
                  onClick={() =>
                    setCurrentSolution(Math.max(0, currentSolution - 1))
                  }
                  disabled={currentSolution === 0}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 disabled:bg-gray-300"
                >
                  Previous
                </button>
                <span data-testid="current-solution">
                  Solution {currentSolution + 1} of {solutions.length}
                </span>
                <button
                  data-testid="next-solution"
                  onClick={() =>
                    setCurrentSolution(
                      Math.min(solutions.length - 1, currentSolution + 1)
                    )
                  }
                  disabled={currentSolution === solutions.length - 1}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {solutions.length === 0 && !isLoading && (
        <div className="text-center text-gray-500 py-8">
          <p>Enter a board size and click "Solve" to see the solutions</p>
        </div>
      )}
      {solutions.length === 0 && n > 1 && n <= 3 && (
        <div className="text-center text-orange-600 py-4">
          <p>No solutions exist for n = {n}</p>
        </div>
      )}
      {solutions.length > 0 && (
        <div className="flex flex-col items-center">
          <div data-testid="chess-board" className="mb-4">
            {/* We can reuse solution array directly */}
            <div className="grid gap-0 border-2 border-gray-800 inline-block">
              {solutions[currentSolution].map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                  {row.split("").map((cell, colIndex) => (
                    <div
                      key={colIndex}
                      className={`w-8 h-8 flex items-center justify-center text-lg font-bold ${
                        (rowIndex + colIndex) % 2 === 0
                          ? "bg-amber-100"
                          : "bg-amber-700"
                      }`}
                    >
                      {cell === "Q" ? "♛" : ""}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-600 max-w-2xl">
            <h3 className="font-semibold mb-2">Solution Array Format:</h3>
            <pre className="bg-gray-100 p-3 rounded overflow-x-auto">
              {JSON.stringify(solutions[currentSolution], null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
