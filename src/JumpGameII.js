import React, { useState } from 'react';

const JumpGameII = () => {
    const [nums, setNums] = useState([2, 3, 1, 1, 4]);
    const [inputValue, setInputValue] = useState('2,3,1,1,4');
    const [result, setResult] = useState(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [error, setError] = useState('');
    const [currentStep, setCurrentStep] = useState(-1);
    const [steps, setSteps] = useState([]);
    const [visualization, setVisualization] = useState({
        current: -1,
        reachable: [],
        path: []
    });

    const jump = (nums) => {
        const n = nums.length;
        if (n <= 1) return { jumps: 0, steps: [], path: [0] };

        const steps = [];
        let jumps = 0;
        let currentEnd = 0;
        let farthest = 0;
        let path = [];
        let currentPos = 0;

        for (let i = 0; i < n - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);

            steps.push({
                step: steps.length + 1,
                description: `At index ${i}, can reach up to index ${i + nums[i]}. Farthest reachable: ${farthest}`,
                current: i,
                reachable: Array.from({length: Math.min(i + nums[i] + 1, n)}, (_, idx) => idx).filter(idx => idx > i),
                jumps: jumps,
                currentEnd: currentEnd,
                farthest: farthest
            });

            if (i === currentEnd) {
                jumps++;
                currentEnd = farthest;
                path.push(i);

                steps.push({
                    step: steps.length + 1,
                    description: `Made jump ${jumps}. New boundary: ${currentEnd}`,
                    current: i,
                    reachable: [],
                    jumps: jumps,
                    currentEnd: currentEnd,
                    farthest: farthest,
                    jumpMade: true
                });

                if (currentEnd >= n - 1) {
                    path.push(n - 1);
                    break;
                }
            }
        }

        return { jumps, steps, path };
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const parseInput = () => {
        try {
            const parsed = inputValue.split(',').map(num => {
                const trimmed = num.trim();
                if (trimmed === '') throw new Error('Empty value');
                const parsed = parseInt(trimmed);
                if (isNaN(parsed)) throw new Error(`"${trimmed}" is not a valid number`);
                if (parsed < 0) throw new Error('Numbers must be non-negative');
                if (parsed > 1000) throw new Error('Numbers must be <= 1000');
                return parsed;
            });

            if (parsed.length === 0) throw new Error('Array cannot be empty');
            if (parsed.length > 10000) throw new Error('Array length must be <= 10000');

            return parsed;
        } catch (err) {
            throw new Error(`Invalid input: ${err.message}`);
        }
    };

    const calculateJumps = async () => {
        try {
            setError('');
            setIsCalculating(true);
            setResult(null);
            setCurrentStep(-1);
            setVisualization({ current: -1, reachable: [], path: [] });

            const parsedNums = parseInput();
            setNums(parsedNums);

            await new Promise(resolve => setTimeout(resolve, 500));

            const { jumps, steps, path } = jump(parsedNums);

            setResult(jumps);
            setSteps(steps);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsCalculating(false);
        }
    };

    const visualizeStep = async (stepIndex) => {
        if (stepIndex >= 0 && stepIndex < steps.length) {
            setCurrentStep(stepIndex);
            const step = steps[stepIndex];
            setVisualization({
                current: step.current,
                reachable: step.reachable || [],
                path: steps.slice(0, stepIndex + 1)
                           .filter(s => s.jumpMade)
                           .map(s => s.current)
            });
        }
    };

    const resetVisualization = () => {
        setCurrentStep(-1);
        setVisualization({ current: -1, reachable: [], path: [] });
    };

    const loadExample = (exampleNums) => {
        const exampleStr = exampleNums.join(',');
        setInputValue(exampleStr);
        setNums(exampleNums);
        setResult(null);
        setError('');
        setCurrentStep(-1);
        setSteps([]);
        setVisualization({ current: -1, reachable: [], path: [] });
    };

    const getElementClass = (index) => {
        let classes = 'array-element';

        if (index === visualization.current) {
            classes += ' current';
        } else if (visualization.reachable.includes(index)) {
            classes += ' reachable';
        } else if (visualization.path.includes(index)) {
            classes += ' path';
        }

        if (index === nums.length - 1) {
            classes += ' target';
        }

        return classes;
    };

    return (
        <div className="jump-game-container" data-testid="jump-game-container">
            <div className="header">
                <h1>Jump Game II</h1>
                <p>Find the minimum number of jumps to reach the last index</p>
            </div>

            <div className="main-content">
                <div className="input-section">
                    <h2>Input Configuration</h2>

                    <div className="input-group">
                        <label htmlFor="array-input">
                            Array (comma-separated integers):
                        </label>
                        <input
                            id="array-input"
                            data-testid="array-input"
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="e.g., 2,3,1,1,4"
                            className="array-input"
                        />
                    </div>

                    <div className="button-group">
                        <button
                            data-testid="calculate-btn"
                            onClick={calculateJumps}
                            disabled={isCalculating}
                            className="btn btn-primary"
                        >
                            {isCalculating ? 'Calculating...' : 'Calculate Jumps'}
                        </button>

                        <button
                            data-testid="example1-btn"
                            onClick={() => loadExample([2, 3, 1, 1, 4])}
                            className="btn btn-secondary"
                        >
                            Example 1
                        </button>

                        <button
                            data-testid="example2-btn"
                            onClick={() => loadExample([2, 3, 0, 1, 4])}
                            className="btn btn-secondary"
                        >
                            Example 2
                        </button>
                    </div>

                    {error && (
                        <div className="error-message" data-testid="error-message">
                            {error}
                        </div>
                    )}
                </div>

                <div className="visualization-section">
                    <h2>Array Visualization</h2>

                    <div className="legend">
                        <div className="legend-item">
                            <div className="legend-color" style={{backgroundColor: '#ffd700', borderColor: '#ffb347'}}></div>
                            Current Position
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{backgroundColor: '#90EE90', borderColor: '#32CD32'}}></div>
                            Reachable
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{backgroundColor: '#4ecdc4', borderColor: '#26a69a'}}></div>
                            Jump Path
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{backgroundColor: '#ff6b6b', borderColor: '#ff5252'}}></div>
                            Target
                        </div>
                    </div>

                    <div className="array-visualization" data-testid="array-visualization">
                        {nums.map((num, index) => (
                            <div
                                key={index}
                                className={getElementClass(index)}
                                data-testid={`array-element-${index}`}
                            >
                                <div className="element-value">{num}</div>
                                <div className="element-index">{index}</div>
                            </div>
                        ))}
                    </div>

                    {steps.length > 0 && (
                        <div className="button-group">
                            <button
                                data-testid="visualize-btn"
                                onClick={() => {
                                    if (currentStep < steps.length - 1) {
                                        visualizeStep(currentStep + 1);
                                    } else {
                                        visualizeStep(0);
                                    }
                                }}
                                className="btn btn-success"
                            >
                                {currentStep < steps.length - 1 ? 'Next Step' : 'Restart'}
                            </button>

                            <button
                                data-testid="reset-btn"
                                onClick={resetVisualization}
                                className="btn btn-secondary"
                            >
                                Reset
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {result !== null && (
                <div className="result-section fade-in" data-testid="result-section">
                    <h2 className="result-title">
                        🎯 Result
                    </h2>
                    <div className="result-value" data-testid="result-value">
                        Minimum jumps: {result}
                    </div>

                    <div className="complexity-info">
                        <strong>Time Complexity:</strong> O(n) - Single pass through array<br/>
                        <strong>Space Complexity:</strong> O(1) - Only constant extra space used<br/>
                        <strong>Algorithm:</strong> Greedy approach using jump boundaries
                    </div>

                    {steps.length > 0 && (
                        <div className="algorithm-steps">
                            <h3>Algorithm Steps:</h3>
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`step ${currentStep === index ? 'active' : ''}`}
                                    data-testid={`step-${index}`}
                                >
                                    <strong>Step {step.step}:</strong> {step.description}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default JumpGameII