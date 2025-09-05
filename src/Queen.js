import React, { useState } from "react";

function totalNQueens(n) {
  let count = 0;
  const cols = new Set();
  const diag1 = new Set(); 
  const diag2 = new Set(); 

  function backtrack(row) {
    if (row === n) {
      count++;
      return;
    }

    for (let col = 0; col < n; col++) {
      const d1 = row - col;
      const d2 = row + col;

      if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) {
        continue;
      }

      cols.add(col);
      diag1.add(d1);
      diag2.add(d2);

      backtrack(row + 1);

      cols.delete(col);
      diag1.delete(d1);
      diag2.delete(d2);
    }
  }

  backtrack(0);
  return count;
}

function getAllNQueensSolutions(n) {
  const result = [];
  const board = Array(n).fill().map(() => Array(n).fill('.'));

  function isValid(row, col) {
    for (let i = 0; i < row; i++) if (board[i][col] === 'Q') return false;
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--)
      if (board[i][j] === 'Q') return false;
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++)
      if (board[i][j] === 'Q') return false;
    return true;
  }

  function backtrack(row) {
    if (row === n) {
      result.push(board.map(row => row.join('')));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = 'Q';
        backtrack(row + 1);
        board[row][col] = '.';
      }
    }
  }

  backtrack(0);
  return result;
}

