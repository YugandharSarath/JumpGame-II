import '@testing-library/jest-dom';
const solveNQueens = require('./Queen');


describe('N-Queens Problem', () => {
    test('n = 1 should return single solution', () => {
        const result = solveNQueens(1);
        expect(result).toEqual([['Q']]);
        expect(result).toHaveLength(1);
    });

    test('n = 2 should return empty array (no solution)', () => {
        const result = solveNQueens(2);
        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
    });

    test('n = 3 should return empty array (no solution)', () => {
        const result = solveNQueens(3);
        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
    });

    test('n = 4 should return 2 solutions', () => {
        const result = solveNQueens(4);
        expect(result).toHaveLength(2);

        const expectedSolutions = [
            ['.Q..', '...Q', 'Q...', '..Q.'],
            ['..Q.', 'Q...', '...Q', '.Q..']
        ];

        expect(result).toEqual(expect.arrayContaining(expectedSolutions));
    });

    test('n = 5 should return 10 solutions', () => {
        const result = solveNQueens(5);
        expect(result).toHaveLength(10);
    });

    test('n = 6 should return 4 solutions', () => {
        const result = solveNQueens(6);
        expect(result).toHaveLength(4);
    });

    test('n = 8 should return 92 solutions', () => {
        const result = solveNQueens(8);
        expect(result).toHaveLength(92);
    });

    test('each solution should have correct format', () => {
        const result = solveNQueens(4);

        result.forEach(solution => {
            expect(solution).toHaveLength(4);
            solution.forEach(row => {
                expect(row).toHaveLength(4);
                expect(row).toMatch(/^[Q.]{4}$/);
                expect((row.match(/Q/g) || []).length).toBe(1);
            });
        });
    });

    test('queens should not attack each other in valid solutions', () => {
        const result = solveNQueens(4);

        result.forEach(solution => {
            const queens = [];

            for (let i = 0; i < solution.length; i++) {
                for (let j = 0; j < solution[i].length; j++) {
                    if (solution[i][j] === 'Q') {
                        queens.push([i, j]);
                    }
                }
            }

            for (let i = 0; i < queens.length; i++) {
                for (let j = i + 1; j < queens.length; j++) {
                    const [r1, c1] = queens[i];
                    const [r2, c2] = queens[j];

                    expect(r1).not.toBe(r2);
                    expect(c1).not.toBe(c2);

                    expect(Math.abs(r1 - r2)).not.toBe(Math.abs(c1 - c2));
                }
            }
        });
    });

    test('edge case: maximum constraint n = 9', () => {
        const result = solveNQueens(9);
        expect(result).toHaveLength(352);
    });
});