import "@testing-library/jest-dom";
const totalNQueens = require("./Queen");

describe("N-Queens II Problem", () => {
  test("n = 1 should return 1 (single solution)", () => {
    const result = totalNQueens(1);
    expect(result).toBe(1);
  });

  test("n = 2 should return 0 (no solution)", () => {
    const result = totalNQueens(2);
    expect(result).toBe(0);
  });

  test("n = 3 should return 0 (no solution)", () => {
    const result = totalNQueens(3);
    expect(result).toBe(0);
  });

  test("n = 4 should return 2 solutions", () => {
    const result = totalNQueens(4);
    expect(result).toBe(2);
  });

  test("n = 5 should return 10 solutions", () => {
    const result = totalNQueens(5);
    expect(result).toBe(10);
  });

  test("n = 6 should return 4 solutions", () => {
    const result = totalNQueens(6);
    expect(result).toBe(4);
  });

  test("n = 7 should return 40 solutions", () => {
    const result = totalNQueens(7);
    expect(result).toBe(40);
  });

  test("n = 8 should return 92 solutions", () => {
    const result = totalNQueens(8);
    expect(result).toBe(92);
  });

  test("n = 9 should return 352 solutions", () => {
    const result = totalNQueens(9);
    expect(result).toBe(352);
  });

  test("function should return a number", () => {
    const result = totalNQueens(4);
    expect(typeof result).toBe("number");
    expect(Number.isInteger(result)).toBe(true);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  test("performance: n = 8 should complete within reasonable time", () => {
    const start = performance.now();
    const result = totalNQueens(8);
    const end = performance.now();

    expect(result).toBe(92);
    expect(end - start).toBeLessThan(1000);
  });

  test("performance: n = 9 should complete within reasonable time", () => {
    const start = performance.now();
    const result = totalNQueens(9);
    const end = performance.now();

    expect(result).toBe(352);
    expect(end - start).toBeLessThan(5000);
  });

  test("edge case: maximum constraint n = 9", () => {
    const result = totalNQueens(9);
    expect(result).toBe(352);
  });

  test("consistency: multiple calls should return same result", () => {
    const n = 6;
    const result1 = totalNQueens(n);
    const result2 = totalNQueens(n);
    const result3 = totalNQueens(n);

    expect(result1).toBe(result2);
    expect(result2).toBe(result3);
    expect(result1).toBe(4);
  });

  test("boundary values should work correctly", () => {
    expect(totalNQueens(1)).toBe(1);

    expect(totalNQueens(9)).toBe(352);
  });

  test("known sequence validation", () => {
    const expectedSequence = [1, 0, 0, 2, 10, 4, 40, 92, 352];

    for (let n = 1; n <= 9; n++) {
      expect(totalNQueens(n)).toBe(expectedSequence[n - 1]);
    }
  });

  test("algorithm efficiency: should not return solutions array", () => {
    const result = totalNQueens(4);
    expect(Array.isArray(result)).toBe(false);
    expect(typeof result).toBe("number");
  });

  test("verify algorithm correctness by checking smaller cases manually", () => {
    expect(totalNQueens(1)).toBe(1);

    expect(totalNQueens(2)).toBe(0);

    expect(totalNQueens(3)).toBe(0);

    expect(totalNQueens(4)).toBe(2);
  });
});
