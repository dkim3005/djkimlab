"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}

interface ModelState {
  slope: number;
  intercept: number;
  loss: number;
}

const DATASET: Point[] = [
  { x: 0.8, y: 2.1 },
  { x: 1.4, y: 2.7 },
  { x: 2.1, y: 3.1 },
  { x: 2.8, y: 3.7 },
  { x: 3.4, y: 4.0 },
  { x: 4.1, y: 4.8 },
  { x: 4.9, y: 5.5 },
  { x: 5.8, y: 6.1 },
  { x: 6.2, y: 6.8 },
  { x: 7.1, y: 7.0 },
  { x: 7.7, y: 7.8 },
  { x: 8.6, y: 8.2 },
];

const CHART = {
  width: 640,
  height: 360,
  left: 44,
  right: 24,
  top: 24,
  bottom: 36,
};

const LOSS_CHART = {
  width: 640,
  height: 180,
  left: 38,
  right: 20,
  top: 18,
  bottom: 28,
};

const X_RANGE = { min: 0, max: 10 };
const Y_RANGE = { min: 0, max: 10 };
const X_TICKS = [0, 2, 4, 6, 8, 10];
const Y_TICKS = [0, 2, 4, 6, 8, 10];
const INITIAL_SLOPE = -0.7;
const INITIAL_INTERCEPT = 7.8;
const SLOPE_RANGE = { min: -2, max: 2, step: 0.01 };
const INTERCEPT_RANGE = { min: -2, max: 10, step: 0.05 };

function predict(slope: number, intercept: number, x: number) {
  return slope * x + intercept;
}

function computeLoss(slope: number, intercept: number) {
  const total = DATASET.reduce((sum, point) => {
    const error = predict(slope, intercept, point.x) - point.y;
    return sum + error * error;
  }, 0);

  return total / DATASET.length;
}

function createModelState(slope: number, intercept: number): ModelState {
  return {
    slope,
    intercept,
    loss: computeLoss(slope, intercept),
  };
}

function takeGradientStep(state: ModelState, learningRate: number): ModelState {
  let slopeGradient = 0;
  let interceptGradient = 0;

  for (const point of DATASET) {
    const error = predict(state.slope, state.intercept, point.x) - point.y;
    slopeGradient += error * point.x;
    interceptGradient += error;
  }

  const scale = 2 / DATASET.length;
  const nextSlope = state.slope - learningRate * scale * slopeGradient;
  const nextIntercept = state.intercept - learningRate * scale * interceptGradient;

  return createModelState(nextSlope, nextIntercept);
}

function scaleX(x: number) {
  const usableWidth = CHART.width - CHART.left - CHART.right;
  return CHART.left + ((x - X_RANGE.min) / (X_RANGE.max - X_RANGE.min)) * usableWidth;
}

function scaleY(y: number) {
  const usableHeight = CHART.height - CHART.top - CHART.bottom;
  return CHART.top + (1 - (y - Y_RANGE.min) / (Y_RANGE.max - Y_RANGE.min)) * usableHeight;
}

