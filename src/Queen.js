import React, { useState } from "react";

function totalNQueens(n) {
  let count = 0;
  const cols = new Set();
  const diag1 = new Set(); // row - col
  const diag2 = new Set(); // row + col

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

// CommonJS export for tests
module.exports = totalNQueens;

// React component export
export function NQueens2App() {
  const [n, setN] = useState(4);
  const [solutionCount, setSolutionCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);

  const expectedCounts = {
    1: 1, 2: 0, 3: 0, 4: 2, 5: 10, 
    6: 4, 7: 40, 8: 92, 9: 352
  };

  const handleSolve = () => {
    if (n < 1 || n > 9) return;
    setIsLoading(true);
    setSolutionCount(null);
    setExecutionTime(null);

    setTimeout(() => {
      const startTime = performance.now();
      const count = totalNQueens(n);
      const endTime = performance.now();
      
      setSolutionCount(count);
      setExecutionTime((endTime - startTime).toFixed(2));
      setIsLoading(false);
    }, 100);
  };

  const createReferenceBoard = (size) => {
    const squares = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        squares.push(
          <div
            key={`${row}-${col}`}
            className={`w-8 h-8 flex items-center justify-center border border-gray-400 ${
              (row + col) % 2 === 0 ? "bg-amber-100" : "bg-amber-700"
            }`}
          />
        );
      }
    }
    return squares;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        N-Queens II Problem Solver
      </h1>
      
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="text-center mb-6">
          <p className="text-gray-600 text-lg mb-4">
            Count the number of distinct solutions to place n queens on an n×n chessboard
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
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
          <button
            data-testid="solve-button"
            onClick={handleSolve}
            disabled={isLoading || n < 1 || n > 9}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-semibold text-lg"
          >
            {isLoading ? "Counting..." : "Count Solutions"}
          </button>
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

            <div className="flex flex-col items-center mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                {n}×{n} Chessboard Reference
              </h3>
              <div 
                data-testid="chess-board"
                className="inline-grid border-2 border-gray-800 opacity-70"
                style={{
                  gridTemplateColumns: `repeat(${n}, 2rem)`,
                  gridTemplateRows: `repeat(${n}, 2rem)`
                }}
              >
                {createReferenceBoard(n)}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Empty board shown for reference - {solutionCount} valid arrangements exist
              </p>
            </div>

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
              Enter a board size and click "Count Solutions" to see the result
            </p>
          </div>
        )}
      </div>
    </div>
  );
}