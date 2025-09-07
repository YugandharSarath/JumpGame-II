# Jump Game II - Test Cases

## Example Test Cases

### Example 1
**Input**: `nums = [2,3,1,1,4]`
**Output**: `2`
**Explanation**: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.

**Step-by-step**:
1. Start at index 0 (value=2): can reach indices 1, 2
2. Jump to index 1 (value=3): can reach indices 2, 3, 4
3. Jump to index 4: reached the end
4. Total jumps: 2

### Example 2
**Input**: `nums = [2,3,0,1,4]`
**Output**: `2`
**Explanation**: Same as Example 1, but with a 0 at index 2.

**Step-by-step**:
1. Start at index 0 (value=2): can reach indices 1, 2
2. Jump to index 1 (value=3): can reach indices 2, 3, 4
3. Jump to index 4: reached the end
4. Total jumps: 2

## Edge Cases

### Single Element
**Input**: `nums = [0]`
**Output**: `0`
**Explanation**: Already at the target index.

### Two Elements
**Input**: `nums = [1,0]`
**Output**: `1`
**Explanation**: One jump from index 0 to index 1.

**Input**: `nums = [2,1]`
**Output**: `1`
**Explanation**: One jump from index 0 to index 1.

### Large Single Jump
**Input**: `nums = [5,1,1,1,1,1]`
**Output**: `1`
**Explanation**: Can jump directly from index 0 to index 5.

### All Minimum Jumps
**Input**: `nums = [1,1,1,1,1]`
**Output**: `4`
**Explanation**: Must make 4 jumps: 0→1→2→3→4.

### Mixed Values
**Input**: `nums = [1,2,3]`
**Output**: `2`
**Explanation**: 0→1→2 (2 jumps) or 0→2 (1 jump), but from index 2 we need one more jump, so minimum is 2.

Wait, let me recalculate: from index 0 we can reach index 1, from index 1 we can reach up to index 3, so it should be 1 jump.

**Corrected**: `nums = [1,2,3]` → Output: `1` (0→2 in one jump)

### Zero Obstacles
**Input**: `nums = [2,0,0,1,4]`
**Output**: `2`
**Explanation**: 0→1→4 or 0→2→4, both take 2 jumps.

Wait, from index 0 (value=2) we can reach index 2, then from index 2 (value=0) we can't move. Let me recalculate:
From index 0 we can reach indices 1,2. From index 1 (value=0) we can't move further. This seems impossible.

**Corrected**: `nums = [3,0,0,1,4]` → Output: `2`
**Explanation**: 0→3→4 (2 jumps)

## Comprehensive Test Suite

### Basic Cases
```javascript

testCase([0], 0)
testCase([1,0], 1) 
testCase([2,1], 1)

testCase([1,1,1], 2)
testCase([1,2,1], 2) 
testCase([2,1,1], 2)
testCase([1,1,2], 2)
```

### Medium Cases
```javascript

testCase([2,3,1,1,4], 2)
testCase([2,3,0,1,4], 2)

testCase([1,2,3,4,5], 1)
testCase([5,4,3,2,1,0], 1)
testCase([1,1,1,1,1,1], 5)
testCase([2,2,2,2,2], 3)
```

### Complex Cases
```javascript

testCase([10,1,1,1,1,1,1,1,1,1,1], 1)
testCase([1,10,1,1,1,1,1,1,1,1,1], 2)

testCase([3,0,0,0,4,0,0], 2)
testCase([4,1,1,1,1,1,1,1], 2)

testCase([1,1,1,1,0], 4)
testCase([2,1,0,3,0], 2)
```

### Boundary Cases
```javascript

testCase(Array(10000).fill(1), 9999)  
testCase([9999].concat(Array(9999).fill(0)), 1)  

testCase([1,0], 1)
testCase([0,1], "impossible") 

testCase([1000,0], 1)
testCase([1,1000], 1)
```

## Performance Test Cases

### Large Arrays
```javascript

const largeArray1 = Array(5000).fill(2);  
const largeArray2 = [5000].concat(Array(4999).fill(1));  
const largeArray3 = Array(10000).fill(1);  
```

### Stress Tests
```javascript

const alternating = [];
for(let i = 0; i < 1000; i++) {
    alternating.push(i % 2 === 0 ? 2 : 1);
}

const fib = [1, 1];
for(let i = 2; i < 100; i++) {
    fib.push(Math.min(fib[i-1] + fib[i-2], 1000));
}
```

## Validation Rules

### Input Validation
- Array length must be between 1 and 10,000
- Each element must be between 0 and 1,000
- Must be guaranteed reachable (per problem statement)

### Output Validation
- Result must be a non-negative integer
- Result must be the minimum possible jumps
- For array of length n, maximum jumps is n-1

### Algorithm Validation
- Must run in O(n) time
- Must use O(1) extra space
- Must handle all edge cases correctly