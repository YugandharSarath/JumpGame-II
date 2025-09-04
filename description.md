# N-Queens II Problem 

## Problem

Count the number of distinct solutions to place `n` queens on an `n × n` chessboard so that no two queens attack each other (no same row, column, or diagonal).

## Requirements

* **Input**: Integer `n` (1 ≤ n ≤ 9)
* **Output**: `Integer` — count of all distinct valid solutions
* Return only the count, not the actual solutions
* Must count **all unique solutions**
* Use optimized backtracking for efficiency
* Handle n ≤ 9 quickly with reasonable memory usage


## Edge Cases & Constraints

* n = 1 → `1` (one solution)
* n = 2 or 3 → `0` (no solutions)
* n < 1 or n > 9 → return `0` or show error
* Must count **all unique solutions** efficiently
* Expected counts for validation:
  - n=4: 2 solutions
  - n=5: 10 solutions  
  - n=6: 4 solutions
  - n=7: 40 solutions
  - n=8: 92 solutions
  - n=9: 352 solutions

## Data-Tests

* `data-testid="n-input"` → Board size input
* `data-testid="solve-button"` → Count trigger
* `data-testid="solution-count"` → Total solution count display
* `data-testid="chess-board"` → Optional board visualization (empty reference board)


## Key Differences from N-Queens I

* **N-Queens I**: Returns `Array<Array<string>>` with all solutions
* **N-Queens II**: Returns `number` with count only
* **Optimization**: Can avoid storing board states and solution arrays
* **Memory**: Much more memory efficient for large n
* **Performance**: Faster since no string/array construction needed