# Jump Game II - Solution

## Algorithm Overview

The Jump Game II problem can be solved optimally using a **Greedy Algorithm** that tracks jump boundaries. The key insight is that we don't need to explore all possible paths - we can make optimal decisions at each step.

### Core Concept: Jump Boundaries

Think of the problem in terms of "levels" or "boundaries":
- **Level 0**: Starting position (index 0)
- **Level 1**: All positions reachable with 1 jump
- **Level 2**: All positions reachable with 2 jumps
- And so on...

We want to find the minimum level that contains the target index.

## Detailed Algorithm

### Greedy Approach - O(n) Solution

```javascript
function jump(nums) {
    const n = nums.length;
    if (n <= 1) return 0;

    let jumps = 0;          
    let currentEnd = 0;     
    let farthest = 0;       

    for (let i = 0; i < n - 1; i++) {

        farthest = Math.max(farthest, i + nums[i]);

        if (i === currentEnd) {
            jumps++;                    
            currentEnd = farthest;      

            if (currentEnd >= n - 1) {
                break;
            }
        }
    }

    return jumps;
}
```

### Step-by-Step Walkthrough

**Example**: `nums = [2,3,1,1,4]`

| i | nums[i] | farthest | i === currentEnd | jumps | currentEnd |
|---|---------|----------|------------------|-------|------------|
| 0 | 2       | 2        | Yes (0)          | 1     | 2          |
| 1 | 3       | 4        | No               | 1     | 2          |
| 2 | 1       | 4        | Yes (2)          | 2     | 4          |

**Result**: 2 jumps

**Detailed Steps**:
1. **i=0**: From index 0, can reach up to index 2. Since i equals currentEnd (0), make jump 1. New boundary is index 2.
2. **i=1**: From index 1, can reach up to index 4. Update farthest to 4, but don't jump yet.
3. **i=2**: From index 2, can reach up to index 3. Since i equals currentEnd (2), make jump 2. New boundary is index 4.
4. **i=3**: We can stop here since currentEnd (4) ≥ n-1 (4).

## Alternative Approaches

### 1. BFS Approach - O(n²) Solution

```javascript
function jumpBFS(nums) {
    if (nums.length <= 1) return 0;

    const queue = [[0, 0]]; 
    const visited = new Set([0]);

    while (queue.length > 0) {
        const [index, jumps] = queue.shift();

        for (let i = 1; i <= nums[index]; i++) {
            const nextIndex = index + i;

            if (nextIndex === nums.length - 1) {
                return jumps + 1;
            }

            if (nextIndex < nums.length && !visited.has(nextIndex)) {
                visited.add(nextIndex);
                queue.push([nextIndex, jumps + 1]);
            }
        }
    }

    return -1; 
}
```

**Complexity**: O(n²) time, O(n) space
**Why not optimal**: Explores many unnecessary paths

### 2. Dynamic Programming - O(n²) Solution

```javascript
function jumpDP(nums) {
    const n = nums.length;
    const dp = new Array(n).fill(Infinity);
    dp[0] = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 1; j <= nums[i] && i + j < n; j++) {
            dp[i + j] = Math.min(dp[i + j], dp[i] + 1);
        }
    }

    return dp[n - 1];
}
```

**Complexity**: O(n²) time, O(n) space
**Why not optimal**: Recalculates overlapping subproblems unnecessarily

## Why Greedy is Optimal

### Proof of Correctness

The greedy algorithm works because:

1. **Optimal Substructure**: If we can reach index i in k jumps optimally, then we can reach any index j ≤ i in ≤ k jumps optimally.

2. **Greedy Choice Property**: At each boundary, choosing the position that allows us to reach the farthest is always optimal. There's never a benefit to choosing a position that reaches less far.

3. **No Backtracking Needed**: Once we determine the optimal number of jumps to reach a certain boundary, we never need to reconsider.

### Mathematical Insight

At each jump boundary, we have complete information about all reachable positions with the current number of jumps. The optimal strategy is always to extend our reach as far as possible, which the greedy approach does.

## Complexity Analysis

### Time Complexity: O(n)
- Single pass through the array
- Each element is processed exactly once
- No nested loops or recursive calls

### Space Complexity: O(1)
- Only using a constant number of variables
- No additional data structures that grow with input size

## Edge Cases Handling

### Single Element Array
```javascript
nums = [0] → return 0
```
Already at the target, no jumps needed.

### Two Element Array
```javascript
nums = [1,0] → return 1
nums = [2,1] → return 1
```
One jump is always needed and sufficient.

### Large Jump Values
```javascript
nums = [10,1,1,1,1] → return 1
```
Can jump directly to the end.

### All Minimum Jumps
```javascript
nums = [1,1,1,1] → return 3
```
Must make minimum possible jumps at each step.

## Common Pitfalls and How to Avoid Them

### Pitfall 1: Off-by-One Errors
❌ **Wrong**: `for (let i = 0; i < n; i++)`
✅ **Correct**: `for (let i = 0; i < n - 1; i++)`

**Reason**: We don't need to jump from the last index.

### Pitfall 2: Premature Jump Counting
❌ **Wrong**: Increment jumps at every position
✅ **Correct**: Increment jumps only when reaching a boundary

### Pitfall 3: Not Tracking Farthest Correctly
❌ **Wrong**: `farthest = i + nums[i]`
✅ **Correct**: `farthest = Math.max(farthest, i + nums[i])`

### Pitfall 4: Missing Early Termination
Adding the early termination check improves performance:
```javascript
if (currentEnd >= n - 1) {
    break;
}
```

## Optimization Tips

### 1. Early Termination
Stop as soon as we can reach the target:
```javascript
if (currentEnd >= n - 1) {
    break;
}
```

### 2. Input Validation
Add bounds checking for interview scenarios:
```javascript
if (nums.length <= 1) return 0;
if (nums[0] === 0 && nums.length > 1) return -1; 
```

### 3. Cleaner Variable Names
Use descriptive names to avoid confusion:
```javascript
let jumpsCount = 0;
let currentBoundary = 0;
let maxReachable = 0;
```

## Interview Discussion Points

### Why Not BFS?
- BFS would work but is O(n²) in worst case
- Greedy is more elegant and efficient
- Shows deeper algorithmic understanding

### Comparison to Jump Game I
- Jump Game I: "Can you reach the end?" (Boolean)
- Jump Game II: "What's the minimum jumps to reach the end?" (Integer)
- Jump Game I can use similar greedy approach but simpler

### Real-world Applications
- Shortest path problems with uniform costs
- Game AI for platformer games
- Network routing optimization
- Resource allocation problems