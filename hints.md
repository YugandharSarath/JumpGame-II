# Jump Game II - Hints

## Understanding the Problem

### Key Insights
1. **Greedy Approach**: We don't need to try all possible paths - we can make optimal choices at each step
2. **Jump Boundaries**: Think in terms of "ranges" that can be reached with a certain number of jumps
3. **Forward Looking**: At each position, consider the farthest point reachable from that position

## Algorithm Hints

### Hint 1: Greedy Strategy
- We want to minimize jumps, so at each "boundary" we should make a jump
- The question is: where should we jump to maximize our future options?

### Hint 2: Two Pointers Technique
- Keep track of the current "reachable boundary" with the current number of jumps
- Keep track of the "farthest point" reachable if we make one more jump

### Hint 3: When to Jump
- We only need to increment the jump counter when we reach the end of our current boundary
- At that point, our new boundary becomes the farthest point we discovered

## Step-by-Step Approach

### Phase 1: Initialize Variables
```
jumps = 0          // Number of jumps made so far
currentEnd = 0     // Farthest index reachable with current jumps
farthest = 0       // Farthest index reachable with one more jump
```

### Phase 2: Iterate Through Array
For each position `i` from `0` to `n-2`:
1. Update `farthest = max(farthest, i + nums[i])`
2. If `i == currentEnd`:
   - Increment `jumps`
   - Set `currentEnd = farthest`

### Phase 3: Early Termination
- If `currentEnd >= n-1`, we can reach the end, so break

## Visual Understanding

### Example: [2,3,1,1,4]
```
Index:  0  1  2  3  4
Value:  2  3  1  1  4
        ^
From index 0: can reach indices 1, 2
```

**Jump 1**: From index 0, we can reach up to index 2
- Current boundary: index 0
- Farthest reachable: index 2
- When we reach the boundary (index 0), make jump 1
- New boundary: index 2

**Jump 2**: From indices 1-2, we can reach up to index 4
- From index 1: can reach up to 1+3=4
- From index 2: can reach up to 2+1=3
- Farthest reachable: index 4
- When we reach the boundary (index 2), make jump 2
- New boundary: index 4 (which includes the target!)

## Common Pitfalls to Avoid

### Pitfall 1: Over-complicating with BFS/DFS
- This problem doesn't require exploring all paths
- Greedy approach is sufficient and more efficient

### Pitfall 2: Off-by-one Errors
- Loop should go to `n-2`, not `n-1` (we don't need to jump from the last index)
- Array indices are 0-based

### Pitfall 3: Unnecessary Jump Counting
- Don't increment jumps at every position
- Only increment when you reach the current boundary

### Pitfall 4: Not Handling Edge Cases
- Single element array: return 0 (no jumps needed)
- Two element array: return 1 (one jump needed)

## Optimization Tips

### Time Complexity: O(n)
- Single pass through the array
-