export default function NQueens2App() {
  const [n, setN] = useState(4);
  const [solutionCount, setSolutionCount] = useState(null);
  const [allSolutions, setAllSolutions] = useState([]);
  const [currentSolution, setCurrentSolution] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [showAllSolutions, setShowAllSolutions] = useState(false);

  const expectedCounts = {
    1: 1, 2: 0, 3: 0, 4: 2, 5: 10, 
    6: 4, 7: 40, 8: 92, 9: 352
  };

  const handleCountOnly = () => {
    if (n < 1 || n > 9) return;
    setIsLoading(true);
    setSolutionCount(null);
    setAllSolutions([]);
    setExecutionTime(null);
    setShowAllSolutions(false);

    setTimeout(() => {
      const startTime = performance.now();
      const count = totalNQueens(n);
      const endTime = performance.now();

      setSolutionCount(count);
      setExecutionTime((endTime - startTime).toFixed(2));
      setIsLoading(false);
    }, 100);
  };

  const handleShowAllSolutions = () => {
    if (n < 1 || n > 9) return;
    setIsLoading(true);
    setSolutionCount(null);
    setAllSolutions([]);
    setExecutionTime(null);
    setCurrentSolution(0);
    setShowAllSolutions(true);

    setTimeout(() => {
      const startTime = performance.now();
      const solutions = getAllNQueensSolutions(n);
      const endTime = performance.now();

      setAllSolutions(solutions);
      setSolutionCount(solutions.length);
      setExecutionTime((endTime - startTime).toFixed(2));
      setIsLoading(false);
    }, 100);
  };

  const createBoard = (solution = null) => {
    const squares = [];
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        const isQueen = solution && solution[row] && solution[row][col] === 'Q';
        squares.push(
          <div
            key={`${row}-${col}`}
            className={`w-8 h-8 flex items-center justify-center border border-gray-400 text-lg font-bold ${
              (row + col) % 2 === 0 ? "bg-amber-100" : "bg-amber-700 text-white"
            }`}
          >
            {isQueen ? "♛" : ""}
          </div>
        );
      }
    }
    return squares;
  };

  const navigateToSolution = (direction) => {
    if (direction === 'prev') {
      setCurrentSolution(Math.max(0, currentSolution - 1));
    } else {
      setCurrentSolution(Math.min(allSolutions.length - 1, currentSolution + 1));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        N-Queens II Problem Solver
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="text-center mb-6">
          <p className="text-gray-600 text-lg mb-4">
            Count solutions or view all distinct solutions to place n queens on an n×n chessboard
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <label htmlFor="n-input" className="font-semibold text-lg">
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
              className="border-2 border-gray-300 rounded-lg px-4 py-2 w-24 text-center text-lg focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <button
              data-testid="count-button"
              onClick={handleCountOnly}
              disabled={isLoading || n < 1 || n > 9}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-semibold"
            >
              {isLoading && !showAllSolutions ? "Counting..." : "Count Only"}
            </button>

            <button
              data-testid="show-all-button"
              onClick={handleShowAllSolutions}
              disabled={isLoading || n < 1 || n > 9}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-semibold"
            >
              {isLoading && showAllSolutions ? "Loading..." : "Show All Solutions"}
            </button>
          </div>

          <div className="text-sm text-gray-500 text-center max-w-md">
            <p><strong>Count Only:</strong> Fast - just shows the number of solutions</p>
            <p><strong>Show All:</strong> Slower - displays each solution visually</p>
          </div>
        </div>

        {solutionCount !== null && (
          <div className="text-center">
            <div 
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 mb-6 shadow-xl"
              data-testid="solution-count"
            >
              <div className="text-5xl font-bold mb-2">
                {solutionCount}
              </div>
              <div className="text-xl">
                Solution{solutionCount !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="mb-6">
              {solutionCount === 0 ? (
                <p className="text-orange-600 text-lg font-medium">
                  No solutions exist for n = {n}
                </p>
              ) : (
                <p className="text-green-700 text-lg">
                  There {solutionCount === 1 ? 'is' : 'are'} <strong>{solutionCount}</strong> distinct way{solutionCount !== 1 ? 's' : ''} to place {n} queens on a {n}×{n} chessboard
                </p>
              )}
            </div>

            {}
            {showAllSolutions && allSolutions.length > 0 && (
              <div className="mb-6">
                {allSolutions.length > 1 && (
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <button
                      data-testid="prev-solution"
                      onClick={() => navigateToSolution('prev')}
                      disabled={currentSolution === 0}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span data-testid="current-solution" className="font-semibold">
                      Solution {currentSolution + 1} of {allSolutions.length}
                    </span>
                    <button
                      data-testid="next-solution"
                      onClick={() => navigateToSolution('next')}
                      disabled={currentSolution === allSolutions.length - 1}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}

                <div className="flex flex-col items-center mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-700">
                    {allSolutions.length === 1 ? 
                      `The Only Solution on ${n}×${n} Chessboard` : 
                      `Solution ${currentSolution + 1} on ${n}×${n} Chessboard`
                    }
                  </h3>
                  <div 
                    data-testid="chess-board"
                    className="inline-grid border-2 border-gray-800"
                    style={{
                      gridTemplateColumns: `repeat(${n}, 2rem)`,
                      gridTemplateRows: `repeat(${n}, 2rem)`
                    }}
                  >
                    {createBoard(allSolutions[currentSolution])}
                  </div>
                  <div className="text-sm text-gray-600 mt-2 text-center">
                    <p>♛ = Queen placed safely (no attacks)</p>
                  </div>
                </div>

                {}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold mb-2 text-gray-700">Solution Array Format:</h4>
                  <pre className="bg-white p-3 rounded border text-sm overflow-x-auto">
                    {JSON.stringify(allSolutions[currentSolution], null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {}
            {!showAllSolutions && solutionCount > 0 && (
              <div className="flex flex-col items-center mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-700">
                  Empty {n}×{n} Chessboard
                </h3>
                <div 
                  data-testid="chess-board"
                  className="inline-grid border-2 border-gray-800"
                  style={{
                    gridTemplateColumns: `repeat(${n}, 2rem)`,
                    gridTemplateRows: `repeat(${n}, 2rem)`
                  }}
                >
                  {createBoard()}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Click "Show All Solutions" to see the actual queen placements
                </p>
              </div>
            )}

            {}
            {solutionCount === 0 && (
              <div className="flex flex-col items-center mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-700">
                  Empty {n}×{n} Chessboard (No Solutions Possible)
                </h3>
                <div 
                  data-testid="chess-board"
                  className="inline-grid border-2 border-gray-800"
                  style={{
                    gridTemplateColumns: `repeat(${n}, 2rem)`,
                    gridTemplateRows: `repeat(${n}, 2rem)`
                  }}
                >
                  {createBoard()}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  No valid queen placements possible for this board size
                </p>
              </div>
            )}

            {executionTime && (
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <span className="font-medium">Execution Time:</span><br />
                    {executionTime}ms
                  </div>
                  <div>
                    <span className="font-medium">Board Size:</span><br />
                    {n}×{n} = {n*n} squares
                  </div>
                  <div>
                    <span className="font-medium">Expected Count:</span><br />
                    {expectedCounts[n] !== undefined ? (
                      <span className="text-green-600">
                        ✓ {expectedCounts[n]}
                      </span>
                    ) : (
                      'Not available'
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {solutionCount === null && !isLoading && (
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg">
              Choose "Count Only" for fast results or "Show All Solutions" to see each solution visually
            </p>
          </div>
        )}
      </div>
    </div>
  );
}