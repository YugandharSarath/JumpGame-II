# N-Queens Test Cases

## Basic Test Cases

### Test Case 1: Minimum Size (n=1)
```javascript
Input: n = 1
Expected Output: [["Q"]]
Explanation: Only one square, one queen, one solution
```

### Test Case 2: No Solution (n=2)
```javascript
Input: n = 2
Expected Output: []
Explanation: Impossible to place 2 queens on 2x2 board without attacks
```

### Test Case 3: No Solution (n=3)  
```javascript
Input: n = 3
Expected Output: []
Explanation: Impossible to place 3 queens on 3x3 board without attacks
```

### Test Case 4: Classic Example (n=4)
```javascript
Input: n = 4
Expected Output: [
    [".Q..", "...Q", "Q...", "..Q."],
    ["..Q.", "Q...", "...Q", ".Q.."]
]
Explanation: Exactly 2 distinct solutions exist for 4x4 board

Visual representation:
Solution 1:        Solution 2:
. Q . .           . . Q .
. . . Q           Q . . .
Q . . .           . . . Q
. . Q .           . Q . .
```

## Comprehensive Test Cases

### Test Case 5: Medium Size (n=5)
```javascript
Input: n = 5
Expected Output: 10 solutions total
Sample solutions:
[
    ["Q....", "..Q..", "....Q", ".Q...", "...Q."],
    ["Q....", "...Q.", ".Q...", "....Q", "..Q.."],

]
```

### Test Case 6: Larger Size (n=6)
```javascript
Input: n = 6
Expected Output: 4 solutions total
```

### Test Case 7: Standard Chess (n=8)
```javascript
Input: n = 8
Expected Output: 92 solutions total
Note: This is the classic 8-queens problem
```

### Test Case 8: Maximum Constraint (n=9)
```javascript
Input: n = 9
Expected Output: 352 solutions total
```

## Edge Cases & Error Handling

### Test Case 9: Below Minimum
```javascript
Input: n = 0
Expected Behavior: Handle gracefully (return [] or error)
```

### Test Case 10: Above Maximum
```javascript
Input: n = 10
Expected Behavior: Handle gracefully (return [] or error based on constraint)
```

### Test Case 11: Invalid Input Types
```javascript
Input: n = "4" (string)
Expected Behavior: Convert to number or handle error
Input: n = 4.5 (float)
Expected Behavior: Convert to integer or handle error
Input: n = null
Expected Behavior: Handle gracefully
```

## Validation Test Cases

### Test Case 12: Solution Format Validation
```javascript
For any valid solution array:
- Each solution should have exactly n strings
- Each string should have exactly n characters  
- Each string should contain exactly 1 'Q' and (n-1) '.' characters
- Characters should only be 'Q' or '.'
```

### Test Case 13: No Attacking Queens Validation
```javascript
For any valid solution:
- No two queens in same row (guaranteed by algorithm)
- No two queens in same column
- No two queens on same diagonal (both directions)

Validation logic:
function validateSolution(board) {
    const n = board.length;
    const positions = [];

    for (let i = 0; i < n; i++) {
        const j = board[i].indexOf('Q');
        positions.push([i, j]);
    }

    for (let i = 0; i < positions.length; i++) {
        for (let k = i + 1; k < positions.length; k++) {
            const [r1, c1] = positions[i];
            const [r2, c2] = positions[k];

            if (c1 === c2) return false;

            if (Math.abs(r1 - r2) === Math.abs(c1 - c2)) return false;
        }
    }
    return true;
}
```

## Performance Test Cases

### Test Case 14: Time Complexity
```javascript

const start = Date.now();
const result = solveNQueens(8);
const end = Date.now();
expect(end - start).toBeLessThan(5000); 
```

### Test Case 15: Memory Usage
```javascript

expect(() => solveNQueens(9)).not.toThrow();
```

## Expected Solution Counts

| n | Number of Solutions | Notes |
|---|-------------------|-------|
| 1 | 1 | Trivial case |
| 2 | 0 | No solution exists |  
| 3 | 0 | No solution exists |
| 4 | 2 | Classic small example |
| 5 | 10 | |
| 6 | 4 | |
| 7 | 40 | |
| 8 | 92 | Traditional 8-queens |
| 9 | 352 | Maximum constraint |

## Integration Test Cases

### Test Case 16: UI Integration
```javascript

- Input field accepts numbers 1-9
- Solve button triggers calculation
- Results display correct count
- Chess board visualizes solutions correctly
- Navigation buttons work for multiple solutions
```

### Test Case 17: API Integration  
```javascript

const solveNQueens = require('./N-Queens');
expect(typeof solveNQueens).toBe('function');
expect(solveNQueens(4)).toHaveLength(2);
```

## Regression Test Cases

### Test Case 18: Solution Uniqueness
```javascript
const solutions = solveNQueens(4);
const uniqueSolutions = new Set(solutions.map(s => JSON.stringify(s)));
expect(uniqueSolutions.size).toBe(solutions.length);
```

### Test Case 19: Solution Completeness
```javascript

const solutions = solveNQueens(4);
expect(solutions).toHaveLength(2);

const solution1 = [".Q..", "...Q", "Q...", "..Q."];
const solution2 = ["..Q.", "Q...", "...Q", ".Q.."];
expect(solutions).toContainEqual(solution1);
expect(solutions).toContainEqual(solution2);
```

## Stress Test Cases

### Test Case 20: Boundary Performance
```javascript

const start = performance.now();
const result = solveNQueens(9);
const duration = performance.now() - start;

expect(result).toHaveLength(352);
expect(duration).toBeLessThan(10000); 
```