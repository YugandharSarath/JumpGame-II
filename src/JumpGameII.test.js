import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import JumpGameII from './JumpGameII';

describe('JumpGame Component', () => {
  beforeEach(() => {
    render(<JumpGameII />);
  });

  test('renders jump game container', () => {
    expect(screen.getByTestId('jump-game-container')).toBeInTheDocument();
  });

  test('renders input field with default value', () => {
    const input = screen.getByTestId('array-input');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('2,3,1,1,4');
  });

  test('renders calculate button', () => {
    const button = screen.getByTestId('calculate-btn');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Calculate Jumps');
  });

  test('renders example buttons', () => {
    expect(screen.getByTestId('example1-btn')).toBeInTheDocument();
    expect(screen.getByTestId('example2-btn')).toBeInTheDocument();
  });

  test('renders array visualization', () => {
    expect(screen.getByTestId('array-visualization')).toBeInTheDocument();
  });

  test('displays array elements correctly', () => {
    expect(screen.getByTestId('array-element-0')).toBeInTheDocument();
    expect(screen.getByTestId('array-element-1')).toBeInTheDocument();
    expect(screen.getByTestId('array-element-2')).toBeInTheDocument();
    expect(screen.getByTestId('array-element-3')).toBeInTheDocument();
    expect(screen.getByTestId('array-element-4')).toBeInTheDocument();
  });

  test('updates input value when typing', () => {
    const input = screen.getByTestId('array-input');
    fireEvent.change(input, { target: { value: '1,2,3' } });
    expect(input.value).toBe('1,2,3');
  });

  test('calculates jumps for default example', async () => {
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('result-section')).toBeInTheDocument();
    });

    const result = screen.getByTestId('result-value');
    expect(result).toHaveTextContent('Minimum jumps: 2');
  });

  test('loads example 1 correctly', () => {
    const example1Btn = screen.getByTestId('example1-btn');
    fireEvent.click(example1Btn);

    const input = screen.getByTestId('array-input');
    expect(input.value).toBe('2,3,1,1,4');
  });

  test('loads example 2 correctly', () => {
    const example2Btn = screen.getByTestId('example2-btn');
    fireEvent.click(example2Btn);

    const input = screen.getByTestId('array-input');
    expect(input.value).toBe('2,3,0,1,4');
  });

  test('shows error for invalid input', async () => {
    const input = screen.getByTestId('array-input');
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.change(input, { target: { value: 'invalid,input' } });
    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  test('shows error for empty input', async () => {
    const input = screen.getByTestId('array-input');
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  test('shows error for negative numbers', async () => {
    const input = screen.getByTestId('array-input');
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.change(input, { target: { value: '1,-2,3' } });
    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  test('shows error for numbers > 1000', async () => {
    const input = screen.getByTestId('array-input');
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.change(input, { target: { value: '1,2000,3' } });
    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  test('button is disabled during calculation', async () => {
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.click(calculateBtn);

    expect(calculateBtn).toBeDisabled();
    expect(calculateBtn).toHaveTextContent('Calculating...');

    await waitFor(() => {
      expect(calculateBtn).not.toBeDisabled();
      expect(calculateBtn).toHaveTextContent('Calculate Jumps');
    });
  });

  test('visualize button appears after calculation', async () => {
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('visualize-btn')).toBeInTheDocument();
    });
  });

  test('reset button appears after calculation', async () => {
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('reset-btn')).toBeInTheDocument();
    });
  });

  test('algorithm steps are displayed after calculation', async () => {
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('step-0')).toBeInTheDocument();
    });
  });

  test('handles single element array', async () => {
    const input = screen.getByTestId('array-input');
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.change(input, { target: { value: '0' } });
    fireEvent.click(calculateBtn);

    await waitFor(() => {
      const result = screen.getByTestId('result-value');
      expect(result).toHaveTextContent('Minimum jumps: 0');
    });
  });

  test('handles two element array', async () => {
    const input = screen.getByTestId('array-input');
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.change(input, { target: { value: '1,0' } });
    fireEvent.click(calculateBtn);

    await waitFor(() => {
      const result = screen.getByTestId('result-value');
      expect(result).toHaveTextContent('Minimum jumps: 1');
    });
  });
});

describe('Jump Game Algorithm', () => {
  const jump = (nums) => {
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
  };

  test('algorithm works for example 1', () => {
    expect(jump([2, 3, 1, 1, 4])).toBe(2);
  });

  test('algorithm works for example 2', () => {
    expect(jump([2, 3, 0, 1, 4])).toBe(2);
  });

  test('algorithm works for single element', () => {
    expect(jump([0])).toBe(0);
  });

  test('algorithm works for two elements', () => {
    expect(jump([1, 0])).toBe(1);
  });

  test('algorithm works for all zeros except last', () => {
    expect(jump([3, 0, 0, 0])).toBe(1);
  });

  test('algorithm works for large jumps', () => {
    expect(jump([5, 1, 1, 1, 1, 1])).toBe(1);
  });

  test('algorithm works for minimum jumps needed', () => {
    expect(jump([1, 1, 1, 1, 1])).toBe(4);
  });
});