function buildLossPath(lossHistory: number[], yMax: number) {
  if (lossHistory.length === 0) return "";

  const usableWidth = LOSS_CHART.width - LOSS_CHART.left - LOSS_CHART.right;
  const usableHeight = LOSS_CHART.height - LOSS_CHART.top - LOSS_CHART.bottom;
  const cap = yMax || 1;

  return lossHistory
    .map((loss, index) => {
      const x =
        LOSS_CHART.left +
        (lossHistory.length === 1
          ? 0
          : (index / (lossHistory.length - 1)) * usableWidth);
      const clamped = Math.min(loss, cap);
      const y =
        LOSS_CHART.top + ((cap - clamped) / cap) * usableHeight;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function formatEquation(slope: number, intercept: number) {
  const sign = intercept >= 0 ? "+" : "-";
  return `y = ${slope.toFixed(2)}x ${sign} ${Math.abs(intercept).toFixed(2)}`;
}

export default function LinearRegressionDemo() {
  const timerRef = useRef<number | null>(null);
  const [learningRate, setLearningRate] = useState(0.03);
  const [iterations, setIterations] = useState(80);
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showSquares, setShowSquares] = useState(true);
  const [model, setModel] = useState<ModelState>(() =>
    createModelState(INITIAL_SLOPE, INITIAL_INTERCEPT),
  );
  const [lossHistory, setLossHistory] = useState<number[]>(() => [
    computeLoss(INITIAL_SLOPE, INITIAL_INTERCEPT),
  ]);
  const [lossYMax, setLossYMax] = useState<number>(() =>
    computeLoss(INITIAL_SLOPE, INITIAL_INTERCEPT),
  );

  function stopRun() {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  }

  function setSlope(next: number) {
    if (isRunning) return;
    const updated = createModelState(next, model.intercept);
    setModel(updated);
    setLossHistory([updated.loss]);
    setLossYMax(updated.loss);
    setStep(0);
  }

  function setIntercept(next: number) {
    if (isRunning) return;
    const updated = createModelState(model.slope, next);
    setModel(updated);
    setLossHistory([updated.loss]);
    setLossYMax(updated.loss);
    setStep(0);
  }

  function resetRun() {
    stopRun();
    const initialState = createModelState(INITIAL_SLOPE, INITIAL_INTERCEPT);
    setModel(initialState);
    setLossHistory([initialState.loss]);
    setLossYMax(initialState.loss);
    setStep(0);
  }

  function runDemo() {
    stopRun();

    const initialState = createModelState(INITIAL_SLOPE, INITIAL_INTERCEPT);
    let currentState = initialState;
    let currentStep = 0;
    const nextLossHistory = [initialState.loss];

    setModel(initialState);
    setLossHistory([initialState.loss]);
    setLossYMax(initialState.loss);
    setStep(0);
    setIsRunning(true);

    timerRef.current = window.setInterval(() => {
      currentState = takeGradientStep(currentState, learningRate);
      currentStep += 1;
      nextLossHistory.push(currentState.loss);

      setModel(currentState);
      setLossHistory([...nextLossHistory]);
      setStep(currentStep);

      if (currentStep >= iterations) {
        stopRun();
      }
    }, 60);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  const lineStartY = predict(model.slope, model.intercept, X_RANGE.min);
  const lineEndY = predict(model.slope, model.intercept, X_RANGE.max);
  const lineEquation = formatEquation(model.slope, model.intercept);
  const lossPath = buildLossPath(lossHistory, lossYMax);
  const lossDrop = lossHistory[0] - lossHistory[lossHistory.length - 1];
  const pxPerUnit =
    (CHART.height - CHART.top - CHART.bottom) / (Y_RANGE.max - Y_RANGE.min);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-card-border bg-card-bg/70 p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Linear Regression Demo</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
              Fit by hand with the slope and intercept sliders, then let
              gradient descent do the same job from a deliberately bad start.
              The blue squares are the squared errors gradient descent is
              shrinking.
            </p>
          </div>
          <div className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-mono text-accent">
            live demo
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr),minmax(320px,1fr)]">
          <div className="rounded-2xl border border-card-border bg-background/60 p-4">
            <svg
              viewBox={`0 0 ${CHART.width} ${CHART.height}`}
              className="w-full"
              aria-label="Linear regression scatter plot"
            >
              {X_TICKS.map((tick) => (
                <line
                  key={`gx-${tick}`}
                  x1={scaleX(tick)}
                  y1={CHART.top}
                  x2={scaleX(tick)}
                  y2={CHART.height - CHART.bottom}
                  stroke="rgba(148,163,184,0.14)"
                />
              ))}
              {Y_TICKS.map((tick) => (
                <line
                  key={`gy-${tick}`}
                  x1={CHART.left}
                  y1={scaleY(tick)}
                  x2={CHART.width - CHART.right}
                  y2={scaleY(tick)}
                  stroke="rgba(148,163,184,0.14)"
                />
              ))}

              <line
                x1={CHART.left}
                y1={CHART.height - CHART.bottom}
                x2={CHART.width - CHART.right}
                y2={CHART.height - CHART.bottom}
                stroke="rgba(237,237,237,0.45)"
              />
              <line
                x1={CHART.left}
                y1={CHART.top}
                x2={CHART.left}
                y2={CHART.height - CHART.bottom}
                stroke="rgba(237,237,237,0.45)"
              />

              {X_TICKS.map((tick) => (
                <text
                  key={`tx-${tick}`}
                  x={scaleX(tick)}
                  y={CHART.height - CHART.bottom + 18}
                  fill="rgba(156,163,175,0.95)"
                  fontSize="11"
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                >
                  {tick}
                </text>
              ))}
              {Y_TICKS.map((tick) => (
                <text
                  key={`ty-${tick}`}
                  x={CHART.left - 8}
                  y={scaleY(tick) + 4}
                  fill="rgba(156,163,175,0.95)"
                  fontSize="11"
                  textAnchor="end"
                  fontFamily="var(--font-mono)"
                >
                  {tick}
                </text>
              ))}

              {showSquares &&
                DATASET.map((point) => {
                  const predictedY = predict(model.slope, model.intercept, point.x);
                  const error = predictedY - point.y;
                  const absError = Math.abs(error);
                  if (absError < 0.02) return null;
                  const sidePx = absError * pxPerUnit;
                  // Anchor the square so one side runs along the residual.
                  // Square extends to the right of the data point for clarity.
                  const x0 = scaleX(point.x);
                  const yTop = Math.min(scaleY(point.y), scaleY(predictedY));
                  return (
                    <rect
                      key={`sq-${point.x}-${point.y}`}
                      x={x0}
                      y={yTop}
                      width={sidePx}
                      height={sidePx}
                      fill="rgba(59,130,246,0.16)"
                      stroke="rgba(59,130,246,0.45)"
                      strokeWidth="1"
                    />
                  );
                })}

              <line
                x1={scaleX(X_RANGE.min)}
                y1={scaleY(lineStartY)}
                x2={scaleX(X_RANGE.max)}
                y2={scaleY(lineEndY)}
                stroke="rgba(59,130,246,0.95)"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {DATASET.map((point) => {
                const predictedY = predict(model.slope, model.intercept, point.x);
                return (
                  <g key={`${point.x}-${point.y}`}>
                    <line
                      x1={scaleX(point.x)}
                      y1={scaleY(point.y)}
                      x2={scaleX(point.x)}
                      y2={scaleY(predictedY)}
                      stroke="rgba(96,165,250,0.45)"
                      strokeDasharray="4 4"
                    />
                    <circle
                      cx={scaleX(point.x)}
                      cy={scaleY(point.y)}
                      r="5.5"
                      fill="rgba(237,237,237,0.96)"
                    />
                  </g>
                );
              })}

              <text
                x={CHART.left}
                y={CHART.top - 8}
                fill="rgba(237,237,237,0.88)"
                fontSize="14"
              >
                scatter + fitted line
              </text>
              <text
                x={CHART.width - CHART.right}
                y={CHART.height - 8}
                fill="rgba(156,163,175,0.95)"
                fontSize="12"
                textAnchor="end"
                fontFamily="var(--font-mono)"
              >
                x
              </text>
              <text
                x={12}
                y={CHART.top}
                fill="rgba(156,163,175,0.95)"
                fontSize="12"
                fontFamily="var(--font-mono)"
              >
                y
              </text>
            </svg>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-card-border bg-background/60 p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium">Current line</span>
                <span className="text-xs font-mono text-muted">
                  step {step}/{iterations}
                </span>
              </div>
              <p className="mt-3 text-lg font-semibold">{lineEquation}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-card-border bg-card-bg/70 p-3">
                  <div className="text-muted">Loss (MSE)</div>
                  <div className="mt-1 text-lg font-semibold">
                    {model.loss.toFixed(3)}
                  </div>
                </div>
                <div className="rounded-xl border border-card-border bg-card-bg/70 p-3">
                  <div className="text-muted">Loss drop</div>
                  <div className="mt-1 text-lg font-semibold text-accent">
                    {lossDrop.toFixed(3)}
                  </div>
                </div>
              </div>
              <label className="mt-4 flex items-center gap-2 text-xs font-mono text-muted">
                <input
                  type="checkbox"
                  className="accent-accent"
                  checked={showSquares}
                  onChange={(event) => setShowSquares(event.target.checked)}
                />
                show squared-error squares
              </label>
            </div>

            <div className="rounded-2xl border border-card-border bg-background/60 p-5">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent">
                Fit by hand
              </span>

              <label className="mt-4 block text-sm font-medium">Slope</label>
              <div className="mt-2 flex items-center justify-between text-xs font-mono text-muted">
                <span>{SLOPE_RANGE.min.toFixed(1)}</span>
                <span>{model.slope.toFixed(2)}</span>
                <span>{SLOPE_RANGE.max.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={SLOPE_RANGE.min}
                max={SLOPE_RANGE.max}
                step={SLOPE_RANGE.step}
                value={model.slope}
                onChange={(event) => setSlope(Number(event.target.value))}
                className="mt-2 w-full accent-accent"
                disabled={isRunning}
              />

              <label className="mt-4 block text-sm font-medium">Intercept</label>
              <div className="mt-2 flex items-center justify-between text-xs font-mono text-muted">
                <span>{INTERCEPT_RANGE.min.toFixed(1)}</span>
                <span>{model.intercept.toFixed(2)}</span>
                <span>{INTERCEPT_RANGE.max.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={INTERCEPT_RANGE.min}
                max={INTERCEPT_RANGE.max}
                step={INTERCEPT_RANGE.step}
                value={model.intercept}
                onChange={(event) => setIntercept(Number(event.target.value))}
                className="mt-2 w-full accent-accent"
                disabled={isRunning}
              />
            </div>

            <div className="rounded-2xl border border-card-border bg-background/60 p-5">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent">
                Or let gradient descent fit it
              </span>

              <label className="mt-4 block text-sm font-medium">Learning rate</label>
              <div className="mt-2 flex items-center justify-between text-xs font-mono text-muted">
                <span>smaller = safer</span>
                <span>{learningRate.toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="0.005"
                max="0.08"
                step="0.005"
                value={learningRate}
                onChange={(event) => setLearningRate(Number(event.target.value))}
                className="mt-3 w-full accent-accent"
                disabled={isRunning}
              />

              <label className="mt-5 block text-sm font-medium">Iterations</label>
              <div className="mt-2 flex items-center justify-between text-xs font-mono text-muted">
                <span>more steps = closer fit</span>
                <span>{iterations}</span>
              </div>
              <input
                type="range"
                min="20"
                max="180"
                step="10"
                value={iterations}
                onChange={(event) => setIterations(Number(event.target.value))}
                className="mt-3 w-full accent-accent"
                disabled={isRunning}
              />

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={runDemo}
                  className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isRunning}
                >
                  Run Gradient Descent
                </button>
                <button
                  type="button"
                  onClick={resetRun}
                  className="rounded-md border border-card-border px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
                  disabled={isRunning}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-card-border bg-card-bg/70 p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold">Loss curve</h3>
          <span className="text-xs font-mono text-muted">
            MSE — y-axis fixed to the starting loss so different learning
            rates look different
          </span>
        </div>
        <svg
          viewBox={`0 0 ${LOSS_CHART.width} ${LOSS_CHART.height}`}
          className="w-full"
          aria-label="Loss curve"
        >
          <line
            x1={LOSS_CHART.left}
            y1={LOSS_CHART.height - LOSS_CHART.bottom}
            x2={LOSS_CHART.width - LOSS_CHART.right}
            y2={LOSS_CHART.height - LOSS_CHART.bottom}
            stroke="rgba(237,237,237,0.35)"
          />
          <line
            x1={LOSS_CHART.left}
            y1={LOSS_CHART.top}
            x2={LOSS_CHART.left}
            y2={LOSS_CHART.height - LOSS_CHART.bottom}
            stroke="rgba(237,237,237,0.35)"
          />
          <text
            x={LOSS_CHART.left - 6}
            y={LOSS_CHART.top + 4}
            fill="rgba(156,163,175,0.95)"
            fontSize="11"
            textAnchor="end"
            fontFamily="var(--font-mono)"
          >
            {lossYMax.toFixed(2)}
          </text>
          <text
            x={LOSS_CHART.left - 6}
            y={LOSS_CHART.height - LOSS_CHART.bottom + 4}
            fill="rgba(156,163,175,0.95)"
            fontSize="11"
            textAnchor="end"
            fontFamily="var(--font-mono)"
          >
            0
          </text>
          {lossPath ? (
            <path
              d={lossPath}
              fill="none"
              stroke="rgba(16,185,129,0.95)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
          <text
            x={LOSS_CHART.left}
            y={LOSS_CHART.top - 4}
            fill="rgba(237,237,237,0.88)"
            fontSize="13"
          >
            lower is better
          </text>
        </svg>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-card-border bg-card-bg/70 p-5">
          <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent">
            Why the line moves
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Each parameter has a slope. If increasing that parameter makes loss
            go up, the derivative is positive, so gradient descent moves in the
            negative direction instead.
          </p>
        </div>
        <div className="rounded-2xl border border-card-border bg-card-bg/70 p-5">
          <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent">
            Why squares
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Each blue square has side equal to the residual, so its area is the
            squared error itself. MSE is the average of those areas. Big misses
            hurt much more than many small ones — that is what gradient descent
            shrinks first.
          </p>
        </div>
        <div className="rounded-2xl border border-card-border bg-card-bg/70 p-5">
          <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent">
            Ask deeper
          </h3>
          <div className="mt-3 space-y-2 text-sm">
            <Link
              href="/wiki/topics/ai-ml/supervised/regression/linear-regression"
              className="block text-accent underline-offset-2 hover:underline"
            >
              Linear Regression
            </Link>
            <Link
              href="/wiki/topics/math/optimization/gradient-descent"
              className="block text-accent underline-offset-2 hover:underline"
            >
              Gradient Descent
            </Link>
            <Link
              href="/wiki/topics/math/calculus/derivatives-gradient"
              className="block text-accent underline-offset-2 hover:underline"
            >
              Derivatives and Gradients
            </Link>
            <Link
              href="/wiki/topics/ai-ml/foundations/loss-functions"
              className="block text-accent underline-offset-2 hover:underline"
            >
              Loss Functions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
