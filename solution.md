# N-Queens Problem - Complete Solution

## Algorithm Overview

The N-Queens problem is solved using **backtracking**, a systematic method of trying all possible configurations while eliminating invalid paths early.

### Core Strategy
1. **Place queens row by row** (eliminates row conflicts automatically)
2. **For each row, try each column position**
3. **Check if placement is valid** (no column or diagonal conflicts)
4. **If valid, recursively solve next row**
5. **If invalid or no solution found, backtrack and try next position**
6. **Collect all complete valid solutions**

## Complete Implementation

```javascript
function solveNQueens(n) {
    const result = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));

    function isValid(row, col) {

        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }

        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }

        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }

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
```

## Step-by-Step Explanation

### 1. Data Structure Setup
```javascript
const result = [];  
const board = Array(n).fill().map(() => Array(n).fill('.'));  
```
- `result`: Collects all valid complete solutions
- `board`: 2D array representing current state, '.' for empty, 'Q' for queen

### 2. Validation Function
```javascript
function isValid(row, col) {

```

**Column Check**: Look up the column for any existing queens
```javascript
for (let i = 0; i < row; i++) {
    if (board[i][col] === 'Q') return false;
}
```

**Diagonal Checks**: Check both diagonal directions above current position
```javascript

for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 'Q') return false;
}

for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
    if (board[i][j] === 'Q') return false;
}
```

### 3. Backtracking Logic
```javascript
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
```

## Complexity Analysis

### Time Complexity: O(N!)
- **In worst case**: Try all possible positions
- **First row**: N choices
- **Second row**: ~(N-2) valid choices (avoid conflicts)  
- **Third row**: ~(N-4) valid choices
- **Total**: N × (N-2) × (N-4) × ... ≈ O(N!)
- **In practice**: Much better due to early pruning

### Space Complexity: O(N²)
- **Board storage**: O(N²)
- **Recursion depth**: O(N) 
- **Result storage**: O(N² × solutions) - not counted in algorithm complexity

## Algorithm Walkthrough (n=4 example)

```
Initial board:        Try (0,0):           Invalid (0,1):
. . . .              Q . . .              . Q . .
. . . .              . . . .              . . . .  
. . . .              . . . .              . . . .
. . . .              . . . .              . . . .

Try (0,1):           Try (1,3):           Try (2,1):           Invalid - attacks
. Q . .              . Q . .              . Q . .              (0,1) and (2,1)
. . . .              . . . Q              . Q . .              same column
. . . .              . . . .              . . . .
. . . .              . . . .              . . . .

... backtrack and continue ...

Final solution 1:     Final solution 2:
. Q . .              . . Q .
. . . Q              Q . . .  
Q . . .              . . . Q
. . Q .              . Q . .
```

## Optimized Variations

### 1. Using Sets for O(1) Conflict Detection
```javascript
function solveNQueensOptimized(n) {
    const result = [];
    const cols = new Set();          
    const diag1 = new Set();         
    const diag2 = new Set();         
    const board = Array(n).fill().map(() => Array(n).fill('.'));

    function backtrack(row) {
        if (row === n) {
            result.push(board.map(row => row.join('')));
            return;
        }

        for (let col = 0; col < n; col++) {
            const d1 = row - col;
            const d2 = row + col;

            if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) {
                continue; 
            }

            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(d1);
            diag2.add(d2);

            backtrack(row + 1);

            board[row][col] = '.';
            cols.delete(col);
            diag1.delete(d1);
            diag2.delete(d2);
        }
    }

    backtrack(0);
    return result;
}
```

### 2. Count-Only Version (Faster)
```javascript
function countNQueens(n) {
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
```

## Common Mistakes & Solutions

### 1. Forgetting to Backtrack
```javascript

board[row][col] = 'Q';
backtrack(row + 1);

board[row][col] = 'Q';
backtrack(row + 1);  
board[row][col] = '.';  
```

### 2. Checking Unnecessary Positions
```javascript

function isValid(row, col) {
    for (let i = 0; i < n; i++) {  
        if (board[i][col] === 'Q') return false;
    }
}

function isValid(row, col) {
    for (let i = 0; i < row; i++) {  
        if (board[i][col] === 'Q') return false;
    }
}
```

### 3. Incorrect Solution Format
```javascript

result.push(board);  

result.push(board.map(row => row.join('')));
```

## Testing Strategy

### Unit Tests
```javascript
describe('N-Queens Solutions', () => {
    test('n=1 returns single solution', () => {
        expect(solveNQueens(1)).toEqual([['Q']]);
    });

    test('n=4 returns exactly 2 solutions', () => {
        const result = solveNQueens(4);
        expect(result).toHaveLength(2);
        expect(result).toContain(['.Q..', '...Q', 'Q...', '..Q.']);
        expect(result).toContain(['..Q.', 'Q...', '...Q', '.Q..']);
    });

    test('no solution cases return empty array', () => {
        expect(solveNQueens(2)).toEqual([]);
        expect(solveNQueens(3)).toEqual([]);
    });
});
```

### Validation Tests
```javascript
function validateAllSolutions(n) {
    const solutions = solveNQueens(n);

    solutions.forEach(solution => {

        expect(solution).toHaveLength(n);
        solution.forEach(row => {
            expect(row).toHaveLength(n);
            expect(row.match(/Q/g)).toHaveLength(1);
        });

        const positions = solution.map((row, i) => [i, row.indexOf('Q')]);
        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                const [r1, c1] = positions[i];
                const [r2, c2] = positions[j];
                expect(c1).not.toBe(c2);  
                expect(Math.abs(r1-r2)).not.toBe(Math.abs(c1-c2));  
            }
        }
    });
}
```

