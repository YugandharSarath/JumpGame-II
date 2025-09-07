
---

# Jump Game II

## Problem Statement

You are given a **0-indexed** array `nums` of length `n`. You start at index `0`.
Each element `nums[i]` represents the maximum jump length from that index.

Your task is to return the **minimum number of jumps** required to reach index `n - 1`.
It is guaranteed that you can always reach the last index.

---

## Requirements

* Calculate minimum jumps to reach the end.
* Handle arrays of length `1` to `10,000` with values `0` to `1000`.
* Must run in **O(n)** time and **O(1)** extra space.
* UI must be responsive and allow interactive step-by-step visualization.

---

## Edge Cases & Constraints

* **Edge Cases:**

  * `[0]` → Output `0` (already at end)
  * `[1,0]` → Output `1`
  * `[5,1,1,1,1,1]` → Output `1` (single big jump)
  * `[1,1,1,1,1]` → Output `4` (minimum jumps one by one)
  * `[2,0,0,1,4]` → Must jump over zeros successfully
* **Constraints:**

  * `1 ≤ nums.length ≤ 10^4`
  * `0 ≤ nums[i] ≤ 1000`
  * Always possible to reach `nums[n - 1]`
  * Must stay efficient even for 10,000 elements
  * Handle invalid input gracefully (empty, negative, non-numeric)

---

## Data Test IDs

* **Main Container:** `jump-game-container`
* **Input Section:** `array-input`, `calculate-btn`, `example1-btn`, `example2-btn`, `error-message`
* **Visualization Section:** `array-visualization`, `array-element-{index}`, `visualize-btn`, `reset-btn`
* **Results Section:** `result-section`, `result-value`, `step-{index}`

---

