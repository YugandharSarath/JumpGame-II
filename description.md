
---

# N-Queens Problem 

## Problem

Place `n` queens on an `n × n` chessboard so that no two queens attack each other (no same row, column, or diagonal).

## Requirements

* **Input**: Integer `n` (1 ≤ n ≤ 9)
* **Output**: `Array<Array<string>>` — all distinct valid solutions
* Each solution = array of `n` strings
* `'Q'` = queen, `'.'` = empty cell
* Each row string must have exactly one `'Q'`

## Edge Cases & Constraints

* n = 1 → `[["Q"]]`
* n = 2 or 3 → `[]` (no solutions)
* n < 1 or n > 9 → return `[]` or show error
* Must return **all unique solutions**
* Any order is fine
* Use backtracking for efficiency
* Handle n ≤ 9 quickly, reasonable memory usage

## Data-Tests

* `data-testid="n-input"` → Board size input
* `data-testid="solve-button"` → Solve trigger
* `data-testid="solution-count"` → Total solutions
* `data-testid="chess-board"` → Board visualization
* `data-testid="current-solution"` → Current solution index
* `data-testid="prev-solution"` → Previous solution button
* `data-testid="next-solution"` → Next solution button

---

